# G3-SEC-001 / APP-001 | Isolated Staging Proof, Runbook and Decision Boundaries

**Prepared:** 2026-11-08 | **Status:** OWNER-TESTING IMPLEMENTATION SPIKE; G3 **NOT PASSED**, G7 **NOT APPROVED**  
**Pull request:** [#25](https://github.com/amy2213/peptide-clarity/pull/25)  
**Requirements:** [G3-SEC-001 issue #22](https://github.com/amy2213/peptide-clarity/issues/22), [APP-001 issue #23](https://github.com/amy2213/peptide-clarity/issues/23).  
**Product scope:** PDP-001 v1.0 owner-approved; G2 evidence validation still open.

## 1. What is implemented

1. An isolated PostgreSQL 17 database under disposable GitHub Actions, with the legacy schema in \`poc\` and owner-preview-only projection schema \`pc_preview\`.
2. A private source/owner-preview data boundary with distinct NOLOGIN PostgreSQL roles:
   - \`pc_preview_reader\` has SELECT only on owner-preview projections, with RLS.
   - \`pc_preview_visitor\` has no preview or raw-source schema access.
   - \`pc_ingest_worker\` has no publish, preview or source-reading permissions under this POC (a future narrowly scoped staging role needs separate work).
3. RLS policies on six owner-preview tables with **FORCE RLS**, allowing read only when the snapshot has \`owner_preview_enabled=true\` and \`public_approved=false\`.
4. Explicit manual (not automatic ingestion) owner-preview snapshot generation from the previously public v0.9.1 research fixture. It is not qualified scientific evidence or a public release.
5. Five Next.js read endpoints, all protected by a server environment token (minimum 32 chars), parameter validation, generic failure responses and no-store/noindex headers:
   - \`GET /api/preview/health\`
   - \`GET /api/preview/substances?search=&limit=&offset=\`
   - \`GET /api/preview/substances/:id\`
   - \`GET /api/preview/companies?limit=&offset=\`
   - \`GET /api/preview/companies/:id\`
6. A standalone static Next.js preview shell. It deliberately contains **no public database-backed pages** or visitor login flow.

**Data coverage:** 84 preview substance records, 37 source-linked claim projections, 5 company dossiers, 15 separate lot-substance observations, 5 evidence issues. Two Polaris GLOW records share a company/lot code but are not certified as one physical batch. Independent issuer and sample custody verification remain false.

## 2. Data and publication design

\`\`\`mermaid
flowchart LR
  RAW[(poc: private legacy records)] -->|Manual controlled seed| P[(pc_preview: owner testing snapshot)]
  ANON[Anonymous visitor / ingester] -.->|Denied| P
  READER[Read-only preview API identity] -->|RLS + SELECT| P
  P --> NEXT[Next.js server routes]
  TOKEN[Owner staging token] --> NEXT
  NEXT --> TEST[Owner-only testing client]
  P -.->|No public release| PUB[Future approved public snapshot]
\`\`\`

**Verified limitations:** A private preview token is **not** production-grade authentication or a general-access authorization model. A public production site should use proper authenticated owner/editor identities, resource-level permissions, secrets management and approved publication state machines. Do not reuse the CI test token in a live deployment.

**Publication status:** \`public_approved\` is always false for the snapshot, and a reader/ingest role cannot change it. Automatic source ingestion cannot promote a release.

## 3. Files and what they do

| Path | Responsibility |
|---|---|
| \`poc/sql/postgres/004_owner_preview_security.sql\` | Roles, schema, projections, explicit grants, RLS policies |
| \`poc/sql/postgres/005_seed_owner_preview.sql\` | Manual owner-preview projection of the v0.9.1 fixture |
| \`poc/sql/postgres/006_verify_owner_preview.sql\` | PostgreSQL positive/negative access tests, RLS shutoff, source status preservation |
| \`apps/web/package.json\` | Experimental, independently versioned Next.js TypeScript project |
| \`apps/web/lib/preview-guard.ts\` | Server-only authorization gate, constant-time hash check, no-store status/error responses |
| \`apps/web/lib/preview-store.ts\` | Parameterized read-only projections through restricted DB identity |
| \`apps/web/lib/preview-input.ts\` | Exact query/pagination and ID constraints |
| \`apps/web/app/api/preview/**\` | Five protected GET-only route handlers |
| \`poc/tests/owner-preview-http.test.mjs\` | End-to-end auth/search/evidence and data-leak regression |
| \`.github/workflows/g3-staging.yml\` | Disposable PG instance, SQL security tests, Next build/typecheck and real HTTP smoke |

## 4. Local reproduction (for a qualified engineer)

**Prerequisites:** Node.js 22+, PostgreSQL 17 running in an isolated environment, \`psql\`, permission to create temporary roles, and no access to unrelated personal projects.

- Run POC original schema and importer in order: \`001_legacy_evidence.sql\`, \`002_import_legacy.sql\`, \`003_verify.sql\`.
- Run new permissions and snapshot scripts: \`004_owner_preview_security.sql\`, \`005_seed_owner_preview.sql\`, \`006_verify_owner_preview.sql\`.
- Create a **dedicated** read-only login role, inheriting \`pc_preview_reader\`, with a unique local secret; never use a superuser or Supabase service key in \`DATABASE_URL\`.
- In \`apps/web\`, install dependencies, configure **server-only** \`DATABASE_URL\` and a random \`PREVIEW_ACCESS_TOKEN\`, and run \`npm run build\` / \`npm start\`.
- Run protected HTTP checks under \`poc/tests/owner-preview-http.test.mjs\`.
- Prefer GitHub Actions for reproducible test execution, as \`.github/workflows/g3-staging.yml\` provisions its own disposable database.

**Never** commit actual connection strings, service-role secrets, private pharmacy records, patient information or unpublished supplier correspondence. The \`.github/workflows/g3-staging.yml\` strings are **test-fixture credentials valid only inside its disposable CI container**.

## 5. What passes, what does not

Evidence status must be updated from the actual workflow conclusion and logs. As of initial implementation, the first workflow completed successfully for schema creation, isolated role tests, Next.js build, TypeScript compilation and ten HTTP tests. Full production/Supabase roles are **not tested** by this disposable job.

Open:
- No dedicated Peptide Clarity hosted Supabase project or Vercel deployment created.
- No production role provisioning, MFA/identity management, approval workflow, authenticated editorial dashboard, public API, file upload handling, secrets rotation, backup restore or user-data privacy assessment completed.
- No package lockfile yet at initial prototype stage; require deterministic dependency installation before any promotion.
- No current FDA product-specific approval record or actual pharmacy license imported into public database.
- No expert scientific, legal, analytical, WCAG 2.2 AA or real-device review completed.
- The full QA-013 60-case G3/G6 evidence matrix is not passed; passing subset does not imply G3 approval.
- DEC-002's owner-led N=1 comprehension tasks remain outstanding. Outside interviews deferred, not completed.

## 6. Decision gate for a dedicated hosted development project

A hosted Supabase project is not automatically justified by a successful disposable proof. Before creating one:
1. Choose the owner's Supabase organization explicitly and review vendor/region/billing constraints.
2. Obtain cost quotation and explicit agreement to any nonzero recurring cost.
3. Create a **new project named for Peptide Clarity**, never share or repurpose CareerOS.
4. Configure a private database schema, exposed-schema grants, RLS and appropriate staging identity. Use distinct credentials and restrict preview access at host.
5. Verify actual Supabase grants, RLS and any auto-exposed Data API with an unauthorized client, not just a database superuser.
6. Set backup retention, restore drills, alerts and documentation.
7. Obtain a separately authorized preview hosting decision and a G7 decision before final public product launch.

**Current disposition:** This code is an internal, reversible feasibility slice. The existing GitHub Pages v0.9.1 site is unchanged and remains the bounded owner-testing baseline.
