# OPS-002 | Supabase Staging Execution and Validation Evidence

**Date:** 2026-11-21 (America/Chicago)\
**Status:** HOSTED STAGING PROVISIONED, RAW DATA IMPORTED, PRIVATE OWNER-PREVIEW SCHEMA SEEDED. PARTIAL SECURITY VALIDATION. **NOT G3/G7 GATE APPROVAL.**

## 1. Confirmed environment and boundaries

- Dedicated Supabase project **Peptide Clarity Staging**, project reference `jyzyguuukscavzqirlmv`.
- Organization: **Data Weaver 2.0**, organization reference `qdkvyusppxsuwkovemhb`.
- Region: `us-east-1`. Database: PostgreSQL **17.11**, active/healthy at time of inspection.
- Connected **CareerOS** is a distinct project `vpejzxrkmsmhujusirsa`; **no queries, migrations or changes** were made against CareerOS in this activity.
- Current `public` schema: **0 application base tables**. Source data confined to private `poc`, provisional owner-only projections to private `pc_preview`.
- Existing public GitHub Pages v0.9.1 website and root `index.html`: **not changed**.

**Authorization:** Owner confirmed they had created the separate staging project (“Done”), following the earlier staging setup authorization and runbook. This activity installs and tests the already-reviewed private database design only; it does **not** provision external app hosting, accounts, role secrets, billing upgrades, public product claims or public launch.

## 2. Source of truth and operations performed

**Versioned source SQL (already validated in disposable CI):**
- `poc/sql/postgres/001_legacy_evidence.sql`: private relational source schema.
- `poc/sql/postgres/002_import_legacy.sql`: full relational JSON-to-table mapping. Original `psql\copy` was substituted with client-supplied JSON using an in-session temporary parsing table, without any server-side file read or OS command.
- `poc/sql/postgres/003_verify.sql`: source counts, exact lot/issue states, RLS and product/price/pharmacy negative constraint checks.
- `poc/sql/postgres/004_owner_preview_security.sql`: preview roles, private schema, six preview projections, RLS + grants.
- `poc/sql/postgres/005_seed_owner_preview.sql`: explicit owner-testing snapshot generated from *provisional* legacy content (not public-approved).
- Fixture: `poc/fixtures/researchData.v091.json`, exact original text stored in `poc.snapshots.original_raw_text`, with SHA-256 recorded as `12bc7303143336a57fb9668a27ef0582e88427039b29150cce85c64414067078`.

**Supabase migration history confirmed:**
- `20261115173726_pc_staging_legacy_private_schema`
- `20261121180030_pc_staging_private_owner_preview`

The import and preview seed were executed inside transactions using the connector's SQL execution action. The staged snapshot `v091-internal-owner-preview` has `owner_preview_enabled = true` and `public_approved = false`. This is **owner staging visibility**, not clinical/medical expert validation or a general public release.

## 3. Database reconciliation results

All following counts were read back from the **hosted staging database**, not inferred from the fixture or CI:

| Table/group | Actual | Acceptance |
|---|---:|---|
| `poc.substances` | 84 | PASS |
| `poc.aliases` | 104 | PASS |
| `poc.source_records` | 41 | PASS |
| `poc.claims` | 37 | PASS |
| `poc.claim_sources` | 47 | PASS |
| `poc.companies` | 5 | PASS |
| `poc.company_fields` | 45 | PASS |
| `poc.reported_lot_groups` | 14 (provisional seller/token keys) | PASS |
| `poc.lot_associations` | 15 (original source rows) | PASS |
| `poc.evidence_issues` | 5 | PASS |
| `poc.raw_import_records` | 190 | PASS |
| `poc.product_records` | 0 | PASS, no inferred FDA approvals |
| `poc.verification_events` | 0 | PASS, no invented independent lab authentication |

Owner-preview row counts: **84 substances; 37 claims; 5 companies; 15 lot observations; 5 evidence issues**.

Additional hosted checks passed:
- **0** preview claims with empty source reference lists.
- **0** preview lot observations marked authenticated issuer or verified custody.
- **2** preserved Polaris GLOW association rows for the same seller-reported lot token.
- Five evidence issue statuses preserved exactly: **3 Unresolved, 1 Not inspected, 1 Not assessable**.
- **0** snapshots flagged publicly approved.
- SQL integrity and negative product/compounding/pharmacy constraint probes from `003_verify.sql` executed without error.

