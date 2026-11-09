# Peptide Clarity | Requirements Register

**Status:** PDP-001 v1.0 **PRODUCT SCOPE OWNER APPROVED** in [DEC-005](DEC-005_PDP001_V1_SCOPE_APPROVAL_2026-11-08.md). G2 evidence validation and per-feature GOV-001 F-001 approvals remain outstanding; no G3 or G7 approval.

| ID | Candidate requirement | Class | Status | Tracking |
|---|---|---|---|---|
| REQ-010 | Update PDP to explicitly separate approved medicines, compounded drugs, and research-only company evidence | Product definition | **Scope approved DEC-005; G2 validation open** | [#7](https://github.com/amy2213/peptide-clarity/issues/7) |
| REQ-011 | Show product-specific FDA approval and verified licensed-pharmacy prescription access information | Product feature | In approved MVP scope; F-001/build gate pending | [#8](https://github.com/amy2213/peptide-clarity/issues/8) |
| REQ-012 | Separate compounded-medication status and risk disclosures from FDA-approved products | Product feature | Proposed | [#9](https://github.com/amy2213/peptide-clarity/issues/9) |
| REQ-013 | Compare public research-company/COA evidence without unverified safety ratings or human-use referrals | Product feature | Proposed | [#10](https://github.com/amy2213/peptide-clarity/issues/10) |
| REQ-014 | Clear full substance library, accessible search, beginner-first profiles and company discovery | UX | In approved MVP scope; F-001/build gate pending | [#11](https://github.com/amy2213/peptide-clarity/issues/11) |
| ARCH-001 | Design three-layer modular architecture, relational evidence schema, private/published access and migration/rollback | Architecture G3 | Draft for owner review, G3 not passed | [#16](https://github.com/amy2213/peptide-clarity/issues/16) |
| G3-SEC-001 | Separate private raw research and owner-only staged projections with real Postgres roles and RLS | G3 validation | Isolated implementation tested; hosted environment not created | [#22](https://github.com/amy2213/peptide-clarity/issues/22) |
| APP-001 | Build minimal Next.js protected read-only substance/company evidence API | G3 application spike | Build and CI API tests demonstrated; no public deployment | [#23](https://github.com/amy2213/peptide-clarity/issues/23) |
| G2-EVID-001 | Regulatory/competitor desk audit and owner-led N=1 comprehension protocol | G2 validation | Preliminary desk evidence; actual owner tasks and expert review open | [#24](https://github.com/amy2213/peptide-clarity/issues/24) |
| QA-012 | Validate iPhone, accessibility, live hosting, expert sources and supplier provenance | Verification | Open | [#12](https://github.com/amy2213/peptide-clarity/issues/12) |
| OPS-001 | Enforce review and CI checks in repository settings | Operations | Open | [#13](https://github.com/amy2213/peptide-clarity/issues/13) |

## Acceptance and traceability discipline

An item is **Ready to Build** only with a specific problem, evidence, interaction design, data provenance, testable acceptance criteria, risk analysis, dependencies and explicit owner approval under GOV-001 F-001. Each PR shall cite a requirement ID. Each release shall cite tested PRs, unresolved findings and its owner decision. Do not treat Issue creation as product approval.

Existing PDP draft candidate functional requirements FR-001 through FR-007 remain relevant. This register does not replace, revise, approve or renumber them.
