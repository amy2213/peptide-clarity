-- OPS-003: offline hosted-reader authorization and negative checks.
\set ON_ERROR_STOP on
DO $$
DECLARE c integer;
BEGIN
 IF NOT EXISTS(SELECT 1 FROM pg_roles WHERE rolname='pc_stage_web'
   AND rolcanlogin=false AND rolsuper=false AND rolcreaterole=false
   AND rolcreatedb=false AND rolreplication=false AND rolbypassrls=false) THEN
   RAISE EXCEPTION 'Staging application role is not locked down';
 END IF;
 IF NOT pg_has_role('pc_stage_web','pc_preview_reader','USAGE') THEN
   RAISE EXCEPTION 'Staging role missing scoped preview reader membership';
 END IF;
 IF has_schema_privilege('pc_stage_web','poc','USAGE')
     OR has_table_privilege('pc_stage_web','poc.substances','SELECT')
     OR has_table_privilege('pc_stage_web','pc_preview.substances','UPDATE')
     OR has_table_privilege('pc_stage_web','pc_preview.snapshots','INSERT') THEN
    RAISE EXCEPTION 'Staging role has overly broad grants';
 END IF;
END $$;

SET ROLE pc_stage_web;
DO $$
BEGIN
 IF (SELECT count(*) FROM pc_preview.substances) != 84 THEN
   RAISE EXCEPTION 'Staging reader RLS projection lost records';
 END IF;
 IF (SELECT count(*) FROM pc_preview.snapshots WHERE public_approved) != 0 THEN
   RAISE EXCEPTION 'Unexpected public-approved snapshot';
 END IF;
 BEGIN
   PERFORM count(*) FROM poc.substances;
   RAISE EXCEPTION 'Reader accessed private source table';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 BEGIN
   UPDATE pc_preview.snapshots SET public_approved=true;
   RAISE EXCEPTION 'Reader changed publication state';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
END $$;
RESET ROLE;
