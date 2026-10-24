# Peptide Clarity, GitHub Pages starter (v0.2)

**Internal development prototype; not approved for public release.**

This folder contains a static deployment-ready copy of the Peptide Clarity v0.2 research desk. It is not yet an expert-reviewed medical/scientific resource, authenticated supplier database, or approved public product.

## Contents
- `index.html`: standalone application, no build system required
- `.nojekyll`: prevents Jekyll transformation on GitHub Pages
- `robots.txt`: asks crawlers not to index the site; **not a privacy or access-control mechanism**
- `DEPLOYMENT_CHECKLIST.md`: step-by-step repository setup and safety gates

## What works
Three provisional, source-linked substance profiles; source ledger and filter; educational fictional COA explainer; unverified supplier drafts; browser-local owner notes; JSON export.

## Important limitations
- GitHub Pages URLs are publicly reachable by default. A private repository is not access control for its Pages site. No sensitive data, API keys, personal health records, or confidential supplier documents belong in this repository.
- Any notes entered into the demonstration are stored in **that browser's local storage only**, not in GitHub, not synced, and not backed up unless exported. Data entered on a hosted demo may persist in that browser; browser storage can be cleared.
- FDA and trial registry links are external sources. They have not undergone qualified editorial/clinical regulatory sign-off for public release.
- `noindex` and `robots.txt` discourage indexing only; they cannot make a site private.
- Deployment to a public URL should occur only after the project owner's explicit publication decision under GOV-001/G7 or a separately recorded, adequately reviewed narrow preview exception. Merely choosing GitHub Pages as a hosting platform does not waive this condition.

## Hosting steps
See `DEPLOYMENT_CHECKLIST.md`.