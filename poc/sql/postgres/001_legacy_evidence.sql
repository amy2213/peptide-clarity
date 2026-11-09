-- POC-001: isolated PostgreSQL schema candidate. Not a production migration.
-- Execute only against a disposable PostgreSQL database. Preserve public site.
BEGIN;
CREATE SCHEMA IF NOT EXISTS poc;
REVOKE ALL ON SCHEMA poc FROM PUBLIC;

CREATE TABLE IF NOT EXISTS poc.snapshots (
  id text PRIMARY KEY,
  meta_json jsonb NOT NULL,
  validation_json jsonb NOT NULL,
  record_counts_json jsonb NOT NULL,
  original_raw_text text NOT NULL,
  original_sha256 text NOT NULL
);

CREATE TABLE IF NOT EXISTS poc.source_records (
  id text PRIMARY KEY,
  title text NOT NULL,
  publisher_raw text NOT NULL,
  kind_raw text NOT NULL,
  url text,
  published_raw text,
  raw_json jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS poc.substances (
  id text PRIMARY KEY,
  name text NOT NULL,
  group_raw text,
  category_raw text,
  category_type_raw text,
  profile_stage_raw text,
  expert_reviewed_raw boolean,
  plain_english_json jsonb,
  raw_json jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS poc.aliases (
  substance_id text NOT NULL REFERENCES poc.substances(id),
  ordinal integer NOT NULL CHECK(ordinal >= 0),
  name text NOT NULL,
  PRIMARY KEY (substance_id, ordinal)
);

CREATE TABLE IF NOT EXISTS poc.claims (
  id text PRIMARY KEY,
  substance_id text NOT NULL REFERENCES poc.substances(id),
  kind_raw text,
  title text,
  claim_text text,
  review_raw text,
  raw_json jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS poc.claim_sources (
  claim_id text NOT NULL REFERENCES poc.claims(id),
  source_id text NOT NULL REFERENCES poc.source_records(id),
  PRIMARY KEY (claim_id, source_id)
);

CREATE TABLE IF NOT EXISTS poc.companies (
  id text PRIMARY KEY,
  name text NOT NULL,
  domain text,
  observed_raw text,
  review_raw text,
  raw_json jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS poc.company_fields (
  company_id text NOT NULL REFERENCES poc.companies(id),
  ordinal integer NOT NULL CHECK(ordinal >= 0),
  label text NOT NULL,
  value_raw text,
  note_raw text,
  source_url text,
  PRIMARY KEY (company_id, ordinal)
);

-- Group is only a candidate key, NOT independently verified physical lot identity.
CREATE TABLE IF NOT EXISTS poc.reported_lot_groups (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_id text NOT NULL REFERENCES poc.companies(id),
  lot_token text NOT NULL,
  identity_status text NOT NULL DEFAULT 'unverified',
  UNIQUE (company_id, lot_token),
  CHECK (identity_status IN ('unverified','disputed','reviewed_identity'))
);

CREATE TABLE IF NOT EXISTS poc.lot_associations (
  id text PRIMARY KEY,
  group_id bigint NOT NULL REFERENCES poc.reported_lot_groups(id),
  company_id text NOT NULL REFERENCES poc.companies(id),
  substance_id text NOT NULL REFERENCES poc.substances(id),
  source_id text NOT NULL REFERENCES poc.source_records(id),
  report_source_id text REFERENCES poc.source_records(id),
  reported_purity numeric(8,4),
  issuer_authenticated_raw boolean NOT NULL,
  custody_verified_raw boolean NOT NULL,
  report_url text,
  raw_json jsonb NOT NULL,
  CHECK(reported_purity IS NULL OR (reported_purity >= 0 AND reported_purity <= 100))
);

CREATE TABLE IF NOT EXISTS poc.evidence_issues (
  id text PRIMARY KEY,
  company_id text NOT NULL REFERENCES poc.companies(id),
  source_id text REFERENCES poc.source_records(id),
  status text NOT NULL,
  raw_json jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS poc.product_records (
  id text PRIMARY KEY,
  ingredient_substance_id text NOT NULL REFERENCES poc.substances(id),
  product_kind text NOT NULL CHECK(product_kind IN ('fda_approved_medicine','compounded_preparation','research_listing')),
  approval_status text NOT NULL CHECK(approval_status IN ('approved','not_approved','unknown')),
  authority text,
  application_number text,
  source_id text REFERENCES poc.source_records(id),
  reviewed_at date,
  CHECK(product_kind != 'fda_approved_medicine' OR
    (approval_status='approved' AND authority IS NOT NULL AND application_number IS NOT NULL AND source_id IS NOT NULL AND reviewed_at IS NOT NULL)),
  CHECK(product_kind != 'compounded_preparation' OR approval_status != 'approved')
);

CREATE TABLE IF NOT EXISTS poc.pharmacy_license_observations (
  id text PRIMARY KEY,
  company_id text NOT NULL REFERENCES poc.companies(id),
  jurisdiction text NOT NULL,
  status text NOT NULL,
  checked_at date,
  source_id text REFERENCES poc.source_records(id),
  CHECK(status != 'verified_active' OR (checked_at IS NOT NULL AND source_id IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS poc.verification_events (
  id text PRIMARY KEY,
  subject_id text NOT NULL,
  verification_type text NOT NULL,
  outcome text NOT NULL,
  reviewed_at timestamptz NOT NULL,
  evidence_source_id text NOT NULL REFERENCES poc.source_records(id)
);

CREATE TABLE IF NOT EXISTS poc.raw_import_records (
  collection text NOT NULL,
  legacy_id text NOT NULL,
  raw_json jsonb NOT NULL,
  sha256 text NOT NULL,
  PRIMARY KEY(collection,legacy_id)
);

-- Defense in depth: no anonymous access to raw or publication data.
ALTER TABLE poc.snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.source_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.substances ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.claim_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.company_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.reported_lot_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.lot_associations ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.evidence_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.product_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.pharmacy_license_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.verification_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE poc.raw_import_records ENABLE ROW LEVEL SECURITY;

COMMIT;
