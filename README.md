# Peptide Clarity

**Current GitHub Pages root:** v0.9.1, black-and-teal 3D **publicly accessible owner-testing prototype**.  
**Prototype, not an independently reviewed or approved public medical-information service.**

Website: https://amy2213.github.io/peptide-clarity/  
Repository: https://github.com/amy2213/peptide-clarity

## Development control and change tracking

The [Development Control Center](docs/CONTROL_CENTER.md) indexes project rules, decisions, requirements, changes, QA and release records. The controlling approved GOV-001 master standard and the working PDP originals remain in the project Library; public repo summaries do not supersede them.

- [Requirements and backlog](docs/REQUIREMENTS_REGISTER.md) · [GitHub Issues](https://github.com/amy2213/peptide-clarity/issues)
- [Change register](docs/CHANGE_REGISTER.md) · [Decision register](docs/DECISION_REGISTER.md) · [Assumptions and risks](docs/ASSUMPTIONS_AND_RISKS.md) · [Changelog](CHANGELOG.md) · [Release history](docs/RELEASE_HISTORY.md)
- [Engineering standards](docs/ENGINEERING_STANDARDS.md) · [Contributor workflow](CONTRIBUTING.md) · [Release checklist](docs/RELEASE_CHECKLIST.md)
- [Proposed v0.3 PDP scope addendum](docs/PRODUCT_SCOPE_PDP-001_v0.3_WORKING.md): FDA-approved medicine access, compounded medications, and research supplier evidence are **distinct**. This document is a **draft**, not PDP v1.0 or G7 approval.
- [CHG-001 bootstrap](https://github.com/amy2213/peptide-clarity/issues/6) · [OPS-001 CI/branch protection follow-up](https://github.com/amy2213/peptide-clarity/issues/13)

A dependency-free structural validator is at `scripts/validate-repo.mjs` and GitHub Actions configuration at `.github/workflows/validate.yml`. A passing structural check is **not** a substitute for source validation, expert review, accessibility certification, legal review or G7 release approval.

## What visitors can test

- Mobile-first search and dropdown/browse across **84 substance and related-term names**.
- **13** source-linked preliminary substance profiles; remaining catalogue entries are not completed scientific profiles.
- Plain-English summaries and expandable source-linked explanations.
- **Five** supplier research dossiers and **15** substance-to-lot documentary associations, with five recorded evidence/reconciliation issues.
- Comparative supplier-documentation views and an **educational** COA guide.
- Black-and-teal design with decorative 3D biotech imagery. This artwork does **not** depict verified molecular structures.

The research snapshot includes **41** source records. Source structure was checked, but many source documents, scientific claims, company statements, and laboratory reports still await qualified independent review. Every lot record remains `issuerAuthenticated=false` and `sampleCustodyVerified=false`. No lot is certified, and listings are **not** endorsements of unapproved products.

## Hosting and source

- Static single-file HTML/CSS/JavaScript app: `index.html` on the `main` branch.
- GitHub Pages root publishes that file; `preview/v0.9/` retains the earlier standalone design preview.
- The root was promoted to v0.9.1 by the owner on **2026-11-08**, using the QA-corrected candidate from `feature/dark-3d-design-v0.9`.
- The owner-led engineering QA report and reproducible checks are on that branch at `docs/QA-011_FULL_SITE_AUDIT.md` and `docs/QA-011_REGRESSION_RESULTS.json`.
- The formal deployment note is in `docs/DEC-004_V091_OWNER_PREVIEW_RELEASE.md`.

The automated candidate suite passed **271/271 scripted checks**. This does **not** certify WCAG conformance, accuracy of health claims, laboratory authentication, iPhone Safari behavior, live-hosting reliability, security posture, or final launch readiness.

## Publication and research boundaries

- **Free, independent educational research, not medical advice, a product recommendation, a safety guarantee or an approved vendor ranking.**
- No unapproved-compound purchase referrals, self-administration instructions or clinical dosing advice.
- Approved drug status is specific to a particular product/indication, not to every compound or seller listing that name.
- Company-provided test results must not be presented as independently verified; absence of evidence is not proof of misconduct.
- External participant interviews remain deferred under the approved DEC-002 owner-led evaluation exception.
- GOV-001 editorial, legal, accessibility, security and G7 final-release requirements still apply. This owner's narrowly scoped public prototype promotion does not satisfy G7.

GitHub Pages and the public repository are accessible to anyone. `robots.txt` and `noindex` **do not make the site private**. Never submit private health information, confidential supplier records, credentials, or secret keys.

## Next steps

1. Have the owner check the root v0.9.1 on an actual iPhone, including navigation, keyboard, COA guide and comparisons.
2. Complete manual WCAG 2.2 AA/VoiceOver checks and live website performance/security-header checks.
3. Reopen and critically review the material scientific sources; prioritize findings that imply efficacy, safety, regulatory status, or specific supplier credibility.
4. Authenticate supplier/issuer and lot-to-document mappings with appropriate qualified review, and implement corrections and company-response workflows before any full public release.
