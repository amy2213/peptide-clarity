# G3 Architecture Review Package | Peptide Clarity

**Prepared:** 2026-11-08\
**Package status:** **DRAFT FOR REVIEW. NOT G3 APPROVED OR IMPLEMENTED.**\
**Tracked in:** [ARCH-001 GitHub Issue #16](https://github.com/amy2213/peptide-clarity/issues/16). Parent controls GOV-001 / PDP-001 v1.0 owner-approved **product scope** under DEC-005 (remaining G2 validation open) / DEC-002.

## Review order

1. [ARCH-001 | Executive G3 Blueprint](ARCH-001_G3_BLUEPRINT_v0.1.md): target three-layer stack, scope, trust boundaries, data stewardship, rollout sequence and approval gates.
2. [DATA-006 | Logical ERD](DATA-006_LOGICAL_ERD_v0.1.md): relational tables, primary/foreign keys, source and reviewer traceability, supplier lot and product-specific regulatory relationships.
3. [ARCH-002 | Repository and Module Boundaries](ARCH-002_APPLICATION_BOUNDARIES_v0.1.md): proposed modular monolith, directory layout, server routes, DTO contracts and admin authorization.
4. [SEC-001 | Hosting and Threat Model](SEC-001_HOSTING_SECURITY_THREAT_MODEL_v0.1.md): Vercel/Supabase candidates, public/private schemas, RLS, secrets, SSRF/XSS, editorial publication firewall, disaster recovery.
5. [DATA-007 | Source-to-Target Migration](DATA-007_LEGACY_MIGRATION_CROSSWALK_v0.1.md): field-level mapping from existing JSON, expected counts, ambiguities, idempotency and rollback.
6. [QA-013 | Acceptance and Negative Tests](QA-013_ARCHITECTURE_ACCEPTANCE_TESTS_v0.1.md): preconditions, action and exact expected result for preservation, data integrity, access control, content integrity, mobile UX and release recovery.

## Implementation evidence (bounded owner-only preview)

- [G3-SEC-001 and APP-001 security/application runbook](../G3_STAGING_SECURITY_AND_APP_SLICE_v0.1.md) describes an isolated PostgreSQL + Next.js read API slice, under [PR #25](https://github.com/amy2213/peptide-clarity/pull/25). This does **not** constitute G3 gate approval or an actual hosted Supabase deployment.
- [G2-EVID-001 source and owner-task packet](../G2_EVIDENCE_AND_OWNER_TEST_PACKET_v0.1.md) documents desk research; N=1 user observations and qualified review are still pending.

## Existing baseline

Current main site is v0.9.1 publicly accessible **owner-testing prototype**, not final G7 public medical-information product. The user-facing website and embedded data have **not been modified** by this architecture package.

Verified import inventory in source: 84 indexed names, 104 aliases, 37 claims, 41 sources, five company dossiers, 15 lot association rows, 14 candidate company/lot keys, five unresolved evidence issues, 13 source-linked draft profiles and eight dedicated plain-language objects.

## Review decisions needed

- [x] Owner approved PDP v1.0 product scope and the three separate pathways (DEC-005); remaining G2 evidence validation is outstanding.
- [ ] Evaluate Next.js modular monolith against Astro and a static export bridge with a small spike.
- [ ] Approve relational schema and importer reconciliation strategy; protect publication and unknown states.
- [ ] Define evidence-review authority, price/licensing data freshness and document custody standards.
- [ ] Choose environment/hosting strategy based on real cost, security, disaster recovery and operation tests.
- [ ] Complete applicable architecture acceptance evidence and explicitly approve or revise G3.

**Nothing in this draft should be treated as an authorized hosting subscription, database creation, source migration, validated medical fact, or production deployment.**
