# POC-001 | Reproducible Legacy Evidence Database Spike

**Status:** Bounded engineering proof of concept under owner-approved exploration; no production Supabase project, site rewrite, G3 gate pass or G7 release.

**Scope:** Import and reconcile the **real existing public research JSON** from v0.9.1 into an isolated relational schema. Preserve source-level uncertainty and lack of independent verification.

## Inputs and expected values

- Frozen fixture: `fixtures/researchData.v091.json`, copied from the public `main/index.html` `researchData` script. Baseline source blob SHA `75ea4702085753adb1287844cd86d8e69f0e40aa`.
- 84 substances, 104 aliases, 41 sources, 37 claims, 5 research companies, 45 company-field tuples, 15 reported lot-substance association rows, 14 provisional seller/lot groups, 5 evidence issues (three Unresolved, one Not assessable, one Not inspected).
- No product-specific FDA approval, authenticated laboratory finding, legal pharmacy license, review event or purchasing endorsement is created from the legacy `approved` category text.

## Verification paths

**Fast local relational tests (Node.js 22):**
```sh
node --experimental-sqlite --test poc/tests/legacy-store.test.mjs
```
These exercise foreign keys, idempotency, source traceability, company-lot grouping, unknown states, prohibited inferred approvals, and synthetic approval/licensing constraints in an in-memory SQLite database. **They do not constitute PostgreSQL execution or full Supabase security testing.**

**PostgreSQL 17 CI validation:** `sql/postgres/001_legacy_evidence.sql`, `002_import_legacy.sql`, and `003_verify.sql` execute against a disposable PostgreSQL service in `.github/workflows/poc-relational.yml`. The complete source JSON was imported and database counts, issue statuses, lot associations, product-type constraints, and RLS were checked successfully in relational POC run #6. This verifies the bounded spike, **not** production Supabase permissions, independently verified scientific data, or final migration readiness.

## Data correctness caveats

- The file contains supplier observations already present in the public prototype and no newly collected private information.
- Same seller + lot code is **only a candidate grouping**, not proof that reports correspond to the identical physical batch. Polaris GLOW 50 intentionally has two substance association rows.
- A seller-hosted PDF and a purported laboratory name do **not** establish an independently authenticated issuer or chain of custody.
- The synthetic approved-product records used by tests are **not real medication approvals**.
- A source summary can be incomplete or wrong; imported records remain draft/unreviewed.
- The local harness uses SQLite because an isolated Peptide Clarity Supabase project has not been provisioned. The connected Supabase project named **CareerOS** is unrelated and must not be touched.

## Exit criteria

PDP v1.0 approval remains a separate G2 decision. G3 may not pass before data modeling decisions and full PostgreSQL constraints, security/RLS roles, actual staging reads and source review are validated. Production migration/cutover, legal/clinical pharmacy content, and G7 release are expressly out of scope.
