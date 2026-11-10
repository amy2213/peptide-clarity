# Peptide Clarity | Development Control Center

**Record:** CTRL-001 | **Established:** 2026-11-08 | **Status:** ACTIVE INDEX (not new product or G7 approval)  
**Repository:** https://github.com/amy2213/peptide-clarity  
**Baseline application:** v0.9.1 publicly accessible owner-testing prototype on `main`.

## Source of truth and priority

1. **GOV-001 | MASTER_BUILD_STANDARD_v1.0.md** (APPROVED, 2026-10-24). Authoritative original in the project Library at `/Research Transparency Platform/`; this index does not supersede or silently amend it.
2. **[PDP-001 v1.0 | Product Definition](PDP-001_v1.0_APPROVED_2026-11-08.md)**: **owner-approved product scope and prioritized MVP** under [DEC-005](DEC-005_PDP001_V1_SCOPE_APPROVAL_2026-11-08.md); **G2 evidence validation remains open**. Supersedes Library v0.2 working definition and [v0.3 working addendum](PRODUCT_SCOPE_PDP-001_v0.3_WORKING.md) for product-scope decisions, without superseding GOV-001 or DEC-002.
3. **[Decision and exception register](DECISION_REGISTER.md):** DEC-001 solo-build exception; DEC-002 external interviews deferred/owner-led evaluation; DEC-003 earlier public owner preview; [DEC-004](DEC-004_V091_OWNER_PREVIEW_RELEASE.md) v0.9.1 prototype promotion. Library originals control where the repo lacks a copy.
4. **Specifications and records:** [requirements](REQUIREMENTS_REGISTER.md), [changes](CHANGE_REGISTER.md), [assumptions and open risks](ASSUMPTIONS_AND_RISKS.md), [engineering rules](ENGINEERING_STANDARDS.md), QA evidence, source and lot research records.
5. **Executable source and versions:** GitHub commits/branches/PRs, [CHANGELOG](../CHANGELOG.md), [release history](RELEASE_HISTORY.md) and [release checklist](RELEASE_CHECKLIST.md).

**Public repo warning:** Library references are inventory pointers, not public download links. Do not copy confidential material, personal data, credentials, unpublished supplier correspondence, private health data, or licensed content into this public repository.

## Governance operational summary (subordinate to GOV-001)

- Gates G1 Discovery → G2 Definition → G3 Architecture → G4 UX → G5 Design → G6 Engineering → G7 Release. Upstream gates require evidence; downstream product release needs separate G7 authorization.
- GOV-001 F-001 requires **problem, evidence, interaction, information, acceptance, risks, dependencies and explicit owner approval** before a feature is marked Ready to Build.
- Outside participant interviews remain **deferred** under DEC-002. Owner-led usability evaluation is allowed; it cannot be represented as general audience validation.
- Distinguish scientific evidence, supplier/lot analytical documents, and verification by this platform. Never infer human-use safety from purity or seller claims.
- **No medical-use safety ratings or unapproved human-use purchasing referrals** approved. FDA-approved medicine access and nonapproved research-company evidence must remain clearly separate.
- The v0.9.1 GitHub Pages website is publicly visible but **not** approved as a qualified public medical-information release. `robots.txt`/`noindex` do not create privacy.
- Material content and regulatory scope changes reopen applicable gates. Silence is not approval.

## How a tracked change moves

1. Create an Issue with a stable ID (`REQ`, `CHG`, `BUG`, `QA`, `OPS`, `DEC`).
2. Record user need, scope, source links, acceptance criteria, risk, owner and current status; link affected governance artifacts.
3. Obtain explicit owner acceptance of defined scope/criteria before Ready to Build. A draft issue is not permission to ship.
4. Develop on `feature/`, `fix/`, or `docs/` branch with a linked PR; use the PR template.
5. Supply executable tests and manual evidence. Note unchecked items and missing qualified review as **not verified**, never passed.
6. Record release decision with any known limitations; do not conflate merge, public prototype promotion and **G7 product approval**.
7. Add release notes, verification and rollback route; keep issue/PR links.

## Current tracking

