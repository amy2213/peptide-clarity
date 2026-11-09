# Peptide Clarity | Change Register

**Record:** CHG-REG-001 | **Date:** 2026-11-08 | **Status:** ACTIVE

Use this table as an index. The linked Issue, PR, decision and test evidence contain complete histories; do not replace them with a vague summary.

| Change ID | Original baseline | Change and reason | Owner direction | Scope / affected gates | Status | Verification |
|---|---|---|---|---|---|---|
| [CHG-001](https://github.com/amy2213/peptide-clarity/issues/6) | `main` v0.9.1 | Add control center, logs, templates, baseline test CI, draft PDP addendum and backlog tracking | Explicit 2026-11-08 instruction to proceed | Process/G2/G6 documentation; **no HTML or research-data changes** | Implemented; structural checks verified by readback; hosted workflow execution and enforcement unverified | Check repository files and workflow runs; OPS-001 follows |
| [PDP-001](https://github.com/amy2213/peptide-clarity/issues/18) | v0.2 working definition + v0.3 draft | v1.0 approved product scope / MVP, with remaining G2 evidence checks | **DEC-005 owner scope approval, 2026-11-08** | G2 product scope approved; validation open | Approved scope baseline, still pending gate validation | [PDP v1.0](PDP-001_v1.0_APPROVED_2026-11-08.md) and [DEC-005](DEC-005_PDP001_V1_SCOPE_APPROVAL_2026-11-08.md) |
| [POC-001](https://github.com/amy2213/peptide-clarity/issues/19) | v0.9.1 public research fixture | Bounded relational/PG import spike with source uncertainty preserved | Owner authorized proof of concept, not production database | G3 technical feasibility, G6 later | Isolated GitHub PR validation | 12 SQLite tests and PostgreSQL importer checks demonstrated; other QA-013 gates open |
| [ARCH-001](https://github.com/amy2213/peptide-clarity/issues/16) | v0.9.1 static root and PDP v0.3 working scope | G3 proposed architecture blueprint and field-level migration/test specification; no stack chosen or production code changed | Explicit owner request to build G3 blueprint, **not** permission to implement stack | G3 design, dependent on G2 approval; G6/G7 still open | Draft in review branch, not gate-passed | Documentation readback and internal links; 60 QA test specifications NOT RUN |
| [REQ-010](https://github.com/amy2213/peptide-clarity/issues/7) | PDP-001 v0.2 draft | Proposed three-pathway product definition | Scope approved in DEC-005; remaining evidence and release gates still open | G2 product definition, later G3/G4/G5/G6/G7 | Scope approved | Requirements and risk review pending |
| [REQ-013](https://github.com/amy2213/peptide-clarity/issues/10) | Existing five supplier dossiers | Proposed usable evidence directory and comparison | Concept endorsed; not Ready to Build | G2-G7 | Proposed | No new feature deployed |
| [REQ-014](https://github.com/amy2213/peptide-clarity/issues/11) | v0.9.1 UX | Proposed v0.10 discovery and comprehension improvements | Redesign direction given; acceptance criteria pending | G2-G7 | Proposed | No new feature deployed |

## Required change metadata

Every material change record shall contain: **ID; original approved baseline; requested behavior; rationale; affected files/requirements/gates; safety/regulatory/privacy/accessibility impact; alternatives; owner; explicit decision and date; tests; release approval; rollback; post-release observations**.

Bootstrap authorization authorizes process setup only. Existing DEC-004 is a limited public **owner-testing preview** approval, not a G7 general release. Missing evidence is labeled **not verified**.
