# Peptide Clarity | Decision and Exception Register

**Record:** DEC-REG-001 | **Maintained:** 2026-11-08 | **Status:** ACTIVE INDEX

This index reports the **documented status** of decisions. It does not introduce new approvals. Originals in the private project Library `/Research Transparency Platform/` remain authoritative for DEC-001, DEC-002 and DEC-003. Public links are available only where the records exist in GitHub.

| ID | Decision / record | Date | Status / consequence | Authoritative artifact |
|---|---|---|---|---|
| GOV-001 | Establish phased process, source-of-truth hierarchy, per-change F-001, G1-G7 | 2026-10-24 | APPROVED process; no automatic product/release authorization | Library: `MASTER_BUILD_STANDARD_v1.0.md` |
| DEC-001 | Permit bounded solo owner-led internal prototype | 2026-10-24 | OWNER-APPROVED exception, not product approval | Library: `DEC-001_SOLO_BUILD_EXCEPTION_2026-10-24.md` |
| DEC-002 | Defer external participant interviews, use owner-led N=1 evaluation | 2026-10-24 | OWNER-APPROVED exception; general audience validation unverified; G7 still required | Library: `DEC-002_OWNER_LED_EVALUATION_AND_INTERVIEWS_DEFERRED_2026-10-24.md` |
| DEC-003 | Public owner-preview update | 2026-10-24 | Historical bounded preview record; exact constraints governed by original | Library: `DEC-003_PUBLIC_OWNER_PREVIEW_UPDATE_2026-10-24.md` |
| DEC-004 | Promote QA-repaired v0.9.1 website root | 2026-11-08 | Approved publicly accessible **owner-testing prototype**, not full G7 public-product launch | [GitHub](DEC-004_V091_OWNER_PREVIEW_RELEASE.md) |
| DEC-005 | Approve PDP-001 v1.0 product scope and prioritized MVP, with G2 evidence conditions outstanding | 2026-11-08 | **OWNER APPROVED PRODUCT SCOPE; G2 VALIDATION OPEN**; no G3 or G7 approval | [Decision](DEC-005_PDP001_V1_SCOPE_APPROVAL_2026-11-08.md) · [Approved scope](PDP-001_v1.0_APPROVED_2026-11-08.md) |
| CHG-001 | Bootstrap tracking controls, docs, templates and CI configuration | 2026-11-08 | Infrastructure setup **authorized** by owner; application code unchanged; hosted CI/branch protection not yet verified | [Issue #6](https://github.com/amy2213/peptide-clarity/issues/6) |
| PDP-001 v0.3 | Proposed three-pathway scope | 2026-11-08 | **WORKING DRAFT ONLY**; no PDP v1.0/G2 approval | [Scope addendum](PRODUCT_SCOPE_PDP-001_v0.3_WORKING.md) |

## New decision record requirements

Use a stable `DEC-XXX` ID and include: statement, alternatives, rationale, evidence, affected requirements/gates, owner, approval date and exact quote or action, status, version, risks, compensating controls, reopen criteria and file/PR references.

Unresolved decisions are recorded as **proposed**, not 'approved by implication'. Changes affecting the product/medical meaning may reopen G2-G7 and require independent review.
