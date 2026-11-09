# QA-013 | G3 Architecture Acceptance and Negative Test Specifications

**Version:** 0.1 | **Status:** TEST PLAN ONLY, NOT EXECUTED.\
**Related:** [ARCH-001](ARCH-001_G3_BLUEPRINT_v0.1.md), [DATA-006](DATA-006_LOGICAL_ERD_v0.1.md), [DATA-007](DATA-007_LEGACY_MIGRATION_CROSSWALK_v0.1.md), [SEC-001](SEC-001_HOSTING_SECURITY_THREAT_MODEL_v0.1.md).

Do **not** report any tests below as passed merely because this document exists. Execution needs artifact link, code/schema version, environment, reviewer, UTC test timestamp, expected/actual, defect ID and retest result. Record a blocking non-result as `NOT RUN` or `NOT VERIFIED`, never `PASS`.

## 1. Test environment, fixtures and acceptance reporting

- `legacy_raw_fixture`: exact byte-preserved `main/index.html` researchData extract with SHA-256 and origin SHA. No changes to scientific wording.
- `synthetic_regulatory_fixture`: fabricated and prominently **TEST ONLY** approved-drug, compounded and research-only products with nonreal license/product IDs. Must never publish to public site.
- `synthetic_blend_fixture`: two-ingredient research blend with shared reported lot and conflicting seller summary.
- `malicious_source_fixture`: `<script>` payload, event-handler HTML, internal-network URLs, redirect chains, oversized PDF and invalid CSV/JSON samples.
- `roles`: anonymous, editor, unauthorized reviewer, authorized qualified reviewer, owner, ingest worker and deployment principal.
- `environments`: offline parser, isolated Postgres with RLS, protected PR preview, staging, real mobile browsers when ready.
- Every test reports one of `PASS, FAIL, BLOCKED, NOT RUN`, execution version and evidence URL.

**Critical exit rule:** All P0 and P1 cases must pass and be reviewed before G6 release; G3 cannot pass merely from a static document and no G7 launch occurs without separate decisions.

## 2. Migration and relational integrity

| Test ID | Preconditions / action | Expected exact result | Priority |
|---|---|---|---|
| M01 | Extract and parse unmodified legacy researchData blob; save SHA-256 | JSON parses, extraction bytes match stored manifest and git blob; **84 compounds, 41 sources, 37 claims, 5 companies, 15 lot rows, 5 issues** | P0 |
| M02 | Unpack compound aliases and groups | 104 aliases preserved; group counts 24/47/10/3; original order/strings retained | P1 |
| M03 | Import all source and claim records | 41 source legacy IDs unique, 37 claim legacy IDs unique; **0 orphan `claim_sources`** | P0 |
| M04 | Import supplier dossiers and fields | 5 companies with 9 documented field tuples each; raw observation text and date unchanged; no invented licenses | P1 |
| M05 | Import all 15 lot rows | Exactly 15 immutable `lot_substance_observations` with original `legacy_row_id`, company, compound and source references | P0 |
| M06 | Process `polaris|POL-GLOW50-2` | Two legacy association rows remain linked to BPC-157/GHK-Cu; candidate 14 company/lot keys total; identity unverified, **no second certified physical lot created** | P0 |
| M07 | Add a forged missing claim source ID | Import rejects transaction or quarantines offending row, alerts precise orphan; public snapshot unchanged | P0 |
| M08 | Import `sources.published="Live advisory; date not independently checked"` | `published_raw` exact; parsed date NULL; no invented `today` date | P1 |
| M09 | Import legacy `issuerAuthenticated=false` and `sampleCustodyVerified=false` on 15 rows | Raw flags preserved; **0 independent authentication verification events** generated from booleans | P0 |
| M10 | Import 5 compounds with legacy `categoryType=approved` | 5 raw legacy labels retained; **0 newly inferred FDA-approved product/application/indication records** | P0 |
| M11 | Re-run same snapshot import with same idempotency keys | No increase in counts or duplicate audits; same canonical public staging view and hashes | P1 |
| M12 | Replace one raw record field or drop an unrecognized JSON key in transform | Hash/diff report flags mismatch; importer fails acceptance or preserves exact unknown field in raw record | P0 |
| M13 | Import 8 numerical purity reports with most report URLs absent | Reported values preserved as **seller observations**, without fictitious authenticated lab report rows | P0 |
| M14 | Introduce conflicting company/lot grouping evidence | Candidate match goes to unresolved queue; no silent automatic identity merger | P0 |
| M15 | Compare entire `meta`, `validation`, `record_counts` against source JSON | Original source words and declared counts preserved verbatim; new observed counts stored separately | P1 |
| M16 | Import 5 evidence issues and try to auto-close when report missing | All five remain open/unresolved unless reviewed decision cites evidence; no auto-resolution | P0 |