## 4. Hosted permission and RLS inspection

The following are **privilege/policy metadata checks through an administrative database connection**; do not mislabel them as completed live anonymous API penetration tests:

| Inspection | Observed | Status |
|---|---|---|
| Private research tables with RLS disabled | 0 | PASS |
| Preview tables without `FORCE ROW LEVEL SECURITY` | 0 | PASS |
| Scope-limited preview policies | 6 | PASS |
| `anon` schema access to `poc` and `pc_preview` | Both denied | PASS (grant inspection) |
| `authenticated` schema access to `pc_preview` | Denied | PASS (grant inspection) |
| `pc_preview_reader` select from `pc_preview.substances` | Granted | PASS (grant inspection) |
| `pc_preview_reader` update preview rows | Denied | PASS (grant inspection) |
| `pc_preview_reader` select raw `poc.substances` | Denied | PASS (grant inspection) |
| `pc_ingest_worker` insert a preview snapshot | Denied | PASS (grant inspection) |
| `anon`, `authenticated`, `service_role` membership in preview reader role | None | PASS (grant inspection) |
| `public` application base tables | 0 | PASS |

**Security advisor result:** 15 **INFO** notices of type `rls_enabled_no_policy` on raw `poc` tables. This is intentional **default-deny** behavior: raw tables have no allow policies and are stored outside exposed schemas. Do not “fix” these notices by granting anonymous or authenticated data access. Recheck after any schema change. Official explanation: [Supabase linter: RLS enabled without policy](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy).

**Important permission-test limitation:** The managed administrative SQL execution identity cannot `SET ROLE` to the created NOLOGIN preview roles in the current connector session. Thus `006_verify_owner_preview.sql` has **not** been executed end-to-end against this hosted project, even though its equivalent checks passed previously in disposable GitHub Actions. True hostile-client tests remain open.

## 5. OPS-002 hosted acceptance status

| Test | Result |
|---|---|
| STG-001: distinct project, region and owner/organization | **PASS** |
| STG-002: anonymous raw table Data API probe | **PARTIAL**: grants deny; direct HTTP unauthorized-client check not performed |
| STG-003: anonymous/authenticated preview Data API probe | **PARTIAL**: grants deny; direct HTTP unauthorized-client check not performed |
| STG-004: restricted login reads preview | **PARTIAL**: grants verified; no dedicated connected application identity yet |
| STG-005: unauthorized update/publish | **PARTIAL**: grants deny; real login attempt not performed |
| STG-006: shutoff removes all preview visibility | **NOT RUN** in hosted Supabase |
| STG-007: ingestion/privilege escalation/client-bundle test | **PARTIAL**: grant inspection only, no hosted app/bundle |
| STG-008: migration and source traceability | **PASS** with caveat that independent scientific authenticity is not claimed |
| STG-009: public/RLS security advisor review | **PARTIAL**: 0 public base tables; 15 intentional informational default-deny notices; external Data API not tested |
| STG-010: backup/restore drill | **NOT RUN** |
| STG-011: Next.js app against actual hosted stage | **NOT RUN**; existing app was tested against disposable PostgreSQL CI |
| STG-012: cost/quotas/billing assurance | **NOT VERIFIED** here; project was created by owner under their plan, billing inventory not examined |

## 6. Risks and next bounded execution

1. No public site or production launch authorization; G2/G3/G6/G7 remain governed by GOV-001. Keep supplier/clinical reports labeled provisional.
2. Next provision restricted server authentication without publishing credentials, then run genuine `anon`/authenticated and restricted-login negative tests **from outside** the database administrator context.
3. Verify managed Supabase Data API exposed schemas and remove unexpected default public grants. Do not expose `poc` or `pc_preview` through REST.
4. Run backup/export/restore drill appropriate to owner's Free plan and record RPO/RTO. GitHub fixtures are not a complete hosted backup policy.
5. Bind the separately tested Next.js API to staging through protected hosting, test no-store/authorization and enforce noindex + access controls.
6. Record owner-led comprehension outcomes and qualified scientific/regulatory/analytical review separately; no supplier “safe” ranking or off-label human-use buying referrals.

**Final status:** **Hosted database data migration and initial policy inspection verified. External access tests, hosted API integration, restore and regulatory/content gates remain OPEN.**
