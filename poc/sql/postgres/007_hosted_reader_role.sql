-- OPS-003: hosted read-only role remains NOLOGIN until credentials are safely provisioned.
-- This role may inherit only the owner-preview reader's SELECT privileges.
BEGIN;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='pc_stage_web') THEN
    CREATE ROLE pc_stage_web NOLOGIN INHERIT;
  ELSIF EXISTS (
    SELECT 1 FROM pg_roles WHERE rolname='pc_stage_web'
    AND (rolcanlogin OR rolsuper OR rolcreaterole OR rolcreatedb OR rolreplication OR rolbypassrls)
  ) THEN
    RAISE EXCEPTION 'Existing pc_stage_web has elevated privileges or LOGIN; manual review required';
  END IF;
END $;
GRANT pc_preview_reader TO pc_stage_web;
REVOKE ALL ON SCHEMA poc FROM pc_stage_web;
REVOKE ALL ON ALL TABLES IN SCHEMA poc FROM pc_stage_web;
REVOKE ALL ON ALL TABLES IN SCHEMA pc_preview FROM pc_stage_web;
-- Permissions are inherited through role membership, not direct grants.
-- Do not add password, LOGIN, superuser privileges or a browser API key in migration.
COMMIT;