## 3. Domain-specific truth and harmful misunderstanding

| Test ID | Action | Expected result | Priority |
|---|---|---|---|
| D01 | Query substance semaglutide only | Shows ingredient-level profile; **does not mark all listings or formulations FDA-approved** | P0 |
| D02 | Query synthetic verified approved-product fixture | Product-specific authority, indication, formulation and date visible; no approval asserted beyond validated scope | P0 |
| D03 | Query a compounded medication containing a drug ingredient with approved branded forms | Clearly labeled **not an FDA-approved finished product**; product type separate; no automatic interchangeability claim | P0 |
| D04 | Query a research-only BPC-157 seller listing | Documentation and unknowns shown; no “safe to use/buy/inject” endorsement or unapproved human-use purchase referral | P0 |
| D05 | View reported 99.2% purity and missing issuer/custody verification | User sees seller-reported analytical value and explicit *issuer/custody unverified*, not safety/sterility/efficacy score | P0 |
| D06 | Search for “GLOW” brand/blend and compare to standalone peptide | Result clearly tagged blend/marketing term; ingredient associations source-qualified, not one chemical entity | P1 |
| D07 | Compare $45/5 mg to $60/10 mg with prices dated in different regions | Displays units, source and observed dates; normalized unit figure only if quantities/formulations comparable; no bogus global “cheapest” | P1 |
| D08 | Change FDA label, price or pharmacy licensing observation timestamp beyond configured freshness window | “Stale/last checked” or unknown appears; no “verified today” or “available now” claim | P0 |
| D09 | Attempt to classify a pharmacy licensed without current source/jurisdiction | Verification denied or displayed as unknown; approval withheld | P0 |
| D10 | Add supplier correction challenging a public finding | Original finding preserved, correction case acknowledged without automatic retraction, revised status needs review and dated public correction | P1 |
| D11 | Search research suppliers in a comparison UI | Company sources/documents available, **no unsupported ordinal trust/safety rank** | P0 |
| D12 | Access page with no verified scientific source or specialist review | Exact missing-review status and uncertainty shown, not “scientifically proven” or “verified” | P0 |

## 4. Access control, data leakage and ingestion hazards

| Test ID | Preconditions / action | Expected result | Priority |
|---|---|---|---|
| S01 | Anonymous credential directly queries each private schema/table | Denied by grants/schema exposure; no row data or schema discovery beyond allowed metadata | P0 |
| S02 | Anonymous calls public DTO, cache, search and compare with draft/secret IDs | Only authorized snapshot fields returned; no private notes, raw PDFs, unpublished dossiers or existence leak | P0 |
| S03 | Signed-in editor tries admin role, qualified verification, unassigned draft or publish endpoint | Denied 403; failed attempt logged; normal editor cannot grant themselves permission | P0 |
| S04 | Modify editable `user_metadata` or supplied role claim in JWT/request | Authorization unchanged; server uses trusted policy/claims and exact resource grants | P0 |
| S05 | Scan client JS, source, logs, preview env/build output for private database credentials | Zero service-role/secret values disclosed; deployment keys isolated by environment | P0 |
| S06 | Inject `<script>`, `onerror` image, `javascript:` URL into source title/summary/COA fields | Rendered inert or rejected; CSP remains effective; no script execution | P0 |
| S07 | Fetch candidate URL to `127.0.0.1`, RFC1918 IP, metadata IP, or redirected private address | Rejected before fetch and after redirect/DNS resolution; incident logged; no credentials exposed | P0 |
| S08 | Upload oversized/invalid/malicious PDF masquerading as COA | Rejected or private quarantined; no public object or parse side effect | P0 |
| S09 | Load PR preview as external anonymous visitor | Synthetic/approved public-only data, no prod secrets or private API access; preview access controls tested | P0 |
| S10 | Search for sensitive health/person information in analytics and logs | None recorded by design; any public upload/login feature blocked until privacy approval | P1 |
| S11 | Authenticated ingestion worker tries `publish_snapshot` or alter approval | Denied by role/grant and transaction; audit records attempt | P0 |
| S12 | Attempt to SELECT via view whose owner can bypass RLS | Public views configured as invoker/restricted, RLS enforced, no leak | P0 |

## 5. Editorial publication, provenance and corrections

