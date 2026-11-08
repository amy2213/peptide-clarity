# QA-009 | Peptide Clarity v0.8 Design Review

## Results: 59 scripted assertions passed, no uncaught browser errors
- `test_v08.py`: 22 functional assertions at **mobile 390×844** and 22 at **desktop 1280×900** = **44** passed.
- `test_extra.py`: 15 further mobile assertions passed: alias lookup, keyboard dropdown, Enter to open record, pending-profile state, unmatched search and clear, category filters, supplier selection limit, mobile viewport containment, COA selection and script errors.
- `node --check app.js` passed.
- Original v0.7 data arrays `compounds`, `sources`, `companies`, `lots`, `validation`, `issues` exactly match embedded v0.8 arrays after JSON parse. Counts: 84 names, 41 sources, 5 companies, 15 associations, 5 unresolved issues.

## Manually examined screens
- Mobile: homepage, search suggestions, Selank profile, BPC-157 compare page.
- Desktop: homepage, search suggestions, Selank profile, BPC-157 compare page.

## Limits
- Headless Chromium tests used an in-memory content origin rather than a real GitHub Pages network origin. Do not claim they verify live deployment/caching or link access.
- No manual VoiceOver/screen-reader audit or complete WCAG 2.2 AA evaluation.
- No mobile Safari real-device owner test yet.
- Source scientific and regulatory claims still require qualified review; v0.8 is primarily a UX redesign using existing v0.7 content.
- No security penetration test or independent lab certification.

## Suggested owner walkthrough
1. On iPhone Safari, search 'Selank'; read plain answer and expand 'What does this actually mean?'.
2. Use the Explore bottom tab, browse all 84 names; filter to Sources linked; select BPC-157.
3. From BPC-157, find company evidence; open a company and return to Compare.
4. Compare up to three BPC-157 companies and see whether any wording could suggest a product is safe or recommended.
5. Open COA guide and choose Sterility. Confirm the explanation is useful without technical background.
6. Record every confusing label or point of hesitation; these are owner-only observations, not representative usability research.