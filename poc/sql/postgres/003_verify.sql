-- POC-001 PostgreSQL 17 acceptance probes on a disposable database.
\set ON_ERROR_STOP on
DO $$
DECLARE
  expected record;
  observed integer;
BEGIN
  FOR expected IN SELECT * FROM (VALUES
    ('poc.substances',84),('poc.aliases',104),('poc.source_records',41),
    ('poc.claims',37),('poc.companies',5),('poc.company_fields',45),
    ('poc.reported_lot_groups',14),('poc.lot_associations',15),
    ('poc.evidence_issues',5),('poc.raw_import_records',190),
    ('poc.product_records',0),('poc.verification_events',0)
  ) AS required(tablename, n)
  LOOP
    EXECUTE 'SELECT count(*) FROM ' || expected.tablename INTO observed;
    IF observed != expected.n THEN
      RAISE EXCEPTION 'POC mismatch % expected %, got %', expected.tablename, expected.n, observed;
    END IF;
  END LOOP;

  IF (SELECT count(*) FROM poc.reported_lot_groups WHERE company_id='polaris' AND lot_token='POL-GLOW50-2') != 1 THEN
    RAISE EXCEPTION 'Polaris candidate lot grouping not unique';
  END IF;
  IF (SELECT count(*) FROM poc.lot_associations a JOIN poc.reported_lot_groups g ON g.id=a.group_id
      WHERE g.company_id='polaris' AND g.lot_token='POL-GLOW50-2') != 2 THEN
    RAISE EXCEPTION 'Polaris blend lost one of its legacy associations';
  END IF;
  IF (SELECT count(*) FROM poc.lot_associations WHERE issuer_authenticated_raw OR custody_verified_raw) != 0 THEN
    RAISE EXCEPTION 'Legacy reports were incorrectly upgraded as authenticated';
  END IF;
  IF (SELECT count(*) FROM poc.evidence_issues WHERE status='Unresolved') != 3 OR
     (SELECT count(*) FROM poc.evidence_issues WHERE status='Not assessable') != 1 OR
     (SELECT count(*) FROM poc.evidence_issues WHERE status='Not inspected') != 1 THEN
    RAISE EXCEPTION 'Source issue statuses must be preserved exactly';
  END IF;
  IF (SELECT category_type_raw FROM poc.substances WHERE id='semaglutide') != 'approved' THEN
    RAISE EXCEPTION 'Legacy category not preserved';
  END IF;
  IF (SELECT published_raw FROM poc.source_records WHERE id='SRC-001') != 'Live advisory; date not independently checked' THEN
    RAISE EXCEPTION 'Source date text was altered';
  END IF;
  IF (SELECT count(*) FROM poc.claim_sources) = 0 THEN
    RAISE EXCEPTION 'No scientific claim citations';
  END IF;
  IF (SELECT count(*) FROM poc.snapshots WHERE length(original_raw_text)>100000 AND length(original_sha256)=64) != 1 THEN
    RAISE EXCEPTION 'Raw fixture not archived with SHA-256';
  END IF;
  IF (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON c.relnamespace=n.oid WHERE n.nspname='poc'
      AND c.relkind='r' AND c.relrowsecurity=false) != 0 THEN
    RAISE EXCEPTION 'Some POC tables lack RLS';
  END IF;
  RAISE NOTICE 'POC-001 PostgreSQL counts, source links, statuses, grouping and RLS verified';
END $$;

-- Synthetic-only medical product classification negative tests.
DO $$
BEGIN
  BEGIN
    INSERT INTO poc.product_records (id,ingredient_substance_id,product_kind,approval_status)
    VALUES ('SYNTHETIC-INVALID-APPROVED','semaglutide','fda_approved_medicine','approved');
    RAISE EXCEPTION 'Product constraint allowed unsupported approval';
  EXCEPTION WHEN check_violation THEN
    NULL; -- Correct: FDA product needs product-specific source/application/authority.
  END;
  BEGIN
    INSERT INTO poc.product_records (id,ingredient_substance_id,product_kind,approval_status)
    VALUES ('SYNTHETIC-INVALID-COMPOUNDED','semaglutide','compounded_preparation','approved');
    RAISE EXCEPTION 'Compounded product incorrectly allowed approved status';
  EXCEPTION WHEN check_violation THEN
    NULL;
  END;
  BEGIN
    INSERT INTO poc.pharmacy_license_observations(id,company_id,jurisdiction,status)
    VALUES('SYNTHETIC-LICENSE','particle','TX','verified_active');
    RAISE EXCEPTION 'Pharmacy license accepted without dated evidence';
  EXCEPTION WHEN check_violation THEN
    NULL;
  END;
  RAISE NOTICE 'POC-001 product-specific approval and pharmacy constraint negatives verified';
END $$;