| Test ID | Action | Expected result | Priority |
|---|---|---|---|
| P01 | Ingest new company claim with complete automated extraction | Stored quarantined/draft; does **not** appear publicly until qualified review and explicit publish decision | P0 |
| P02 | Editorial reviewer marks work ready but owner has not approved specific publication | No public snapshot promotion or cache invalidation | P0 |
| P03 | Authorized owner publishes approved revision with required evidence | New immutable snapshot ID/hash; public read model updates only to approved fields; audit has actor/time/decision | P0 |
| P04 | Publish a draft whose required source link is missing or unresolved high-severity risk exists | Transaction rejected with issue ID; older public snapshot remains served | P0 |
| P05 | Retrieve a public claim and request its provenance | User can trace claim → linked source → publisher/date → review status; any unverified issuer flagged | P1 |
| P06 | Submit correction and approve replacement | New revision and dated correction reference; previous snapshot and audit remain recoverable | P1 |
| P07 | Request user-facing COA without rights to redistribute underlying PDF | Metadata/source link only if allowed; no unlawful public PDF rehost or private object leak | P1 |
| A01 | Editor attempts DELETE of audit log/review history | Denied; audit append-only by application role | P0 |
| A02 | Inspect a high-impact published claim after modification | Before/after content hashes, source revision and reviewer decision link are retrievable | P0 |

## 6. UI, accessibility, performance, deployment and recovery

| Test ID | Action | Expected result | Priority |
|---|---|---|---|
| U01 | Search full legacy catalogue, browse all, inspect aliases | All 84 indexed entries accessible; aliases work; 71 pending profiles not mislabeled reviewed | P1 |
| U02 | Navigate from substance to supplier, report, issue and comparison | Links resolve or explicitly unavailable with status, no unexplained blank page | P1 |
| U03 | Keyboard-only and VoiceOver/screen-reader walkthrough on mobile | Focus order, landmarks, labels, announcements, comparison tables and modal dismissal usable; record exact defects | P1 |
| U04 | 320/375/768/1440 px widths, 200% zoom, reduced motion | No critical overflow/obscured actions; decorative 3D elements respect reduced-motion preferences | P1 |
| U05 | Simulate 10x current records without separate search service | P95 query latency and page weight collected; owner sets thresholds before G3 performance gate | P2 |
| CI01 | PR containing a broken schema, orphan source or invalid TypeScript | Required CI fails and blocks merge **once branch protections are configured and verified** | P0 |
| CI02 | PR containing only documentation change | CI runs structural/code checks and reports artifact links; does not claim medical signoff | P1 |
| R01 | Restore database and private object store from backup into isolated staging | Versioned snapshots, source hashes, access policies and audit history recover; measured RPO/RTO documented | P0 |
| R02 | Publish bad preview, simulate deployment failure and revert | Previous verified site and previously approved public snapshot restored without deleting source or audit history | P0 |
| R03 | Disconnect database or source fetcher | Public site serves last approved snapshot or explicit safe unavailable state; no unreviewed fallback content | P1 |
| R04 | Attempt G7 release without qualified science/editorial, legal, accessibility and security review | Release blocked/appropriately restricted and unverified status recorded; no automatic release | P0 |

## 7. Minimum test evidence artifact template

```yaml
test_id: M06
requirement_id: ARCH-001
build_sha: "<actual SHA>"
schema_version: "<actual migration>"
environment: "<test environment>"
timestamp_utc: "<ISO date>"
operator: "<approved reviewer>"
fixture_sha256: "<actual fixture digest>"
steps_run:
  - "<specific command or GUI path>"
expected: "2 original Polaris GLOW association rows; 1 provisional reported-lot grouping; status unverified"
actual: "<observed rows, counts, query output>"
status: "NOT RUN"   # PASS | FAIL | BLOCKED | NOT RUN
evidence_links: []
defect_id: null
reviewer_signoff: null
```

## 8. Exit criteria and blockers

- **Draft documentation completeness:** each data field has a documented destination/preservation rule, test cases include negative cases, owners and risk priorities identified. Does not equal execution.
- **G3 exit requires:** PDP v1.0 gate approval or explicitly scoped allowable exception, owner review of models and module contracts, representative examples showing source/claim/lot/product traceability, actual test evidence for architecture assumptions, no unresolved P0/P1 architecture flaw, explicit acceptance of open risks.
- **G6 engineering release:** implement access control, RLS, schema migrations, CI, API, integrated user workflows, security controls and run cases.
- **G7 publication:** distinct owner approval, science/editorial/analytical/regulatory/legal/accessibility checks, incident/correction and backup readiness.

All planned tests remain **NOT RUN** until their execution artifacts exist.
