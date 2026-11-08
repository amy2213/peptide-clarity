# Peptide Clarity | QA-011 Full Site Audit

**Date:** 2026-11-08  
**Product / version:** v0.9 black-and-teal 3D owner-testing preview  
**Repository:** `amy2213/peptide-clarity`  
**Reviewed source:** `preview/v0.9/index.html`, confirmed by GitHub file read; original content SHA-256 research payload `3ae693cf7b74ba41b4370212653804f073ce3a4408636c28f8e15a1951c280a9`  
**Disposition:** **Engineering candidate ready for owner review after QA fixes; NOT cleared for independent public health-information release**.  
**Release action:** None. No updates to `main` homepage or the public v0.9 preview during this audit.

## Executive assessment

A comprehensive local engineering and evidence-integrity inspection identified four substantive, reproducible defect families, corrected them in a separate `v0.9.1 QA-fix` candidate, and reran the expanded regression suite. The candidate passed **271 of 271 automated assertions** across six viewport sizes, 84 distinct substance routes, five company pages, search/browse interactions, company comparisons, COA explanations, and keyboard flows. These are scripted assertions, **not a claim of universal correctness or WCAG certification**.

The embedded research content is **byte-for-byte unchanged**. It remains a public owner-testing editorial draft: 84 index names, 13 profiles containing source-linked draft claims, 37 individual claim records, 41 source records, five supplier dossiers, 15 substance-to-lot associations representing 14 distinct company-plus-lot identifiers, and five unresolved/not-assessable/not-inspected exceptions. **Zero supplier lots have independently verified issuer authentication or chain of custody.** No draft profile is recorded as independently expert-reviewed.

## Test coverage and findings

| Area | Work performed | Result |
|---|---|---|
| Build / code | HTML structure, JavaScript syntax, DOM generation, errors, data and code parity | **Pass in repaired candidate** |
| Navigation | Home, Library, 84 named substance routes, five company routes, invalid-route fallback, back-to-main interactions | **Pass in tested paths** |
| Search / browse | Autocomplete, SS31 alias, Enter/select, Escape, full 84-name list, sourced/pending filters, state transitions | **Pass after repair** |
| Company comparison | Default three cards, four BPC-157 candidate suppliers, selection cap, lot evidence notices, two device widths | **Pass in tested paths** |
| COA education | Six laboratory terms, explanatory detail changes, unverified-language safeguards | **Pass in tested paths** |
| Responsive layout | 320, 390, 768, 1024, 1280 and 1440 CSS-pixel widths; 13 route/view combinations each | **Pass after repair** |
| Accessibility automation | Main landmark, skip link, focus after SPA navigation, current-page ARIA, autocomplete semantics, keyboard focus, contrast spot checks | **Improved; independent WCAG/VoiceOver test still pending** |
| Evidence integrity | ID uniqueness, 41 source records, claim/source linkage, 15 lot associations, 5 companies, two independently recalculated content differences | **Pass for structural and arithmetic checks** |
| Scientific / regulatory sources | Targeted verification of selected FDA, DailyMed and indexed study records; all 41 URLs checked for HTTPS structure | **Sampled, not all 41 independently re-opened or critically appraised** |
| Security / privacy | Static site inspection, search-string escaping, HTTPS links, `noopener`, no secret-pattern matches, no observed storage or network APIs | **No demonstrated critical issue in assessed scope; formal security review pending** |
| Live deployment | GitHub commit and file identities checked | **GitHub verified; actual GitHub Pages HTTP and iOS Safari delivery inaccessible from audit environment** |

## Reproduced defects and applied fixes

**QA-011-01 | P1 | Search suggestion dismissal.** In v0.9, pressing Escape left the dropdown visually open. Two interacting causes were confirmed: the CSS `.suggestions` display rule overrode the default `hidden` behavior, and the native search-input Escape action could retrigger input events. **Fixed:** explicit `.suggestions[hidden]{display:none!important}` plus `preventDefault()` on Escape. Verified with actual keyboard input at six widths.

**QA-011-02 | P1 | Tablet horizontal overflow.** At 768px the document width was 776px; at 1024px it was 1044px, consistently across inner pages. Isolated to the decorative `.page-head::before` pseudo-element positioned beyond the right viewport edge. **Fixed:** keep the artwork within its container with `right:0`. Rechecked across 320–1440px and 13 route types per width.

**QA-011-03 | P1 | Accessibility and route focus.** The main content was rendered into a `div` without a main landmark, the site had no skip link, SPA page transitions did not move focus to new content, and `aria-current` was generated as an empty attribute rather than `page`. Re-rendered filters also displaced keyboard focus. **Fixed:** semantic `<main>`, keyboard skip link, focus handling for new routes and replaced filter/compare/COA controls, and valid `aria-current="page"` state. Automated keyboard flow passed; VoiceOver remains untested.

