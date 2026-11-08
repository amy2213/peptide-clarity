# Working on Peptide Clarity

See [Development Control Center](docs/CONTROL_CENTER.md), [Engineering Standards](docs/ENGINEERING_STANDARDS.md) and [GOV-001 source-of-truth hierarchy](docs/CONTROL_CENTER.md#source-of-truth-and-priority).

## Propose

1. Open a GitHub Issue with a stable `REQ`, `CHG`, `BUG` or `QA` ID.
2. Document problem, evidence, interaction, information, risks, acceptance tests, owner and impacted project gates.
3. Get explicit scope acceptance before moving to **Ready to Build**; issue creation is not approval.

## Implement

1. Branch from current `main` using `feature/`, `fix/` or `docs/`.
2. Keep the changed scope small, preserve research provenance and avoid inventing health or supplier facts.
3. Run `node scripts/validate-repo.mjs`. Manually test the affected route or workflow.
4. Open a PR using the supplied template and link exact evidence and rollback.
5. Record release review separately from merged status.

## Public and safety rules

This is a **public repository**. Do not commit health records, credentials, confidential company correspondence, personal information or unpublished licensed material. A seller's COA is not independently verified by publication. FDA approval belongs to specific products and indications, and compounded drugs are not FDA-approved finished drugs. Site v0.9.1 is an owner-testing prototype, not a certified medical or safe-supplier platform.

Direct writes to `main` are not the normal development path. CHG-001's bootstrap was explicitly authorized for process infrastructure. Main branch settings are not yet confirmed to enforce PR review: [OPS-001](https://github.com/amy2213/peptide-clarity/issues/13).
