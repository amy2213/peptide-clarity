# ENGINEERING-001 | Implementation and Change Standards

**Status:** Controlled process implementation under GOV-001, effective 2026-11-08.

## Branch and review rules

- Baseline is `main`; develop new features on `feature/<topic>`, defects on `fix/<topic>`, documentation on `docs/<topic>`.
- Each material code/content change needs a GitHub Issue and linked PR, even for a solo owner-led project. Use a recorded, scoped emergency exception only for immediate high-risk remediation.
- PR describes baseline, changed files, requirement IDs, test evidence, risk review, rollback, approval and post-merge checks.
- Main-branch protection/required status checks are an **open OPS-001 task** until verified in repository settings. Templates alone do not enforce approvals.
- The **2026-11-08 CHG-001 bootstrap** may place non-application control files directly on `main` under explicit owner authorization. It does not establish a standing direct-write exception.
- Never deploy new unreviewed medical claims, supplier safety judgments, clinical doses or unapproved-compound buying referrals.

## Code and architecture

- Current site is static `index.html` with HTML/CSS/JavaScript and inline JSON. Do not rewrite it as a side effect of governance setup.
- Separate the concerns of **scientific research**, **approved-product/pharmacy eligibility**, **compounded-medicine disclosure**, **research-company evidence**, and **platform verification**, both in data models and user interface.
- Stable IDs for entities, claims, source records and lots. Date all external observations. A missing value is `unknown`, never `passed` or `0`.
- Never inject untrusted external text into HTML without escaping; allowlist external protocols; avoid storing health data or credentials in code or telemetry.
- Every material source-linked claim needs an inspectable original, interpretation, evidence level, last-checked date and review status. Claims about FDA approval must identify **specific products/indications**.
- Use concise plain-English introductions; avoid collapsing 'research only', 'investigational', 'compounded', and 'FDA-approved' into one treatment category.

## Minimum checks for every PR

- Node syntax/structural checks via `node scripts/validate-repo.mjs` and required CI. Automated checks are intentionally narrow.
- Navigation, search, browse all, profile, supplier comparison, COA guide and broken/unknown routes where affected.
- Responsive mobile/desktop check; accessible keyboard and semantic focus; manually assess high-risk screen-reader paths.
- Verify scientific/regulatory citations and supplier provenance for any changed material assertions. Record qualified reviews or identify their absence.
- Confirm public HTML has no secrets, unsafe external links, personal records or unsupported safety language.
- On release: owner decision, release note, live smoke test, rollback SHA and open known limitations. Use [release checklist](RELEASE_CHECKLIST.md).

## Severity and stop conditions

- **P0:** Active data exposure or substantial safety-critical misinformation; halt/restrict publication and initiate incident review.
- **P1:** Broken core workflow, serious accessibility blocker, material unsupported regulatory/supplier assertion; block affected release.
- **P2:** Noncritical functional or usability defect; triage, document and fix before general release if material.
- **P3:** Cosmetic or minor documentation improvement; schedule transparently.

**Unverified** is not a pass. A GitHub Actions green check does not establish clinical truth, legal compliance, reliable online pharmacy access or WCAG 2.2 AA conformance.
