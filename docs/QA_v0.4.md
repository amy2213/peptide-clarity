# Peptide Clarity | QA-004: Connected Explorer v0.4

**Date:** 2026-10-24. **Status:** Internal prototype smoke checks; no public release authorization.

## Executed checks
- HTML rendered using Chromium in Playwright with locally injected HTML (`set_content`); the environment blocked navigation to a local server, so full real-host navigation was NOT tested.
- Tested both 390 × 844 (mobile) and 1280 × 850 (desktop) viewports.
- **36 automated assertions passed**: navigation, homepage, number of substance cards, source-backed BPC-157 profile, two BPC listings, company evidence dossier, selective comparison controls, separate mobile comparison cards, formulation caveats, honest single-company state for Semax, pharmacy distinctions for semaglutide, company name search, missing-search feedback, browser overflow, and no observed JavaScript exceptions.
- JavaScript parsed without syntax errors using Node.js.
- DATA-002 checked for unique IDs, valid cross-references and five distinct sourced company-listing records.

## Not tested or approved
- No qualified scientific, analytical or legal review; no confirmed supplier lab authentication, regulatory or inventory completeness.
- No systematic WCAG 2.2 AA, actual screen reader, keyboard-only or assistive technology audit. Responsive visual checks are NOT an accessibility pass.
- No production origin/storage/reload testing, external integrations, source freshness monitoring, browser/OS matrix, or device-specific testing beyond automated viewports.
- No user participant study, no independent audience evaluation, no owner acceptance of the interface yet.
- GitHub branch and any draft PR are public source files in a public repository. `noindex` cannot make them confidential. Nothing in this prototype should contain secrets or personal health information.

## Known limitations
1. Comparison includes two companies in the current source-backed dataset; no population-scale search or server-side backend.
2. The supplier index and seller page provide publicly attributable entries, not independently certified inventory, lot custody, sterile output, clinical safety, or business legitimacy.
3. Comparisons of standalone and GLOW blend offerings are not price or potency equivalence comparisons.
4. Semax and GHK-Cu scientific evidence syntheses are pending; do not turn unfinished summaries into conclusions.
5. The site is an internal research preview; the public-facing main branch remains unchanged.

## Owner walkthrough for acceptance (N=1)
1. From mobile homepage, find BPC-157 and identify what medical evidence is and is not established.
2. Open Particle Peptides and review which evidence statuses are company-reported vs independently checked.
3. Return to compare and confirm that Polaris GLOW is a multi-ingredient blend, not standalone BPC-157.
4. Switch comparison to semaglutide and confirm the licensed-pharmacy distinction.
5. Use the COA example to explain why 99.6% HPLC area purity does not establish sterility.
6. Record confusion and needed revisions; do not claim broader audience validation.