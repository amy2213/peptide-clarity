# G2-EVID-001 | Discovery Evidence and Owner-Led Testing Packet

**Prepared:** 2026-11-08 | **Status:** PARTIAL EVIDENCE / G2 VALIDATION OPEN\
**Governance:** PDP-001 v1.0 scope approved under DEC-005; GOV-001 G2 evidence gate remains open. DEC-002 permits owner-led N=1 and defers external participant interviews.\
**Tracking:** [Issue #24](https://github.com/amy2213/peptide-clarity/issues/24) · [G2-VAL-001 #21](https://github.com/amy2213/peptide-clarity/issues/21)

## 1. Purpose and falsifiable success criteria

Evaluate whether a non-specialist can:
1. Distinguish a substance from an FDA-approved **finished medicine** and a research listing.
2. Recognize a compounded preparation as **not an FDA-approved finished drug**.
3. Explain the difference between vendor-reported COA evidence and independently authenticated laboratory/lot evidence.
4. Locate material source and date, understand an unavailable/stale item, and use corrections.
5. Compare two research-company dossiers without inferring an endorsement, human-use safety, or a valid purchase channel.

**Not yet validated:** generalized audience comprehension, product demand, current company quality, legal pharmacy status, supplier document authentication, independent medical/counsel review.

## 2. Primary regulatory and pharmacy sources (desk verification)

The links below are **candidate authorities** and must be checked for updates when used to support a public claim. A source entry does not establish product-specific legal status without further review.

| Source ID | Primary source, link and date | What it can support | What it cannot support alone |
|---|---|---|---|
| G2-FDA-001 | [FDA: Drugs@FDA overview](https://www.fda.gov/drugs/drug-approvals-and-databases/about-drugsfda), inspected 2026-11-08 | Product/application/label/indication discovery and daily database-update description | Automatic “approved” classification for every vial or formulation with the same ingredient |
| G2-FDA-002 | [FDA: Compounding policies as GLP-1 supply stabilizes](https://www.fda.gov/drugs/drug-alerts-and-statements/fda-clarifies-policies-compounders-national-glp-1-supply-begins-stabilize), FDA update 2026-04-01, inspected 2026-11-08 | Broad 503A/503B constraints, compounded drug not FDA-approved; warning against simply copying approved drugs | A definitive license/legality conclusion for a specific pharmacy, time or patient circumstance |
| G2-FDA-003 | [FDA: Proposed 503B exclusion of semaglutide, tirzepatide and liraglutide](https://www.fda.gov/news-events/press-announcements/fda-proposes-exclude-semaglutide-tirzepatide-and-liraglutide-503b-bulks-list), FDA release 2026-04-30, inspected 2026-11-08 | **Proposed** agency determination and specific 503B list considerations | A **final rule** or present enforcement outcome. Recheck latest docket/status before publication |
| G2-FDA-004 | [FDA: Locate a State-Licensed Online Pharmacy](https://www.fda.gov/drugs/besaferx-your-source-online-pharmacy-information/locate-state-licensed-online-pharmacy), inspected 2026-11-08 | State-board licensure check, prescription requirement, U.S. address/phone and pharmacist contact verification checklist | An endorsement or proof of current license for a named pharmacy without actual board lookup |
| G2-FDA-005 | [FDA: Concerns with unapproved GLP-1 drugs](https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss), inspected 2026-11-08 | Documented concerns and semaglutide salt-form distinctions | Safety rating for any individual research-company product |
| G2-FDA-006 | [FDA: Drug Shortages](https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages), inspected 2026-11-08 | Official current-shortage lookup route | Reliable live availability at a specific retail pharmacy |

**Required before public content:** retrieve product-specific approval application/label; compare with the exact marketed item; verify formulation/jurisdiction/availability; source a pharmacy board license as-of date; obtain regulatory/legal review for compounding claims. Avoid frozen yes/no assumptions about shortage-based exemptions.

## 3. Dated competitor desk audit (preliminary)

These are observations from **competitors' own current pages**, not independently verified counts, lab authentication, endorsement or recommendations.

| Comparator | Observed 2026-11-08 | Relevant experience | Product risk / potential gap to test |
|---|---|---|---|
| [PepIndex](https://www.pepindex.org/) | Claims a dated 0–100 evidence ranking, vendor directory, certificate coverage, price-per-mg and company comparison; page claims 58 indexed vendors, 693 certificate records | Discoverability and proof-linked side-by-side views | Numerical scores may be misread as medical/purchase safety; outbound partner links increase importance of clear editorial independence |
| [Peptigrity COA Lookup](https://peptigrity.com/coa) | Describes lot-code search, laboratory portal checks, quantitative report values and caveats; page says multiple shops can share one code, yet their certificates are not automatically the same | User lookup workflow and lab issuer differentiation | Requires strict separation of reported lot matching, document on file, lab-portal confirmation and sample chain of custody |
| Other named comparators from PDP v0.2 | **Not yet independently reviewed in this audit** | Research tasks only | Do not fabricate comparative features/metrics |

**Strategic hypothesis, not established market fact:** Peptide Clarity can differentiate by combining plain-language approved-medicine/compounding context with documentary research-company evidence, while avoiding misleading global supplier scores. Test with owner task scripts and current competitor route walkthroughs.

## 4. Owner-led N=1 scripted task protocol (not performed yet)

For each task, record: task ID, date/time, browser/device, starting page, first-click path, completion, error/false confidence, source located, user interpretation *before hints*, correction, retest and issue created. Do not assign a public-comprehension percentage from one participant.

| Task ID | Given task | Evidence / correct response | High-risk failure |
|---|---|---|---|
| UX-G2-01 | Find semaglutide and state whether all semaglutide products are FDA-approved | Distinguishes ingredient vs specific approved finished drug vs compounded/research listing | “All semaglutide vials FDA-approved” |
| UX-G2-02 | Explain the status of a compounded formulation | Not an FDA-approved finished product, requires authorized prescription/legal review | “Compounded equals FDA tested/approved” |
| UX-G2-03 | View one company report for BPC-157 | Seller report vs inspected document vs issuer/custody verification distinct | “99% HPLC means sterile and safe” |
| UX-G2-04 | Compare two research company profiles on a mixed-evidence field | Finds source, observed date and unknowns; declines human-use vendor ranking | Unqualified safe-to-buy inference |
| UX-G2-05 | Search catalogue name vs brand alias vs blend | Distinguishes alias, ingredient, commercial blend and related non-peptide | Marketing name misclassified as chemical identity |
| UX-G2-06 | Find source backing a claim and a correction record | Exact source/document/observation date/review state | Blank source or stale “verified today” |
| UX-G2-07 | Search an online pharmacy access record | Official state board link, Rx requirement, jurisdiction, checked date; no stock promise | “Online listing = licensed and currently stocked” |
| UX-G2-08 | Attempt to use browser only by keyboard and screen reader | Search, results, tables and comparison navigation usable | Unlabeled controls, trapped focus, hidden status |

**Form for evidence:**
- Task ID and date:
- First interpretation (verbatim, before prompting):
- Steps and exact clicks:
- Result: completed / failed / ambiguous / blocked
- Misconception or false-confidence finding:
- Source ID / screenshot / screen recording link:
- Severity (P0-P3) and proposed correction:
- Retest with same task, result:
- Owner decision / limitation:

## 5. Supplier evidence authentication feasibility

**Observed baseline, not a finished laboratory audit:**
- Five initial company dossiers; 15 reported lot-substance associations across 14 company+lot-token candidates.
- Only one original lot row contains a direct \`reportURL\`, and **zero** original records have issuer or sample custody independently authenticated in the dataset.
- Supplier webpages and company identity claims are public observations; they are not proven legal-entity records or pharmacy licenses.
- Normalize reported laboratory results into separate “seller observation” and “independent authentication event” tables.
- A direct laboratory lookup, lab-authored signed artifact or authenticated lab confirmation can be investigated; it must still not establish the custody of any consumer-held vial unless chain-of-custody evidence exists.

**Unresolved feasibility measurements** (capture exact hours, costs, and sample results during a controlled 5-company pilot):
1. Percentage of claims with a retrievable actual report (not just company page).
2. Percentage whose report issuer can be independently confirmed with laboratory.
3. Percentage with test method, sample identity, lot code and dates coherently mapped.
4. Costs and elapsed time per verified observation; conflict and correction rates.
5. Access/license/copyright/ToS limitations for storing or linking third-party reports.

No numerical results are invented; these remain open until the pilot is actually performed.

## 6. Risks, owners and blocked decisions

| Risk | Severity | Accountable role | Status / next evidence |
|---|---|---|---|
| Regulated product vs compound vs research listing confused | Critical | Project owner + qualified regulatory/medical reviewer (not yet appointed) | Block public pathway until primary-source audit and negative comprehension tests |
| Compounded copy/shortage status changed | Critical | Qualified regulatory/legal reviewer TBD | Recheck dated FDA decisions and relevant jurisdiction at publication |
| COA misread as sterility or product authenticity | Critical | Project owner + analytical reviewer TBD | Separate observed data/issuer/custody verification, owner task UX-G2-03 |
| Company profile harms reputation with unverified claims | High | Project owner | Preserve source snapshots, corrections and fair methodology |
| Incorrect pharmacy license shown as valid | Critical | Qualified pharmacy/regulatory reviewer TBD | Actual board lookup and freshness cadence before any named pharmacy comparison |
| Maintainer burden of refreshing sources | High | Project owner | Measure 5-company update effort; do not promise real-time data |
| Privileged DB role leaks unreviewed research | Critical | Engineering owner | Test permissions and preview DTO separation under G3-SEC-001 |
| Owner-only comprehension tests overgeneralized | High | Project owner | DEC-002 N=1 limitation maintained; external interviews deferred |
| Potential affiliate conflict or sponsored rank | High | Project owner | No pay-for-placement in editorial conclusions; approved disclosure policy needed |

## 7. G2 exit remains conditional

- [x] Product-scope and MVP boundary owner-approved: DEC-005.
- [x] Preliminary dated primary FDA source ledger started.
- [x] Two candidate competitors reviewed at desk level, **not** full competitor audit.
- [ ] Run and file owner-led task observations and retests.
- [ ] Complete competitor comparison across prioritized workflows.
- [ ] Collect product-specific medicine labeling and actual pharmacy licensure records.
- [ ] Confirm 503A/503B and current shortage interpretation with qualified professional.
- [ ] Measure lab issuer/lot correspondence verification for five supplier dossiers.
- [ ] Evaluate reviewer/staffing feasibility, time/cost, editorial independence.
- [ ] Record explicit G2 evidence decision and disposition of unverified risks; do not infer from a technical green CI run.

**Research record classification:** preliminary, source-backed discovery material, not a medical or legal endorsement.
