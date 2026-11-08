# DEC-004 | Controlled promotion of v0.9.1 owner-testing homepage

**Decision date:** 2026-11-08  
**Project:** Peptide Clarity / Research Transparency Platform  
**Owner direction:** "I love it" followed by "Proceed", in direct response to the proposal to promote the QA-corrected v0.9.1 homepage.  
**Status:** Owner-approved **publicly accessible prototype update**; **not** a G7 launch approval.

## Scope of authorization

Replace the repository root `main/index.html` with the QA-corrected v0.9.1 visual/interaction build. Preserve the black-and-teal 3D style, search/browse, profiles, company comparison, COA education, prototype warnings and underlying research. Keep separate preview paths and existing audit records intact.

**Executed:** GitHub commit `4c647a9e61cedd86b41a49fe5e56a6528a2a2280`, verified new root content SHA `75ea4702085753adb1287844cd86d8e69f0e40aa`. Changes from the reviewed candidate in the root publication were two visible preview-version labels only. The research JSON block was compared byte for byte with the reviewed candidate before the commit.

## Verification

- The published GitHub root file includes the v0.9.1 notice, noindex instruction, semantic main landmark and key interaction repairs.
- Research dataset unchanged: 84 catalogue names, 13 initial source-linked profile drafts, 41 source records, five company dossiers, 15 lot-document associations and five evidence questions.
- None of the lot records has independently authenticated certificate issuer or chain of custody. No draft substance profile has recorded independent expert review.
- QA-011 recorded **271/271 passing scripted regression checks** in a local Chromium testing environment. This is not proof of universal functionality, independent data accuracy, accessibility certification, or clinical validity.
- GitHub file content is confirmed. GitHub Pages' end-user live HTTP response, actual Safari behavior, caching and security headers **could not be independently confirmed** by this deployment check.

## Constraints and non-approvals

The repository and GitHub Pages site are public even with `robots.txt` or `noindex`. Material is an **owner-testing prototype**, not an expert-reviewed health-information product. This decision grants no purchase referral or clinical dosing feature; no safety, quality, regulatory-compliance or endorsement claims for suppliers or products.

GOV-001 and the DEC-001/DEC-002 owner-led evaluation exception remain controlling. External user interviews remain deferred, not completed. Scientific/editorial and analytical review, applicable legal and security checks, WCAG 2.2 AA/real-device validation, supplier corrections process, and a distinct final G7 launch decision remain open.

## Rollback and follow-up

Root `index.html` is version-controlled in GitHub; the previous main version v0.8 remains in commit history. If owner testing reveals a blocking usability or information-integrity issue, revert the root commit or publish a verified hotfix after documenting the issue. Do not treat visual approval as evidence of scientific credibility.

**Next action:** Have the owner check the real live site on iPhone. Prioritize manual accessibility, critical scientific/clinical source verification, supplier claims and documentation traceability, then a controlled launch readiness review.
