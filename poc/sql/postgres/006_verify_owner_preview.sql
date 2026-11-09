-- G3-SEC-001: execute on disposable PostgreSQL. Assertions deliberately fail closed.
\set ON_ERROR_STOP on
DO $$
DECLARE tab text;
BEGIN
  IF (SELECT count(*) FROM pc_preview.substances)<>84 OR
     (SELECT count(*) FROM pc_preview.claims)<>37 OR
     (SELECT count(*) FROM pc_preview.companies)<>5 OR
     (SELECT count(*) FROM pc_preview.lot_observations)<>15 OR
     (SELECT count(*) FROM pc_preview.evidence_issues)<>5 THEN
    RAISE EXCEPTION 'Preview seed counts incorrect';
  END IF;
  IF (SELECT count(*) FROM pc_preview.claims WHERE jsonb_array_length(source_refs)=0)>0 THEN
    RAISE EXCEPTION 'A preview claim has no linked source records';
  END IF;
  IF (SELECT count(*) FROM pc_preview.lot_observations WHERE issuer_authenticated OR custody_verified)<>0 THEN
    RAISE EXCEPTION 'Seller observations were incorrectly upgraded as authenticated';
  END IF;
  IF (SELECT count(*) FROM pc_preview.snapshots WHERE public_approved)=0 THEN
    RAISE NOTICE 'Correct: 0 publicly approved release snapshots';
  ELSE
    RAISE EXCEPTION 'Owner preview was accidentally marked publicly approved';
  END IF;

  FOR tab IN SELECT unnest(ARRAY['snapshots','substances','claims','companies','lot_observations','evidence_issues'])
  LOOP
    IF NOT EXISTS(
      SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
      WHERE n.nspname='pc_preview' AND c.relname=tab AND c.relrowsecurity AND c.relforcerowsecurity
    ) THEN RAISE EXCEPTION 'Missing forced RLS on %',tab; END IF;
  END LOOP;

  IF has_schema_privilege('pc_preview_visitor','pc_preview','USAGE') OR
     has_table_privilege('pc_preview_visitor','pc_preview.substances','SELECT') OR
     has_table_privilege('pc_ingest_worker','pc_preview.substances','SELECT') OR
     has_table_privilege('pc_preview_reader','poc.substances','SELECT') OR
     has_table_privilege('pc_preview_reader','pc_preview.snapshots','UPDATE') THEN
    RAISE EXCEPTION 'Unexpected inherited schema/table privilege';
  END IF;
END $$;

SET ROLE pc_preview_reader;
DO $$
DECLARE n integer;
BEGIN
  SELECT count(*) INTO n FROM pc_preview.substances;
  IF n<>84 THEN RAISE EXCEPTION 'Authorized reader could not read owner snapshot: %',n; END IF;
  SELECT count(*) INTO n FROM pc_preview.claims;
  IF n<>37 THEN RAISE EXCEPTION 'Missing source-linked claims for reader: %',n; END IF;

  BEGIN
    PERFORM count(*) FROM poc.substances;
    RAISE EXCEPTION 'Reader accessed private source table';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
  BEGIN
    UPDATE pc_preview.snapshots SET public_approved=true WHERE id='v091-internal-owner-preview';
    RAISE EXCEPTION 'Reader was allowed to approve snapshot';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END $$;
RESET ROLE;

SET ROLE pc_preview_visitor;
DO $$
BEGIN
  BEGIN
    PERFORM count(*) FROM pc_preview.substances;
    RAISE EXCEPTION 'Anonymous visitor could access owner preview';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END $$;
RESET ROLE;

SET ROLE pc_ingest_worker;
DO $$
BEGIN
  BEGIN
    INSERT INTO pc_preview.snapshots(id,owner_preview_enabled,public_approved,scope_note)
    VALUES('UNAUTHORIZED-PUBLISH',true,false,'should not be allowed');
    RAISE EXCEPTION 'Ingest worker inserted preview publication';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END $$;
RESET ROLE;

-- RLS must hide the projection immediately when the explicit owner snapshot is disabled.
UPDATE pc_preview.snapshots SET owner_preview_enabled=false WHERE id='v091-internal-owner-preview';
SET ROLE pc_preview_reader;
DO $$
BEGIN
  IF (SELECT count(*) FROM pc_preview.substances)<>0 OR
     (SELECT count(*) FROM pc_preview.snapshots)<>0 THEN
    RAISE EXCEPTION 'RLS leaked disabled snapshot records';
  END IF;
END $$;
RESET ROLE;
UPDATE pc_preview.snapshots SET owner_preview_enabled=true WHERE id='v091-internal-owner-preview';

DO $$
BEGIN
  IF (SELECT count(*) FROM pc_preview.lot_observations
        WHERE company_id='polaris' AND reported_lot_token='POL-GLOW50-2')<>2 THEN
    RAISE EXCEPTION 'The two original blend associations were collapsed';
  END IF;
  IF (SELECT count(*) FROM pc_preview.evidence_issues WHERE issue_status_raw='Unresolved')<>3 OR
     (SELECT count(*) FROM pc_preview.evidence_issues WHERE issue_status_raw='Not assessable')<>1 OR
     (SELECT count(*) FROM pc_preview.evidence_issues WHERE issue_status_raw='Not inspected')<>1 THEN
    RAISE EXCEPTION 'Evidence status semantics changed';
  END IF;
  RAISE NOTICE 'G3-SEC-001: owner reader, nonpublic roles, RLS, provenance and publication gate PASS';
END $$;
