# Peptide Clarity QA-010 | Dark + 3D prototype

**Built:** November 8, 2026. **Scope:** static HTML functional visual-preview smoke test.

## Results
- **48/48 scripted Chromium interactions passed** (24 tests at 390×844 and 24 at 1280×820), zero observed JavaScript page exceptions.
- Search suggestions visible; Selank selection routes to a plain-English profile and retains linked research findings.
- Browse all renders 84 catalogue entries.
- Compare path retains company selection, source and supplier-document details; source tracking and lot data retained.
- COA interpretation interacts correctly when choosing Sterility.
- Dark CSS and embedded WebP imagery rendered; no body-wide horizontal overflow on home, profile, browse, compare, or COA pages at tested viewports.
- The underlying research JSON is **byte-for-byte unchanged** from v0.8 (84 terms / 41 source records / five companies / 15 lot associations).
- All lot records continue to state issuerAuthenticated=false and sampleCustodyVerified=false.
- Smaller-screen overflow was discovered during testing, traced to a decorative positioned header pseudo-element, and fixed before the final passing run.

## Limits
- Headless Chromium is not real-device iOS Safari or VoiceOver. Native font antialiasing and browser safety settings can change the visual impression.
- No independent lab validation, fresh source review, medical editorial sign-off, legal sign-off or full WCAG 2.2 AA audit.
- Visual 3D artwork is decorative and does not represent the molecular structure of any listed peptide.
- GitHub Pages publishing and caching require a separate check after commit; initial files and pull request alone do not prove the live URL has updated.
- This is a **design-preview deploy only**. Do not merge over the root homepage without the owner's explicit decision and appropriate release controls.