**QA-011-04 | P2 | Text contrast and touch readability.** The comparison selector label used `#72847d` over the dark card surface, approximately **4.07:1**, under the common 4.5:1 normal-text contrast threshold. The development disclaimer was set at approximately 10.6px on mobile, and some tappable links/summary rows were small. **Fixed / improved:** label moved to higher-contrast color; preview warning size and selected interactive text targets increased. These targeted improvements are not a full color and target-size audit.

## Evidence and scientific review

- **Regulatory spot checks:** FDA's updated compounding-risk page lists safety concerns for Semax, Selank, BPC-157 and the TB-500 fragment. Importantly, the FDA page distinguishes *withdrawn nominations* from the current Category 2 section; we did **not** recategorize those substances or assert a compounding permission. Sources: https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks and https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss
- **Approved-product checks:** FDA's accelerated approval for elamipretide (Forzinity) is for a specific Barth syndrome indication, not generic investigational-use peptide formulations. DailyMed's EGRIFTA WR label concerns excess abdominal fat in adults with HIV-associated lipodystrophy, and specifies that it is not a general weight-loss medicine. Sources: https://www.fda.gov/news-events/press-announcements/fda-grants-accelerated-approval-first-treatment-barth-syndrome ; https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=839334d3-8c1d-4c26-9036-2ab524a6ea75
- **Research-title and topic checks:** PubMed identifiers for 2014 Selank (25176261), 1999 Semax (10358912), the 2026 GHK-Cu review (42797253), and two 2026 retatrutide studies (42814954 and 42810372) matched the profile topics in available public indexing. These checks do not constitute a critical appraisal of every paper, all effect sizes, or every source-linked claim.
- **Assay arithmetic:** 6.38 mg vs a 5 mg label is **27.6%** above label for the reported Particle sample; 23.99 mg vs a 20 mg label is **19.95%** above label for the reported Protide sample. These are **supplier-publication-derived sample values**, not laboratory-authenticated results or safety findings.
- **Source limitations:** All 41 source URLs passed structural HTTPS checks and all claim-to-source IDs resolved. Live availability and content were sampled, **not confirmed for all 41**. Company document records are dated to 2026-10-24/25 and should be rechecked before any qualified public claims about present inventory or lot documentation.

## Remaining release blockers (not software bugs corrected by this audit)

**R1 | Required scientific/editorial and supplier evidence validation.** The reviewed app has **37 source-linked draft claim records but no independently documented expert sign-off**. All 15 lot associations have `issuerAuthenticated=false` and `sampleCustodyVerified=false`. Laboratory methods, exact lot mapping and published company claims require qualified analytical review, provenance checking, supplier response opportunity and corrections workflow.

**R2 | Formal accessibility and real-device review.** No full WCAG 2.2 AA audit, automated axe-core audit, VoiceOver/TalkBack test, manual keyboard/focus screen-reader audit, 200%-zoom acceptance or actual iPhone Safari session was conducted here. The engineering checks fix multiple concrete defects but do not certify compliance.

**R3 | Live hosting, performance and security.** The test container cannot resolve GitHub Pages and blocks `file://` navigation, so the exact HTML was rendered using headless Chromium `set_content`; it cannot establish network deployment time, caching, Core Web Vitals, Safari performance, TLS headers, HTTP security headers, content-security policy or any server behavior. No CSP is specified in the HTML. The site is currently static with no authentication, uploading, API or backend; future upload/account features need a separately scoped security assessment.

**R4 | Governance and publication controls.** GOV-001, DEC-001/002 and the owner-only testing approach continue to apply. The public GitHub repository and Pages preview are accessible to the public despite `noindex`; robots directives are not access control. Distinct G7 launch authorization and the appropriate legal, scientific, accessibility and correction-process checks remain mandatory. Outside-participant interviews are deferred by owner decision, not marked completed.

## Deployment / rollback guidance

1. **Do not replace the published root** as a side effect of QA. The QA-fix build is intended to remain on a separate review branch until reviewed.
2. Have the owner test the candidate in Safari, focusing on search Escape, search-to-browse, the 768px horizontal overflow, keyboard skip link and Selank profile accessibility.
3. Conduct the missing qualified review and document a controlled release decision before public-product claims; publishing a prototype is not the same as approving a finished resource.
4. On eventual deployment, preserve the known-good root index in GitHub history and verify the exact served commit / cache behavior after rollout.

## Evidence artifacts

- `index.qa-fixed.html`: corrected single-file build, research payload unchanged.
- `qa_fixed_regression.json`: 271 post-repair automated check results.
- `full_qa_results.json`: first-pass raw diagnostic checks (contains test-harness false alarms and inaccessible-environment tests, **not** a valid raw defect count).
- `regression_fixed.py`, `full_qa.py`: scripted local test harnesses.

**Overall determination:** **Suitable for continued owner testing after fixes; not ready for independently validated public health-information release.**