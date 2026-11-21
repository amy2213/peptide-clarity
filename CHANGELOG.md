# Peptide Clarity | Changelog

The entries here summarize **repository changes**, not independently verified medical information or formal public-product launch approval. See [controlled release history](docs/RELEASE_HISTORY.md) and [development control center](docs/CONTROL_CENTER.md).

## 2026-11-21 | OPS-003 · Restricted hosted staging role and connection guard

- Added fail-closed staging connection validation requiring correct Peptide Clarity Supabase project, scoped reader identity and verified TLS; prevented CareerOS/superuser connections. Local CI exception restricted to disposable localhost.
- Applied hosted migration to create `pc_stage_web` **NOLOGIN** with owner-preview read privileges only; grants and privilege metadata verified without creating an application password.
- Reconstructed archived research JSON in transaction-local temporary tables, verified checksum and foreign-key relationships; this is **not a full backup-and-restore drill**.
- CI structural, relational and Next.js API smoke/negative tests passed. Hosted Vercel deployment and external anonymous-client tests remain blocked pending provider authorization and secure secrets.
- [OPS-003 report](docs/OPS-003_HOSTED_CONNECTION_AND_RECOVERY_2026-11-21.md). No public site changes or G3/G7 release approval.

## 2026-11-21 | OPS-002 · Hosted staging baseline validated

- Confirmed owner-created Peptide Clarity Staging Supabase project is separate from CareerOS, active PostgreSQL 17.11 in `us-east-1`; CareerOS not touched.
- Installed approved private `poc` legacy schema and owner-only `pc_preview` RLS/projection schema in two recorded hosted migrations. Imported and reconciled 84 substances, 104 aliases, 41 sources, 37 claims, 47 claim-source links, 15 original lot rows and all 190 raw records.
- Seeded one owner-preview-only snapshot with `public_approved=false`, zero inferred FDA-approved products or authenticated laboratory reports.
- Hosted permission **metadata** checks indicate unauthorized schema/grants denied and six scoped preview policies installed. Direct anonymous API/role tests, hosted Next.js integration, backup/restore and G2/G3/G7 gate approvals still open.
- [Full hosted execution evidence](docs/OPS-002_STAGING_EXECUTION_EVIDENCE_2026-11-21.md).

## 2026-11-09 | G2-EVID-002 / DATA-008 / OPS-002 · Evidence and hosted staging readiness

- Extended primary FDA/Texas pharmacy source desk audit and assessed four competitor/comparator workflows with specific source/date and uncertainty limitations.
- Reconciled all five existing research company dossiers: 15 lot-substance observations, 14 provisional seller/lot groups, one direct seller report URL, zero independently authenticated lab issuers/sample custody results.
- Documented dedicated Supabase staging decision gates, environment isolation and 12 hosted negative/acceptance tests; **no Supabase project created, no billing approved, and no CareerOS change**.
- Owner-led N=1 usability tasks, final scientific/regulatory/legal review, G2/G3 gates and G7 public launch remain pending.

## 2026-11-08 | G3-SEC-001 / APP-001 · Isolated secure staging architecture

- Added protected `pc_preview` PostgreSQL projections, restricted reader/visitor/ingestion roles, explicit RLS and role-negative tests.
- Added standalone Next.js owner-preview shell and five protected, read-only server API endpoints for substance, claim, company and lot research.
- Added CI disposable PostgreSQL security and HTTP API test workflow; **no hosted Peptide Clarity database and no public deployment**.
- Added [preliminary G2 evidence and comprehension protocol](docs/G2_EVIDENCE_AND_OWNER_TEST_PACKET_v0.1.md) with FDA source links and owner-led N=1 tasks. Qualified reviews and G2 gate evidence still outstanding.
- Existing GitHub Pages `index.html` unchanged. G3/G7 gates remain unapproved.

## 2026-11-08 | DEC-005 · PDP v1.0 product scope approved

- Owner approved the three-pathway product scope and prioritized MVP documented in [PDP-001 v1.0](docs/PDP-001_v1.0_APPROVED_2026-11-08.md), with separate [DEC-005](docs/DEC-005_PDP001_V1_SCOPE_APPROVAL_2026-11-08.md) decision.
- Incorporated isolated [POC-001](poc/README.md) relational proof-of-concept files and acceptance tests; **not** a production database or public website update.
- Formal G2 evidence validation, G3 architecture acceptance, qualified source review, security/accessibility checks and G7 release remain pending.

## Unreleased: v0.10 planning

- Proposed three separate comparison pathways: FDA-approved medicines/licensed prescription access; compounded drugs with distinct status; documentary research-company evidence.
- Backlog and draft scope recorded in [REQ-010–014](docs/REQUIREMENTS_REGISTER.md).
- No related application changes released.

## 2026-11-08 | CHG-001 · Development control system

- Introduced controlled documentation index, requirements and change, decision, assumption and risk registers, engineering process, contribution guidance, issue and PR templates, proposed v0.3 PDP scope addendum, release checklist and dependency-free structural CI.
- **No changes to `index.html` or embedded research records.** Control infrastructure only.
- Owner's explicit 2026-11-08 go-ahead covers infrastructure setup; future scope and public releases remain subject to GOV-001 and G7.
- Main-branch protection and validated CI execution are separately tracked in [OPS-001](https://github.com/amy2213/peptide-clarity/issues/13).

## 2026-11-08 | v0.9.1 publicly accessible owner-testing preview

- QA-repaired black-and-teal 3D interface promoted to `main` at commit `4c647a9`, documented in [DEC-004](docs/DEC-004_V091_OWNER_PREVIEW_RELEASE.md).
- Search, browse, profiles, five research supplier dossiers, COA guide and documentary comparisons remain prototype features.
- QA-011 reported 271/271 scripted candidate assertions; no independent scientific or clinical validation or final G7 release authorization.
