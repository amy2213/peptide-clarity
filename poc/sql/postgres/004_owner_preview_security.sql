-- G3-SEC-001. Owner-only prototype publishing boundary, disposable PostgreSQL ONLY.
-- No public publication or clinical/regulatory approval is created by this migration.
BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='pc_preview_reader') THEN
    CREATE ROLE pc_preview_reader NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='pc_preview_visitor') THEN
    CREATE ROLE pc_preview_visitor NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='pc_ingest_worker') THEN
    CREATE ROLE pc_ingest_worker NOLOGIN;
  END IF;
END $$;

REVOKE ALL ON SCHEMA poc FROM PUBLIC;
REVOKE ALL ON SCHEMA poc FROM pc_preview_reader,pc_preview_visitor,pc_ingest_worker;
REVOKE ALL ON ALL TABLES IN SCHEMA poc FROM PUBLIC,pc_preview_reader,pc_preview_visitor,pc_ingest_worker;

CREATE SCHEMA IF NOT EXISTS pc_preview;
REVOKE ALL ON SCHEMA pc_preview FROM PUBLIC;
GRANT USAGE ON SCHEMA pc_preview TO pc_preview_reader;

CREATE TABLE pc_preview.snapshots (
  id text PRIMARY KEY,
  owner_preview_enabled boolean NOT NULL DEFAULT false,
  public_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  scope_note text NOT NULL,
  CHECK(NOT (owner_preview_enabled AND public_approved))
);

CREATE TABLE pc_preview.substances (
  snapshot_id text NOT NULL REFERENCES pc_preview.snapshots(id),
  id text NOT NULL,
  name text NOT NULL,
  group_raw text,
  summary_raw text,
  profile_stage_raw text,
  source_count integer NOT NULL DEFAULT 0 CHECK(source_count>=0),
  review_state text NOT NULL DEFAULT 'legacy_draft_unverified',
  PRIMARY KEY(snapshot_id,id)
);

CREATE TABLE pc_preview.claims (
  snapshot_id text NOT NULL REFERENCES pc_preview.snapshots(id),
  id text NOT NULL,
  substance_id text NOT NULL,
  claim_title text,
  claim_text text,
  source_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  review_state text NOT NULL DEFAULT 'legacy_draft_unverified',
  PRIMARY KEY(snapshot_id,id),
  FOREIGN KEY(snapshot_id,substance_id) REFERENCES pc_preview.substances(snapshot_id,id)
);

CREATE TABLE pc_preview.companies (
  snapshot_id text NOT NULL REFERENCES pc_preview.snapshots(id),
  id text NOT NULL,
  name text NOT NULL,
  domain text,
  source_observed_at_raw text,
  review_state text NOT NULL DEFAULT 'legacy_draft_unverified',
  PRIMARY KEY(snapshot_id,id)
);

CREATE TABLE pc_preview.lot_observations (
  snapshot_id text NOT NULL REFERENCES pc_preview.snapshots(id),
  id text NOT NULL,
  company_id text NOT NULL,
  substance_id text NOT NULL,
  reported_lot_token text NOT NULL,
  reported_purity numeric(8,4),
  issuer_authenticated boolean NOT NULL DEFAULT false,
  custody_verified boolean NOT NULL DEFAULT false,
  document_url text,
  source_id text,
  verification_statement text NOT NULL DEFAULT 'Seller-reported document or listing. Independent verification not established.',
  PRIMARY KEY(snapshot_id,id),
  FOREIGN KEY(snapshot_id,company_id) REFERENCES pc_preview.companies(snapshot_id,id),
  FOREIGN KEY(snapshot_id,substance_id) REFERENCES pc_preview.substances(snapshot_id,id)
);

CREATE TABLE pc_preview.evidence_issues (
  snapshot_id text NOT NULL REFERENCES pc_preview.snapshots(id),
  id text NOT NULL,
  company_id text NOT NULL,
  issue_status_raw text NOT NULL,
  issue_summary_raw text NOT NULL,
  PRIMARY KEY(snapshot_id,id),
  FOREIGN KEY(snapshot_id,company_id) REFERENCES pc_preview.companies(snapshot_id,id)
);

-- Default deny all table rows unless an explicitly enabled owner snapshot exists.
DO $$
DECLARE t text;
BEGIN
 FOR t IN SELECT unnest(ARRAY['snapshots','substances','claims','companies','lot_observations','evidence_issues'])
 LOOP
   EXECUTE format('ALTER TABLE pc_preview.%I ENABLE ROW LEVEL SECURITY',t);
   EXECUTE format('ALTER TABLE pc_preview.%I FORCE ROW LEVEL SECURITY',t);
 END LOOP;
END $$;

CREATE POLICY pc_owner_snapshot_read ON pc_preview.snapshots
  FOR SELECT TO pc_preview_reader USING (owner_preview_enabled = true AND public_approved = false);

CREATE POLICY pc_owner_substances_read ON pc_preview.substances
  FOR SELECT TO pc_preview_reader USING (
    EXISTS(SELECT 1 FROM pc_preview.snapshots s WHERE s.id=snapshot_id AND s.owner_preview_enabled AND NOT s.public_approved)
  );
CREATE POLICY pc_owner_claims_read ON pc_preview.claims
  FOR SELECT TO pc_preview_reader USING (
    EXISTS(SELECT 1 FROM pc_preview.snapshots s WHERE s.id=snapshot_id AND s.owner_preview_enabled AND NOT s.public_approved)
  );
CREATE POLICY pc_owner_companies_read ON pc_preview.companies
  FOR SELECT TO pc_preview_reader USING (
    EXISTS(SELECT 1 FROM pc_preview.snapshots s WHERE s.id=snapshot_id AND s.owner_preview_enabled AND NOT s.public_approved)
  );
CREATE POLICY pc_owner_lots_read ON pc_preview.lot_observations
  FOR SELECT TO pc_preview_reader USING (
    EXISTS(SELECT 1 FROM pc_preview.snapshots s WHERE s.id=snapshot_id AND s.owner_preview_enabled AND NOT s.public_approved)
  );
CREATE POLICY pc_owner_issues_read ON pc_preview.evidence_issues
  FOR SELECT TO pc_preview_reader USING (
    EXISTS(SELECT 1 FROM pc_preview.snapshots s WHERE s.id=snapshot_id AND s.owner_preview_enabled AND NOT s.public_approved)
  );

-- Reader can only SELECT from approved-for-owner-preview projections; no UPDATE/INSERT/DELETE.
GRANT SELECT ON ALL TABLES IN SCHEMA pc_preview TO pc_preview_reader;
REVOKE ALL ON ALL TABLES IN SCHEMA pc_preview FROM PUBLIC,pc_preview_visitor,pc_ingest_worker;
REVOKE USAGE ON SCHEMA pc_preview FROM PUBLIC,pc_preview_visitor,pc_ingest_worker;

-- No role has access via generic PostgreSQL PUBLIC grants.
REVOKE ALL ON ALL TABLES IN SCHEMA pc_preview FROM PUBLIC;
COMMIT;
