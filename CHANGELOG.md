# Peptide Clarity | Changelog

The entries here summarize **repository changes**, not independently verified medical information or formal public-product launch approval. See [controlled release history](docs/RELEASE_HISTORY.md) and [development control center](docs/CONTROL_CENTER.md).

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
