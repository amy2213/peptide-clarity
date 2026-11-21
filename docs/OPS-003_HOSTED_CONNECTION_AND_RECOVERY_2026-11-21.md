# OPS-003 | Hosted DB Connection Guard and Source Recovery Rehearsal

**Date:** 2026-11-21 (America/Chicago)  
**Status:** Bounded implementation and private-research recovery validation. **No hosted Next.js deployment or general-public release.**  
**Parent:** [OPS-002 hosted staging evidence](OPS-002_STAGING_EXECUTION_EVIDENCE_2026-11-21.md), [OPS-003 issue #29](https://github.com/amy2213/peptide-clarity/issues/29), PDP-001 v1.0 owner-approved product scope, GOV-001 gate controls.

## 1. Protected target

The ONLY hosted application database candidate is Supabase **Peptide Clarity Staging**, project reference `jyzyguuukscavzqirlmv`. CareerOS ref `vpejzxrkmsmhujusirsa` is excluded.

`apps/web/lib/db-connection.mjs` rejects unexpected database credentials and endpoints. In hosted mode it requires:
- `PC_DATABASE_MODE=hosted` in server-only environment;
- a URI ending in the intended Postgres database `postgres`, for **staging only**;
- restricted role `pc_stage_web` for direct database connection or `pc_stage_web.<staging-ref>` for an approved Supavisor pooler;
- direct staging host `db.<staging-ref>.supabase.co:5432`, or a matched Supavisor `*.pooler.supabase.com` endpoint with approved port 5432 or 6543;
- TLS certificate and hostname validation. An optional trusted `PC_DB_CA_PEM` adds trust roots; it must **not** disable certificate verification.

The disposable CI exception requires `PC_DATABASE_MODE=ci`, `PC_ALLOW_DISPOSABLE_LOCAL_TEST=true`, localhost `poc_test` and exactly `pc_ci_web`. A remote database cannot use that mode.

**Important implementation boundary:** The restricted hosted role `pc_stage_web` is initially **NOLOGIN**. Later enabling LOGIN and setting its unique password must be performed via a protected secrets workflow, with credentials stored in the selected hosting provider's encrypted environment settings. **Do not paste passwords, connection strings, or preview tokens into chat, GitHub, PR logs or public web pages.** The CI uses disposable strings only.

**A database connection guard cannot replace authorization.** The existing `x-preview-token` request header is an internal testing mechanism, not acceptable as sole protection for a public hosted preview. Vercel/team access protection, owner-specific authentication, no-store responses, rate limiting, secret rotation and independent API/role negative checks must be completed first.

## 2. Hosted source-archive recovery rehearsal

A read-only recovery test was executed in the dedicated Supabase project. It:
1. Read `poc.snapshots.original_raw_text` for `v0.9.1`.
2. Compared the SHA-256 of the archived text to its stored checksum. Result: match.
3. Parsed the original JSON and reconstructed the following in **transaction-local temporary tables**: 84 substances, 41 sources, 37 claims, 15 lot observations, five evidence issues.
4. Checked unique IDs for reconstructed collections and verified zero orphan claims, missing claim-source IDs, or orphan lot-substance references.
5. Dropped all temporary tables automatically. It did not mutate primary research or publication data.

**Test result:** Source-archive reconstruction and referential integrity **PASSED** in hosted Supabase.

**Explicit limit:** This was **not** a complete database, role/policy, object-storage or disaster-recovery restoration. A real recovery drill must restore an export to an isolated database, test the schema versions, grants, audit history, content hashes and server application routes, and measure RPO/RTO. The Free plan's actual backup/export options need verification; no guaranteed automated backup is claimed.

## 3. Role and application test plan

| Test | Expected | Execution state |
|---|---|---|
| OPS-S01/S02 | Target staging and approved pooled connection modes require exact scoped reader identity and TLS verification | Covered by new Node unit tests in PR |
| OPS-S03/S04 | Insecure options, CareerOS and arbitrary Postgres projects rejected | Covered by new Node negative tests in PR |
| OPS-S05/S06 | Superuser, service, editor identities rejected; CI mode impossible on hosted DB | Covered by new Node negative tests in PR |
| OPS-S07/S08 | Custom CA preserves verification; error text never includes password | Covered by new Node unit tests in PR |
| OPS-R01 | Staging role exists as `NOLOGIN` and inherits only `pc_preview_reader` | Verify after hosted migration is applied |
| OPS-R02 | App role cannot read `poc`, change `pc_preview.snapshots`, or change publication state | CI with disposable Postgres and later hosted restricted login |
| OPS-R03 | Anonymous/external Data API cannot read private schemas, even if knowing exact table names | Still requires real external request |
| OPS-R04 | Separate hosted Next.js API with protected owner auth, no secrets in browser, correct research counts | Not run against hosted project |
| OPS-R05 | Full backup/restore, provider recovery and incident process | Not run |

**Source content remains provisional.** None of these tests authenticate laboratory reports, approve a medicine, verify a pharmacy, or authorize a public medical-information release.

## 4. Hosting connection blocker

Vercel connection currently lacks access to team `amy2213s-projects` (`team_9i4HiRVW06uMlXsFFawwFiUv`). A one-time team authorization link must be approved by the owner before an app/deployment can be inspected or changed. Obtain a **fresh** link using the Vercel team authorization workflow; its consent links expire after 10 minutes.

Do **not** create or deploy a public Vercel project while that access is missing. The existing GitHub Pages site remains unchanged. Never repurpose CareerOS or insert credentials into GitHub issue comments.

## 5. Exit conditions

- Dedicated hosted identity with unique secret, limited roles and TLS tested.
- Real anonymous and signed-in Data API negative access tests complete.
- Owner-only hosting protection independently verified, including preview URLs and any deployment aliases.
- Hosted application all 10 API tests pass against actual staging reader account.
- Full recoverability method documented, export/recovery tested to the extent supported by the actual plan.
- G2 user/evidence validation, G3 review, G6 security/accessibility/content and G7 public launch remain separately governed.

**Current disposition:** Source archive recovery test passed; safe application configuration and disposable role tests under review. No end-to-end hosted app access or public publication verified.
