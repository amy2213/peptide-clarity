# Peptide Clarity | Assumptions and Risk Index

**Record:** AR-REG-001 | **Maintained:** 2026-11-08 | **Status:** PROVISIONAL INDEX, not risk acceptance.

The **authoritative initial assumptions and risks** are in PDP-001 v0.2 (WORKING), project Library `/Research Transparency Platform/PRODUCT_DEFINITION_PACKAGE_v0.2_WORKING.md`. The table below links current work to that draft. It is not a substitute for formal G2 review.

| Risk / assumption | Potential failure | Current mitigation or investigation | Status / tracking |
|---|---|---|---|
| A-001 / A-003 | Non-specialists do not understand claims or site creates false confidence | Owner-led comprehension tasks; outside interviews deferred by DEC-002 | UNVALIDATED, no representative audience claims |
| A-004 / R-002 | Supplier COAs and purported lots cannot be authenticated | Lot/source/issuer mapping and analytical expert review; avoid 'safe seller' ratings | OPEN; [REQ-013](https://github.com/amy2213/peptide-clarity/issues/10) |
| A-005 | Source/price/pharmacy/company records age too quickly | Per-field observed date and refresh responsibility to be defined | UNTESTED; [REQ-010](https://github.com/amy2213/peptide-clarity/issues/7) |
| R-001 / R-003 | Scientific source claims interpreted as human-use advice or efficacy | Plain-English limitations, claim citations and qualified review | OPEN; [QA-012](https://github.com/amy2213/peptide-clarity/issues/12) |
| R-004 | Unfair or unsupported negative supplier characterization | Evidence ledger, source snapshots, corrections and company-response workflow | OPEN; [REQ-013](https://github.com/amy2213/peptide-clarity/issues/10) |
| R-007 | User information leaked through public repo or future uploads | No private data/credentials in public GitHub; privacy assessment before uploads/accounts | OPEN; [OPS-001](https://github.com/amy2213/peptide-clarity/issues/13) |
| R-008 | Funding/affiliate links bias assessments | Funding disclosures and strict separation from research judgment | OPEN; product model not approved |
| New scope risk | Compounded product misidentified as FDA-approved medicine | Three separate categories, product-specific approval sourcing, regulatory expert review | PROPOSED; [REQ-011](https://github.com/amy2213/peptide-clarity/issues/8) / [REQ-012](https://github.com/amy2213/peptide-clarity/issues/9) |
| New scope risk | Research company evidence mistaken for a human-use purchasing recommendation | Documentary-only comparison, source/review status, no clinical dosing or 'safe to purchase' score | PROPOSED; [REQ-013](https://github.com/amy2213/peptide-clarity/issues/10) |
| QA-012 | CI pass mistaken for independent medical, accessibility, regulatory or live hosting validation | Manual/expert reviews and discrete G7 decision; show explicit limitations | OPEN; [QA-012](https://github.com/amy2213/peptide-clarity/issues/12) |

**Process:** Each assumption should have a falsifiable test, owner and review date. Each risk should identify likelihood, severity, evidence, mitigation, remaining exposure, accountable owner and approval. Do not assign fictitious acceptance or closure. Update after any meaningful source, regulation, accessibility or deployment finding.
