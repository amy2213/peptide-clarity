# G2-EVID-002 | Verified Competitive and Regulatory Desk Audit

**Observed:** 2026-11-09 (America/Chicago). **Status:** DESK RESEARCH COMPLETED FOR LISTED PAGES; G2 OWNER TASKS, SCIENTIFIC/LEGAL EXPERT REVIEW AND FULL MARKET VALIDATION PENDING.
**Parent:** PDP-001 v1.0 scope approved via DEC-005; DEC-002 outside-user interviews deferred (owner-led N=1). Related [G2-VAL-001 #21](https://github.com/amy2213/peptide-clarity/issues/21).
**Method:** Read the named organization's own public page and distinguish direct observations from independently verified claims. Do not reuse self-reported performance counts as audited facts. URLs and inspection date retained. No human-use research-compound purchasing referral is authorized.

## 1. Primary regulatory source hierarchy

| Source | Verified page and retrieval | Platform requirement | Qualification |
|---|---|---|---|
| FDA Drugs@FDA | [About Drugs@FDA](https://www.fda.gov/drugs/drug-approvals-and-databases/about-drugsfda), inspected 2026-11-09 | Product/application/regulatory history, latest FDA-approved label, specific indication and update date | FDA says database coverage 1938-present and updated daily, but coverage/exceptions apply. Do not infer all marketed products are approved |
| FDA approval database distinctions | [FDA Resources for Approved Drugs](https://www.fda.gov/drugs/drug-approvals-and-databases/resources-information-approved-drugs), inspected 2026-11-09 | Preserve approval source, label version, jurisdiction, specific product and authority | Current submitted labeling from DailyMed/FDALabel can differ from last FDA-approved label. Record exact label source and version |
| FDA NDC limitation | [FDA Unapproved Drugs](https://www.fda.gov/drugs/enforcement-activities-fda/unapproved-drugs), inspected 2026-11-09 | **Never** infer FDA approval from an NDC/listing alone | FDA NDC directory can include unapproved products and self-reported information |
| FDA compounding | [FDA April 1, 2026 compounding policy statement](https://www.fda.gov/drugs/drug-alerts-and-statements/fda-clarifies-policies-compounders-national-glp-1-supply-begins-stabilize), inspected 2026-11-09 | Store 503A/503B jurisdiction/time context, prescription/legal constraints, official text, regulatory review status | Compounded finished drug is not FDA-approved; 503A/503B exceptions are conditional, not globally available |
| 503B proposed policy | [FDA April 30, 2026 proposal](https://www.fda.gov/news-events/press-announcements/fda-proposes-exclude-semaglutide-tirzepatide-and-liraglutide-503b-bulks-list), inspected 2026-11-09 | Record proposal vs final/active rule explicitly; recheck original docket before any legal conclusion | **Do not** mislabel a 2026 proposal as a final rule |
| Online pharmacy verification | [FDA BeSafeRx state-licensed online pharmacy guide](https://www.fda.gov/drugs/besaferx-your-source-online-pharmacy-information/locate-state-licensed-online-pharmacy), inspected 2026-11-09 | Require board verification, valid prescription, U.S. address/phone, licensed pharmacist contact | Listed online store is not automatically a verified licensed pharmacy |
| Texas pharmacy license | [Texas State Board of Pharmacy pharmacy search](https://www.pharmacy.texas.gov/dbsearch/phy_search.asp), [TSBP license portal](https://www.pharmacy.texas.gov/dbsearch/), inspected 2026-11-09 | For Texas access data, record license number/name, status, checked date/time, jurisdiction, license source | TSBP says data updated weekdays by noon, with previous-workday limitation and caveats. **No pharmacy has been individually verified in this audit** |

**Critical design implication:** Approval, legal access, license status, evidence origin, price observation and source freshness require **different entities with their own states and timestamps**. An ingredient/profile-level `approved` field is not acceptable evidence.

## 2. Competitor and comparator matrix

**Legend:** “Observed capability” means visible on the linked page. Numbers/pricing shown by providers are their own representations, **not independently audited by Peptide Clarity**. Regulatory sources are references, not competitors.

| Platform / observed page (2026-11-09) | User job solved | Observable capabilities | Limitations and potential false-confidence risk | Peptide Clarity decision |
|---|---|---|---|---|
| [GoodRx](https://www.goodrx.com/wegovy) (approved medicine price/access comparator) | Estimate cash/coupon cost of a prescribed branded medicine | Offers form/dose/quantity selection, sample pharmacy prices, coupon/manufacturer savings details and eligibility terms; Wegovy page shows last coupon update 2026-11-06 | Prices depend on dose, pharmacy, insurance, location, savings terms and eligibility. Unqualified “cheapest” comparisons can mislead | **Pilot only** with dated, comparable product/form/quantity/jurisdiction observations and link to original; no live-price promise |
| [Drugs.com price guide](https://www.drugs.com/price-guide/) (medicine price/reference comparator) | Browse prescription prices and assistance programs | Cash estimates using site discount-card conditions; coupon, savings-card and assistance resources | Prices shown are not insurance prices and may not reflect an individual's transaction | Record source, payment basis, form, units and caveats; independently verify any claims of current availability |
| [PepIndex](https://www.pepindex.org/) and [methodology](https://www.pepindex.org/methodology) (research-company documentary comparator) | Compare vendor-published COAs and business/documentation evidence | 0–100 scored vendor board, published formula/weights and coverage, supplier-document source links, prices, partner-link disclosures | Score may be mistakenly interpreted as product quality or safe human-use ranking. Site home states 58 vendors while [A–Z directory](https://www.pepindex.org/vendors) showed 57 in this review, so headline counts are not stable/reconciled. Site methodology says scores do not measure physical product quality | Use source/date/verification status and side-by-side evidence **without** global safe-vendor score or unapproved human-use shopping referral |
| [Peptigrity lot/COA search](https://peptigrity.com/coa) (lot-document lookup comparator) | Lookup seller-report documentation by lot identifier | Lot search, measured-vs-label fields, lab portal-status labels, separate shop records when lot strings repeat; shows self-reported large document/portal counts | Portal confirmation of a report is **not** proof of a vial's sample custody, sterile manufacture or suitability for human use. Supplier-submitted reports require provenance checks | Preserve reported lot **associations**, distinct lab issuer vs sample custody states, and publicly understandable limitations |

**Competitive gap hypothesis, not a validated customer finding:** A unified, beginner-first educational experience can teach *what a compound is* and separately show *specific approved medicine access* and *research company evidence*. The proposed advantage is rigorous cross-category separation, not more impressive vendor rankings.

## 3. Acceptance criteria for product differentiation

1. **Status comprehension:** A visitor following semaglutide substance -> approved product -> pharmacy sees separately sourced product approval, jurisdiction-specific license observation and date, or “unknown/not checked.” The same ingredient appearing in a compounded or research listing never inherits approval.
2. **Scientific comprehension:** Human/animal/in-vitro evidence distinctions are explicit in plain language, with independent medical review status visible. Pending content never appears as a confirmed treatment finding.
3. **Evidence uncertainty:** COA page distinguishes (a) seller document on file, (b) document actually inspected, (c) issuer independently confirmed, (d) sample custody independently confirmed, (e) relevant method reported. None implies human-use safety.
4. **Source and recency:** Every high-impact external claim shows the exact source, observed/review date, and change status; stale or unchecked data never receives a positive badge.
5. **Comparison integrity:** Incomparable formulation, quantity, insurance, city or observation date blocks simplistic price ranking. Research vendors are compared on documentary fields without ordinal medical-use “trust” scores.
6. **Licensing verification:** Texas pharmacy license observations must retain actual TSBP record, time and state, not simply a store's own license claim.

## 4. G2 tasks that remain OPEN

| Evidence need | Current state | Next verification |
|---|---|---|
| Owner-led usability tasks UX-G2-01…08 | Not performed | Record independent owner first interpretations, navigation errors and retests using [G2 packet](G2_EVIDENCE_AND_OWNER_TEST_PACKET_v0.1.md) |
| Supplier-company authentication 5-dossier pilot | Not performed | Timestamp exact company/lot/report/document links, attempt issuer confirmation where feasible and record failed checks and real costs |
| Official individual finished-product FDA approval pilot | Not performed | Select 1–2 product/application/indication pairs, inspect exact approved labels and product forms; qualified source review |
| Texas pharmacy licensing pilot | Not performed | Select specifically named licensed pharmacy from legitimate sources, manually check TSBP record and date; no unverified current license claims |
| Qualified scientific, pharmacy/regulatory/legal, lab-analytical review | Not completed | Identify qualified reviewers, review plan and budget; keep G7 blocked |
| General audience demand/usability validation | Deferred outside interviews under DEC-002 | Owner-led N=1 only, do not report representative validity |
| Vendor/price field freshness + legal data-use permissions | Not completed | Document terms/licensing and time-to-refresh before automated ingestion |

## 5. Bias, provenance and recency guardrails

- Comparator measurements are not an endorsement and are not product quality certifications.
- Avoid copying competitor proprietary scores, scraped pricing tables or source PDFs wholesale into the public product. Store URLs, dated field observations and usage-right decisions.
- FDA primary-source material should drive regulatory categories; business websites may only describe their own claims and experience.
- Treat apparent conflicting counts as evidence for **observed-date and reconciliation fields**, not proof of deception.
- Do not claim that research peptides without FDA approval can be safely purchased or used for human treatment because a site displays COA data.
- This audit is a desk review of a **limited four-platform sample**, not representative market research or validation of public demand.

**Governance disposition:** supports owner-approved PDP v1.0 and narrows design risks; G2 gate remains **OPEN**.
