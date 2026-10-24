# Peptide Clarity | FEATURE-004: Peptide → Company → Compare

**Version:** 0.4 (owner-led draft)  
**Recorded:** 2026-10-24  
**Status:** Implemented as an INTERNAL preview on a draft GitHub branch; NOT G7 approved; not merged into published `main`.  
**Authority:** GOV-001, DEC-001, DEC-002, VISION-001, owner request to connect peptide information to listed companies and comparisons.

## User need and interaction
A visitor should select or search a substance, read science and relevant regulatory context in ordinary language, follow source references, see companies with specifically documented product listings or certificate-index entries, open company evidence profiles, and compare company documentation. Existence of an index listing is NOT a live-stock or purchasability guarantee. Research-only substances are not a personal-use purchase recommendation.

### Demonstrated navigation
1. Home: five searchable substance records: semaglutide, tirzepatide, BPC-157, Semax, GHK-Cu.
2. Substance page: source-linked draft science where presently available. Semax/GHK-Cu explicitly marked scientific synthesis pending, not falsely displayed as validated.
3. Under the substance: real published source observations of product or laboratory document-index entries, with lot and formulation, observation date, authentication gap, and source link.
4. Company dossier: categories for legal identity, address/contact, product reporting, lab authenticity, batch relationship, contamination tests, pricing/policies, enforcement context, corrections.
5. Comparison: choose a substance and select two companies. Desktop: side-by-side evidence table. Mobile: two separately labeled evidence cards. Differences in formulation shown prominently, never presented as interchangeable products.
6. COA guide: clearly fictional educational sample; real automated document upload/extraction NOT implemented.

## Starting data (limited, documented, not comprehensive)
- **Five substance records.** Only three have prior source-linked scientific draft claims; two have explicitly unfinished science summaries.
- **Two company records:** Particle Peptides, Polaris Peptides.
- **Five company-product link records**: BPC-157/Particle (COA index; lot PO-2026346); BPC-157/Polaris (GLOW 70 blend listing; lot POL-GLOW70-1); Semax/Particle (index; PO-2026345); GHK-Cu/Particle (index; PO-2026369); GHK-Cu/Polaris (GLOW 70 blend listing). All have URLs and 2026-10-24 observation date.
- Regulated semaglutide/tirzepatide pages explicitly describe licensed prescriber/pharmacy pathways instead of equating online research vials with approved medicine. No specific pharmacy licensed/price availability checked.
- **Important:** A seller's lab index is *seller-published*. No independent confirmation of lot identity, issuer authenticity, representative sampling, clinical safety, sterility, or current stock is claimed.

## Current sources for company link records
- Particle Peptides COA Vault, public index: https://particlepeptides.com/en/coa-vault (observed 2026-10-24, index entry not an issuer confirmation).
- Polaris GLOW 70 product listing: https://polarispeptides.com/product/ghk-tb-bpc-glow/ (observed 2026-10-24; product blends must be kept separate from standalone preparations).
- FDA's online pharmacy safety guidance: https://www.fda.gov/consumers/consumer-updates/how-buy-medicines-safely-online-pharmacy
- ClinicalTrials.gov BPC-157 study registration: https://clinicaltrials.gov/study/NCT07437547 (study registration ≠ outcome results).
- Project file `DATA-001_source_claim_ledger_v0.2.json` remains the evidence source for 11 carried-forward scientific draft claims (not yet expert reviewed).

## Limitations and risks
- No general supplier database, automatic extraction, clinical or legal sign-off, direct independent issuer contact, identity verification of named businesses, inventory/price confirmation, comprehensive enforcement research, monitoring, private admin dashboard, synced data, full WCAG review or external audience validation.
- Company assessment statuses must describe precise actions completed. The existence of a company page or outside document is not a statement of safety or quality.
- The business and science layers remain distinct and linked by substance IDs. GLOW is a variable blend, not a standardized single molecule. Semax and GHK-Cu science summaries remain explicitly incomplete.
- External interviews remain deferred under DEC-002 and N=1 owner evaluation has not yet been recorded for this build.

## Draft scope acceptance checks
- [x] Search and open a selected substance.
- [x] Show company associations only where specific public evidence was observed.
- [x] Open company dossier with explicit evidence gaps and source access.
- [x] Compare two vendors for a selected substance without inventing a composite safety score.
- [x] Make both companies visible on mobile without horizontal scrolling of the comparison table.
- [x] Mark approved-prescription pharmacy channel separately from research-only listings.
- [x] Keep public `main` unchanged pending further review.
- [ ] Owner usability walkthrough and corrections.
- [ ] Independently review scientific and relevant lab evidence.
- [ ] Confirm business registry / issuer / lot authenticity and fair correction method where feasible.
- [ ] PDP v1.0 and G7 approval before any approved public release.

**Change classification:** Feature F-004 in Discovery/Prototype, **NOT Ready to Build by general-audience product gate**; exploratory implementation via DEC-001/DEC-002 exception.