# PDP-001 | v0.3 Working Product Scope Addendum

**Date:** 2026-11-08 | **Status:** PROPOSED / NOT APPROVED AS PDP v1.0  
**Parent:** GOV-001 (APPROVED); PDP-001 v0.2 (WORKING), Library `/Research Transparency Platform/`  
**Reason:** Owner reconfirmed the full product objective: plain-English peptide education **and** ways to investigate supplier quality/documentation, compare pharmaceutical access and research-company claims.

This is a controlled **draft** for the next G2 decision, not a product release instruction. It preserves DEC-001 and DEC-002's bounded owner-led testing, and requires a separate G7 release decision.

## Mission proposal

Help a non-specialist **understand the science, distinguish regulatory/product categories, evaluate inspectable supplier evidence and understand legitimate access channels**, with transparent uncertainty and no false guarantee that a research product is safe.

## Three separate user pathways

### A. FDA-approved medicines and verified prescription access
**User task:** Understand a specified FDA-approved product and legally compare verified licensed pharmacy access options where practical.  
**Model fields:** Active ingredient, product name, indication, formulation, prescription requirement, approval authority/source + review date, pharmacy identity and licensure evidence by jurisdiction + date, legitimate access route, disclosed price/coverage caveats.  
**Boundaries:** Approval of a specific medicine is not approval of a research vial using the same compound name. Do not encourage bypassing prescription requirements or assert current prices/licenses without verification.

### B. Compounded medications
**User task:** Recognize that compounded formulations are **not FDA-approved finished products**, understand when and how licensed entities may compound, and what information can and cannot be verified.  
**Model fields:** Formulation, compounding entity, jurisdiction, substantiated 503A/503B or other applicable framework, source date, documented restrictions, prescription pathway and uncertainty.  
**Boundaries:** No blanket claim that a compounded drug is approved, tested by FDA, equivalent to an approved product or automatically legal for a particular use; jurisdiction and current FDA/board rules require qualified review.

### C. Non-FDA-approved research substances and documentary supplier comparison
**User task:** Explore companies' **research catalog and test-document claims**, reported price metadata where verified and legally appropriate, report/lot traceability and unresolved questions.  
**Model fields:** Substance and marketing names, legal entity, company site, observation date, listing and document identifiers, reported prices/units/date, laboratory name, reported method, certificate and lot identifiers, lab issuer authentication, sample custody verification, source links, revision history and correction requests.  
**Boundaries:** No supplier safety certification, no medical-use ranking or purchase referral for unapproved human use. Research suppliers and COAs cannot be presented as equivalent to licensed pharmacies or proof of human-use suitability.

## Core cross-path features (draft)

- **Discover:** Search 84 indexed names, aliases and curated source-backed topics; identify related non-peptides and marketing blends explicitly.
- **Understand:** Plain-English first; evidence, human/animal/in vitro separation, unknowns and regulatory distinctions.
- **Compare:** Side-by-side objective fields with source, date, unknown status and comparability caveats. Avoid invented scores.
- **Investigate:** Inspect company dossier, report provenance, corrections and scientific source records.
- **Verify:** Independent review status shown distinctly from 'source linked' or 'seller published'; disclose all open validation items.

## G2 acceptance still needed

1. Confirm intended audience and jobs under DEC-002 owner-led observations (N=1, not representative validation).
2. Record exact MVP inclusions/exclusions and legal constraints for each pathway.
3. Resolve data model and price/licensure-refresh feasibility, source provenance and high-risk supplier comparability.
4. Define accessible navigation mockups, comprehension tasks, expected error states and risk mitigations.
5. Record privacy, medical/editorial, expert, regulatory, supplier-fairness and business-independence controls.
6. Approve PDP v1.0 explicitly before marking new product features Ready to Build; separate G7 decision needed for any final release.

## Open risks / negative cases

- Visitors mistake a research seller's COA for medical safety approval.
- Visitors mistake compounded medication for FDA-approved product or pharmacy certification.
- Licenses, pharmacy availability, research listing price and seller identity become stale.
- HPLC peak purity falsely presented as sterility, identity, dose, freedom from endotoxins or safety.
- Affiliate incentives distort presentation; unknown evidence becomes a positive label.
- User mistakes educational company evidence directory for a specific recommendation to buy or inject a nonapproved substance.

## Linked tracking

[REQ-010](https://github.com/amy2213/peptide-clarity/issues/7) · [REQ-011](https://github.com/amy2213/peptide-clarity/issues/8) · [REQ-012](https://github.com/amy2213/peptide-clarity/issues/9) · [REQ-013](https://github.com/amy2213/peptide-clarity/issues/10) · [REQ-014](https://github.com/amy2213/peptide-clarity/issues/11). No product implementation authorized by this draft.
