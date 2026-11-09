# DEC-005 | PDP-001 v1.0 Product Scope Approval

**Decision date:** 2026-11-08 (America/Chicago)
**Record status:** OWNER APPROVED: PRODUCT SCOPE / MVP BOUNDARIES; G2 EVIDENCE VALIDATION OPEN
**Owner authorization:** User replied **“Approved”** in the Peptide Clarity conversation after the PDP-001 candidate and isolated relational proof-of-concept were presented with successful QA runs.
**Controlling references:** GOV-001 MASTER_BUILD_STANDARD_v1.0; DEC-001 bounded owner-led build; DEC-002 outside interviews deferred; DEC-004 owner-preview; ARCH-001 G3 draft; [PDP-001 v1.0](PDP-001_v1.0_APPROVED_2026-11-08.md).
**Tracking:** [PDP-001 issue #18](https://github.com/amy2213/peptide-clarity/issues/18), [POC-001 issue #19](https://github.com/amy2213/peptide-clarity/issues/19), [PR #20](https://github.com/amy2213/peptide-clarity/pull/20).

## Decision

1. The owner approves **PDP-001 v1.0 as the product-scope and prioritized-MVP requirements baseline**, including the three separate pathways, first-release inclusion/exclusion decisions, intended beginner-first workflows and evidence/provenance principles:
   - FDA-approved **finished product** information and independently sourced, jurisdiction-specific licensed prescription access;
   - separately categorized **compounded medicine** education that does not imply FDA approval;
   - **research company** documentation, reported lots, COAs and evidence comparisons that do not certify human-use safety.
2. The owner accepts the controlled, **isolated** PostgreSQL/SQLite proof of concept as technical validation work and permits its versioned code, fixture, tests and documents to be merged into the repository.
3. This approval **does not waive** documented G2 evidence tests or the architecture, design, engineering, content and release gates. It does not approve the creation of billable infrastructure, credentials, public-facing feature changes or a production database.
4. The 84-entry static owner-testing prototype remains unchanged; no claim of scientific/clinical/regulatory certification, supplier safety, licensed pharmacy status, or independent external user testing follows from this decision.

## Evidence and scope

The baseline merges PDP v0.2 working + proposed v0.3 scope addendum with the owner's reaffirmed comparison/access mission. This approval is a formal decision on **what to design and evaluate**, not evidence that all requirements can be safely released at scale.

The POC was tested in isolated GitHub Actions using a frozen research fixture (84 entries, 104 aliases, 41 sources, 37 claims, five company dossiers, 15 association observations spanning 14 candidate company+lot codes, five issues of mixed unresolved/inspection statuses). SQL and SQLite validation do not establish verified pharmaceutical approvals or independent COA authentication.

## Open validation, review and re-approval conditions

- Owner-led N=1 comprehension and user-task logs not yet completed; outside interviews remain deferred under DEC-002. Do not claim representative market validation.
- Competitor audit, source/licensing/price refresh feasibility and financial/qualified-review capacity remain unverified.
- Scientific/editorial, analytical, regulatory/legal, privacy, security/accessibility and supplier-fairness requirements must be reviewed at applicable gates.
- G3 full schema/RLS/API and hosting tradeoffs not yet validated under a dedicated Peptide Clarity environment; isolated POC alone is not G3 approval.
- Each material feature still needs GOV-001 F-001 evidence, interaction, data, test, risk, dependency and explicit owner authorization before Ready to Build.
- **G7 final publication remains NOT APPROVED.** DEC-004's publicly accessible preview is bounded owner testing, not a certified medical resource.
- Reopen PDP/G2 if scope, jurisdiction, clinical/legal buying behavior, user data collection, monetization conflicts or verified evidence standards materially change.

## Explicit operational outcome

**Accepted baseline:** PDP-001 v1.0 product scope and exclusions.
**Not yet passed:** Completion of all G2 evidence/validation requirements, G3 architecture gate, G6 engineering approval and G7 launch.
**Next:** Log owner-led task evidence, regulatory/product verification pilot, dedicated staging environment plan, complete required schema/grant/RLS tests, and update gate decision only with actual evidence.

**Release classification:** Documentation and isolated test harness only. No public software change authorized.
