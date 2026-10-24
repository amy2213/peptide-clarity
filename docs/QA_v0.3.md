# Peptide Clarity v0.3: Internal UX QA summary

Date: 2026-10-24. Status: **Internal UX preview only, not release approval.**

- Four routes and homepage: home, Understand It, Verify It, Compare the Evidence, plus Our Method.
- Three starter substance profiles and 11 source-linked draft findings from v0.2 retained.
- Clearly fictional COA, and three fictional document-comparison cases.
- Tested search for a substance and term category, switching substance profiles, COA explainers, comparison, basic navigation and source-link rendering.
- Automated Chromium smoke tests at 390 px and 1280 px: **passed** (no uncaught JavaScript exceptions and no page-width overflow).
- JavaScript Node syntax check: passed.

**Not tested:** full real-device iOS Safari interaction, independent source link availability, clinical or analytical scientific accuracy, third-party lab/authenticity claims, manual screen-reader/keyboard WCAG audit, actual user comprehension beyond owner N=1, legal review, information privacy/security for uploads (not in scope), live site deployment.

**Release:** blocked by GOV-001 G7. GitHub branch publication is not public website approval. Owner-led evaluation and outside interview deferral controlled by DEC-002.