- [CHG-001 · Control bootstrap (#6)](https://github.com/amy2213/peptide-clarity/issues/6)
- [REQ-010 · Update PDP three pathways (#7)](https://github.com/amy2213/peptide-clarity/issues/7)
- [REQ-011 · FDA-approved medicines and licensed pharmacy access (#8)](https://github.com/amy2213/peptide-clarity/issues/8)
- [REQ-012 · Compounded medicines separate pathway (#9)](https://github.com/amy2213/peptide-clarity/issues/9)
- [REQ-013 · Research company evidence (#10)](https://github.com/amy2213/peptide-clarity/issues/10)
- [REQ-014 · Beginner-first discovery (#11)](https://github.com/amy2213/peptide-clarity/issues/11)
- [QA-012 · Real device, expert and live validation (#12)](https://github.com/amy2213/peptide-clarity/issues/12)
- [OPS-001 · Enforce required checks and branch protection (#13)](https://github.com/amy2213/peptide-clarity/issues/13)
- [G2-EVID-001 · Regulatory and owner testing evidence (#24)](https://github.com/amy2213/peptide-clarity/issues/24)
- [G3-SEC-001 · Secure preview roles and RLS (#22)](https://github.com/amy2213/peptide-clarity/issues/22)
- [APP-001 · Next.js protected read API (#23)](https://github.com/amy2213/peptide-clarity/issues/23)


### G3 architecture design (proposed, not approved)

- [ARCH-001 G3 architecture review package](architecture/README.md) details the data model, module/repository structure, security/hosting, migration crosswalk and QA-013 test cases. Owner approved PDP product scope in DEC-005, but G2 evidence validation and G3 architecture gate have not passed.
- [ARCH-001 Issue #16](https://github.com/amy2213/peptide-clarity/issues/16) tracks design review and implementation dependencies.

### Current G2 and G3 implementation evidence

- [G2 preliminary research and owner-testing protocol](G2_EVIDENCE_AND_OWNER_TEST_PACKET_v0.1.md): FDA source ledger and comparative review; N=1 tasks and qualified reviews still open.
- [G3 security and staging application runbook](G3_STAGING_SECURITY_AND_APP_SLICE_v0.1.md): isolated PostgreSQL role checks and Next.js protected owner API. Not hosted or product-certified.
- [Draft PR #25](https://github.com/amy2213/peptide-clarity/pull/25): no published `index.html` change or production database creation. CI passing does not authorize G3/G7.

### G2 evidence update and hosted staging preparation (2026-11-09)

- [G2-EVID-002 | FDA, Texas pharmacy and competitor desk audit](G2_COMPETITIVE_AND_REGULATORY_AUDIT_2026-11-09.md): sourced, dated research and four-platform capability matrix. Owner usability and qualified review are not complete.
- [DATA-008 | Five-company supplier evidence reconciliation](DATA-008_LEGACY_SUPPLIER_EVIDENCE_RECONCILIATION_2026-11-09.md): 15 legacy observations, 14 candidate seller/lot groups, one direct PDF/report URL, zero independently authenticated issuers/custody.
- [OPS-002 | Supabase hosted staging readiness and cost decision](OPS-002_SUPABASE_STAGING_READINESS_v0.1.md): distinct project/permissions and twelve unexecuted hosted acceptance cases. Requires **explicit organization choice** and acceptance of any nonzero quoted cost. Do not touch CareerOS.

## Baseline review snapshot

- Current `index.html` is an embedded-data static prototype: 84 indexed names, 13 preliminary source-linked profiles, 41 source records, five supplier dossiers and 15 lot associations.
- Local QA-011 candidate reported **271/271** scripted assertions passed, **not** a WCAG certificate, independent scientific review or proof of iOS/live-host behavior.
- v0.10 usability/supplier feature work is **proposed**, not merged or release-approved.
- Initial process bootstrap is authorized by the owner's 2026-11-08 instruction. This does **not** authorize unrelated features or new publication claims.

## Maintenance

For every material change, update the relevant issue, register, PR, acceptance evidence and release decision. Review unanswered risks at each release. A date-stamped link beats an untraceable verbal assertion.
