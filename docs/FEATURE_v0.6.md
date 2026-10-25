# Peptide Clarity: FEATURE-006, expanded name index and autocomplete

**Version:** v0.6 owner-testing draft  
**Snapshot:** October 24, 2026  
**Status:** Not a reviewed public product release. This is a UX/catalogue expansion proposed under GOV-001 and DEC-001/002; any new public deployment requires an appropriately recorded approval.  
**Repository:** amy2213/peptide-clarity  

## Problem
The v0.5 homepage has seven substance records and an exact-name-oriented search with no suggestions. The initial selection looks incomplete, and alternative spellings or brand names are hard to discover.

## Change delivered
- **84 navigational substance and related-term entries**: 47 research-peptide names, 24 peptide-medicine or analogue names, 10 explicitly separated non-peptide/protein/mixture entries, three commercial blend/marketing terms. These are a **name index**, not 84 researched substances.
- **77 new catalogue entries**, 104 normalized aliases total. Earlier seven research records preserved. Three new names have *narrow FDA product-status source records* (elamipretide/Forzinity, bremelanotide/Vyleesi, tesamorelin/Egrifta); their clinical profiles remain pending independent scientific/editorial review.
- Search autocomplete: nine visible candidates, supports name and alias matching (hyphens, spaces and casing ignored), click/tap, ArrowUp/Down, Enter, Escape, ARIA combobox/listbox state, and visible match totals.
- Search populates the homepage results as typed. The default homepage shows nine featured names and a **Browse all substance names** toggle rather than 84 cards.
- Clicking an incomplete catalogue entry shows an explicit **Catalog entry only: scientific and regulatory review not completed** warning and no fabricated scientific claims or supplier matches.
- Existing supplier/company search, five company dossiers, 15 company–lot associations, source links, comparison of up to three companies, and educational COA guide stay intact.

## Editorial handling
**No inference of FDA authorization, medical effectiveness, medical safety, assay quality, current inventory, purchase suitability or scientific-study results from a name index.** A category like "Peptide medicines and analogs" is a browse grouping, not a certification or complete list of approvals. Entries including NAD+, 5-Amino-1MQ and MK-677 are identified as non-peptides; GLOW/KLOW are seller-specific labels, not fixed chemical identities; TB-500 is not automatically equated to all thymosin beta-4 formulations.

For product-status examples, the source of truth is FDA:
- [Forzinity / elamipretide accelerated approval, September 2025](https://www.fda.gov/news-events/press-announcements/fda-grants-accelerated-approval-first-treatment-barth-syndrome) (specific labeled indication)
- [FDA label record for Vyleesi / bremelanotide](https://nctr-crs.fda.gov/fdalabel/ui/spl-summaries/criteria/461961) (specific regulated prescription product)
- [FDA Egrifta / tesamorelin listing](https://purplebooksearch.fda.gov/index.cfm?blaNo=022505&event=productdetails) (formulation and marketing status vary)
- [FDA compounding safety list](https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks) (named peptides / concerns; not automatic approval inference)

## Counts, definitions and risks
- `data/public-research-v0.6.json`: 84 indexed names, 26 source records (22 inherited, four FDA additions), existing five company dossiers and 15 associations with 14 distinct company+lot IDs and five unresolved discrepancies.
- Of the 84 names, **six currently have initial source-linked claim records**. This is *not* six fully scientifically reviewed profiles. The remaining 78 have incomplete or no claim synthesis and the interface labels them accordingly.
- Aliases point to one canonical name where applicable; a commercial blend must never be collapsed into an authenticated single molecule.
- Browser-only no back-end, no user uploads, no supplier purchase mechanism, no medical or dosing guidance.
- `noindex` is not a privacy control. GitHub repository/Pages content is publicly visible.
- Full independent scientific, regulatory, legal, privacy/security and accessibility checks remain outstanding; G7 not approved. Owner-led evaluation N=1; outside user interviews deferred under DEC-002.

## Review tasks
1. On mobile, tap search and inspect the dropdown while empty.
2. Type `bpc157`, `ss31`, `pt141`, `nad+`, and `glow`, selecting the desired result.
3. Confirm FDA product-specific evidence appears only with a matching primary source.
4. Open a pending name and verify it does **not** show invented supplier findings.
5. Expand all 84 names and collapse back to featured entries.
6. Confirm company searching and comparison still work.
7. Identify any additional names or aliases important to the owner for future inclusion.