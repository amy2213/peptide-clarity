# QA-005 — Expanded company/lot explorer

**Snapshot:** 2026-10-24. **Status:** Automated internal smoke check only.

**Result:** 50/50 checks passed; 0 JavaScript errors.

## Scope and method

- HTML parsed to confirm structure and JSON; Node checked JavaScript syntax.
- Headless Chromium `/usr/bin/chromium` tested 390×844 and 1280×820. The sandbox blocked localhost browser navigation, so the harness used an in-memory `set_content` origin. This does not validate deployed network behavior, direct file navigation or storage persistence.
- Tested navigation, company and peptide search, lot inspection, source links, qty calculations, 4-company candidates, up-to-3 dynamic comparison, prescription boundaries, login-restricted vendor, COA explanation and mobile overflow.

## Automated assertions

- [x] mobile: homepage visible
- [x] mobile: 7 substances
- [x] mobile: 5 companies
- [x] mobile: no horizontal body overflow
- [x] mobile: BPC profile
- [x] mobile: BPC has >=8 lot associations
- [x] mobile: lot inspector visible
- [x] mobile: amount difference shown
- [x] mobile: named lab not authenticated
- [x] mobile: visible source links
- [x] mobile: company dossier
- [x] mobile: company lots
- [x] mobile: compare visible
- [x] mobile: four BPC choices
- [x] mobile: defaults three selections
- [x] mobile: 3 comparison cards
- [x] mobile: comparison change updates
- [x] mobile: no horizontal compare overflow
- [x] mobile: max three selections
- [x] mobile: non-peptide categorized
- [x] mobile: approved medicine channels
- [x] mobile: access-locked company explicitly available
- [x] mobile: company search works
- [x] mobile: COA explanations
- [x] mobile: final viewport overflow
- [x] desktop: homepage visible
- [x] desktop: 7 substances
- [x] desktop: 5 companies
- [x] desktop: no horizontal body overflow
- [x] desktop: BPC profile
- [x] desktop: BPC has >=8 lot associations
- [x] desktop: lot inspector visible
- [x] desktop: amount difference shown
- [x] desktop: named lab not authenticated
- [x] desktop: visible source links
- [x] desktop: company dossier
- [x] desktop: company lots
- [x] desktop: compare visible
- [x] desktop: four BPC choices
- [x] desktop: defaults three selections
- [x] desktop: 3 comparison cards
- [x] desktop: comparison change updates
- [x] desktop: no horizontal compare overflow
- [x] desktop: max three selections
- [x] desktop: non-peptide categorized
- [x] desktop: approved medicine channels
- [x] desktop: access-locked company explicitly available
- [x] desktop: company search works
- [x] desktop: COA explanations
- [x] desktop: final viewport overflow

## Data invariants

- 5 companies; 7 substances; 15 company–substance–lot associations; 14 distinct company+lot identifiers; 22 source records; 5 unresolved issues.
- Each lot has company ID, compound ID, source URL, observation date, evidence level and explicitly `issuerAuthenticated: false` and `sampleCustodyVerified: false`.
- The 15 records break down as 11 L0, 3 L1 and 1 historical L2. L0 seller numbers are not upgraded to issuer-authenticated data.

## Not completed

- Independent laboratory issuance/authentication, independent samples or their custody, and expert assay reviews.
- Qualified medical/editorial and relevant legal/security/accessibility checks; manual screen-reader/WCAG audit and real-device owner review.
- Live GitHub Pages deployment verification; GitHub Pages `main` intentionally remains v0.2 pending release authorization.
- Owner-only review is N=1; outside-user interviews remain deferred under DEC-002.

**Gate:** GOV-001 and DEC-002. This draft has no public launch approval.