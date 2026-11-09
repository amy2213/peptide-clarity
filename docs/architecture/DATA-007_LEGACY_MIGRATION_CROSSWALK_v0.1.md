# DATA-007 | Lossless Legacy Data Migration, Crosswalk and Rollback

**Status:** PROPOSED G3 plan, not a completed migration.\
**Parent:** [ARCH-001](ARCH-001_G3_BLUEPRINT_v0.1.md) · [DATA-006 ERD](DATA-006_LOGICAL_ERD_v0.1.md) · [QA-013 test matrix](QA-013_ARCHITECTURE_ACCEPTANCE_TESTS_v0.1.md)\
**Baseline:** Root `index.html` SHA recorded by GitHub at inspection, v0.9.1 published owner-testing prototype. Do not edit source JSON as part of extraction.

## 1. Invariants and exact inventory

The inline `<script id="researchData">` on `main/index.html` is the migration's **immutable raw source**. Extract with a tested DOM/parser or safe explicit marker matching; store exact original substring bytes, a parseable JSON copy, SHA-256 and Git commit/blob identifiers. Never normalize the raw archive in place.

| Legacy collection | Count | Reconciliation |
|---|---:|---|
| `compounds` | 84 | Distinct `id`, 104 alias entries; 24 peptide medicines/analogs, 47 research peptides, 10 related nonpeptides/proteins, 3 commercial blends/marketing names |
| `sources` | 41 | All distinct `id`, 30 `SRC-*`, 11 `SUP-*`; 41 source URLs |
| Nested `compounds[*].claims` | 37 | Distinct claim IDs, all cited source IDs resolve |
| `companies` | 5 | Distinct company IDs, 9 field observations per current company |
| `lots` | 15 | Distinct legacy association IDs and valid company/substance links; **14** company/reported-lot candidate groups |
| `issues` | 5 | Distinct issue IDs; preserve unresolved statuses |
| `meta`, `validation`, `record_counts` | 1 object each | Retain verbatim as snapshot metadata, no authority upgrade |
| Linked profiles | 13 | `profileStage` present; no established independent expert review |
| Dedicated plain-English objects | 8 | `simple, interest, human, caution` keys; others may have general summaries |

Observed 15/15 lot rows have `issuerAuthenticated=false` and `sampleCustodyVerified=false`; 8 have a reported purity number; 1 has a direct `reportURL`. These are legacy data counts, **not** scientific verification results.

## 2. Crosswalk: source records

| Existing JSON field | Proposed destination | Migration rule |
|---|---|---|
| `sources[].id` | `evidence.sources.legacy_id` | Exact text, unique within source type |
| `title`, `publisher`, `kind`, `url` | `sources.title, publisher_raw, kind_raw, url` | Retain strings and source type; do not infer authority |
| `published` | `sources.published_raw`, optional `published_at` | Retain raw, parse date only when unambiguous and flagged as interpreted; do not convert “Live advisory; date not independently checked” to today |
| `summary`, `assessment` | `sources.summary_draft, assessment_draft` | Private editorial fields, never authoritative without review |
| Entire source object | `governance.raw_import_records.raw_json` | Lossless original and per-record hash |

## 3. Crosswalk: substance catalogue, profiles and claims

| Existing JSON field | Proposed destination | Migration rule |
|---|---|---|
| `compounds[].id`, `name` | `catalog.substances.legacy_id, name` | Exact stable IDs and display name |
| `catalogueGroup` | `substances.legacy_group_raw`; candidate `kind` | Preserve original label; manually distinguish actual compound from market blend or adjacent product |
| `category`, `categoryType` | `substances.legacy_category_raw, legacy_category_type_raw` | **DO NOT** populate `regulatory_product_records` or approved products from `approved` label |
| `subtitle`, `summary`, `unknown` | `governance.content_revisions.draft_payload` | Draft prose, source review remains required |
| `aliases[]` | `catalog.substance_aliases` | Preserve all 104 rows and order; `alias_kind=unclassified` initially; a drug brand may be product identity rather than precise synonym |
| `claims[].id` | `evidence.claims.legacy_id` | Unique, 37 total |
| `claims[].type, title, text, meaning, evidenceKind, review` | `claims.*` draft text, type, evidence metadata, raw review | Preserve all words, do not infer qualified review |
| `claims[].sources[]` | `evidence.claim_sources` | Resolve each `SRC` or `SUP` reference; fail import if missing |
| `profileStage`, `expertReviewed`, `contentReviewedAt` | Draft review metadata and record origin | `false` and null not converted to approval; “reviewed” requires reviewer identity and evidence |
| `plainEnglish.simple/interest/human/caution` | `content_revisions.draft_payload.plainEnglish` | Preserve as provisional authored content |
| `reviewNote`, `catalogueEntry` | Draft content metadata plus `raw_import_records` | Never silently discard future/unknown keys |
| `compounds[*]` full object | `raw_import_records` | Original per-record JSON and SHA-256 |

**Negative rule:** The five `categoryType=approved` entries refer to preliminary nomenclature and must not produce five approved products. Product-specific approvals and indications require newly verified source work and separate records.

## 4. Crosswalk: company dossiers

| Existing JSON field | Proposed destination | Migration rule |
|---|---|---|
| `companies[].id, name, domain` | `catalog.organizations.legacy_id, display_name, domain` | Brand/display string only; legal identity remains unverified |
| `description, source, observed, sourceChecked, reviewStatus` | `organization_observations` + draft dossier revision | Preserve dates and source URLs; `observed` is desk observation, not real-time licensing proof |
| `fields[][]` (field label, value, note, URL) | `evidence.organization_observations` (one row per legacy tuple) | Preserve 9 tuples/company with ordinal, label/value/note/URL and `raw_json`; no free-text value auto-promoted to verified pharmacy/company/price fact |
| Full `companies[*]` object | `raw_import_records` | Exact JSON; stable ID |

**Do not** infer pharmacy licenses, retail status, independent lab identity or exact legal entities from these dossiers. Those require explicit new evidence and reviewer workflow.

## 5. Crosswalk: lot associations and analytical observations

| Existing JSON field | Proposed destination | Migration rule |
|---|---|---|
| `lots[].id` | `evidence.lot_substance_observations.legacy_row_id` | Keep all 15, unique and immutable |
| `company` | FK `organization_id` | Resolve by legacy company ID; fail if missing |
| `compound` | FK `substance_id` in association | Resolve by legacy substance ID; may represent one ingredient in blend |
| `lot` | `reported_lots.reported_lot_code` and raw field | Candidate group (company, reported code), **identity_status=unverified** |
| `name, kind` | `reported_lots.product_label_raw, listing_kind_raw` or association-specific text | Preserve competing labels; if inconsistent, mark group ambiguous |
| `source, sourceType, sourceId` | Source observation and `sources` FK when `sourceId` provided | Seller source ≠ authenticated test issuer |
| `reportURL, reportSourceId` | `source_documents.source_url` and source link if non-null | A URL ≠ the document has been fetched, scanned, parsed or authenticated |
| `reportDate, observedAt` | Raw date string and parsed date if valid | Preserve raw and source checked date separately |
| `issuerNamed` | `analytical_observations.issuer_named_raw` | Name printed on seller report ≠ issuer authenticated |
| `issuerAuthenticated, sampleCustodyVerified` | Legacy raw flags + verification status `not_verified` | Do not create independent verification events from bare flags |
| `evidenceLevel, reviewBasis, reviewStatus` | `analytical_observations` provenance and draft review metadata | Preserve seller/desk evidentiary scale L0/L1; no expert graduation |
| `reportedPurityPct, labelMg, assayedMg` | `analytical_observations` value + raw unit + reported source | Preserve only observed numeric values; do not invent lab report or precision; units mg / percentage separately |
| `identity, endotoxin, microbial, sterility` | `analytical_observations.result_text_raw` categorized per result | These may be “not reviewed” or text-only; do not coerce to pass/negative/zero |
| `lotMapping, unresolvedConflict, limitations` | Issue/reference and interpretation notes | Retain verbatim and link to unresolved findings |
| Entire `lots[*]` object | `raw_import_records` | Lossless preservation before any grouping |

**Schema refinement required:** `evidence.analytical_observations` is a first-class table for *seller-reported* laboratory fields even when no true `lab_reports` row can be substantiated. `lab_reports` is populated only when a real report source is inspected and bound to an evidence chain, and its `issuer_authenticated` and `custody_verified` stay separate. Raw observations must not be shoehorned into a fictitious authenticated laboratory report.

### Known duplicate and blend case

`polaris|POL-GLOW50-2` is present in two records:
- `LOT-POL-GLOW50-2` -> `bpc-157`
- `LOT-POL-GLOW50-2-GHK` -> `ghk-cu`

An importer should create/hold **one candidate reported-lot group** plus **two distinct legacy association rows**; it should not assert actual physical lot identity, exact formulation or custody. If product labels conflict or multiple vendor formulations reuse a lot code, keep separate provisional grouping decisions pending review. This is a deliberately documented data ambiguity.

## 6. Crosswalk: evidence issues and collection metadata

| Existing JSON | Proposed destination | Rule |
|---|---|---|
| `issues[].id, company, lot, kind, status, summary, source, sourceId` | `evidence.evidence_issues` with optional linked organization/lot/source | Preserve five unresolved issues, original status/wording and source link; missing/ambiguous lot FK allowed |
| `meta` | `governance.ingestion_runs.metadata_json` | Preserve version, timestamp, notice and UI-version strings verbatim; distinguish data version from UI version |
| `validation` | `ingestion_runs.validation_json` | Preserve source-reported scheme/flags, not an independent security certification |
| `record_counts` | `ingestion_runs.declared_counts_json` | Compare to actual parse counts, never substitute declared values for observed totals |

## 7. Migration execution stages and control points

| Step | Action | Output | Stop condition |
|---|---|---|---|
| M0 | Freeze original `main` commit, `index.html` blob and raw JSON SHA-256 | Immutable extraction manifest | Missing version or checksum |
| M1 | Parse and validate raw JSON and IDs with schema and golden tests | `legacy-fixture.json` + count report | Any source-reference, company or substance FK failure |
| M2 | Create isolated reviewed SQL schema and RLS/grants | Versioned migrations, no prod project touched | Unsafe public access or migration failure |
| M3 | Write `raw_import_records` under run ID, compare per-record hashes | Lossless archive | Any field dropped or silently normalized |
| M4 | Populate catalog, sources, claims, company observations, provisional lot groups and reported analytical observations | Mapped normalized data | Missing provenance, duplicate row ID or false FDA product creation |
| M5 | Reconcile per-class counts and specific blend/lot cases | Diff report with accepted/unresolved list | Unexplained difference or unsupported merge |
| M6 | Render read-only API against approved/allowed draft scope in protected staging | Contract and comparison parity report | Leaks, unsupported status or broken search |
| M7 | Run manual/expert/negative acceptance cases, measure cost and restore | Review package | P0/P1 risks, unverified required controls |
| M8 | Owner-scoped preview decision; optional separate public migration and G7 later | Signed release/rollback record | Missing explicit approval |

**Idempotency:** `(ingestion_run_id, legacy_collection, legacy_id)` unique. Re-running same import into the same staging snapshot must not double the 84 substances or 15 observations. Content changes require a new revision/run; old raw objects remain.

**Rollback:** Do not discard `main/index.html`. Keep GitHub Pages legacy accessible until new hosting smoke, read-equivalence and security pass. Capture DB schema version and backup restore point before promotion. Switch traffic via controlled alias/DNS change only with a signed deployment decision. On failure restore previous hosted release/route and previously approved public snapshot, never delete audit data. Reverting code must not silently revert research evidence history.

## 8. Verification queries and output

**Illustrative read queries, not executed (names depend on finalized schema):**

```sql
-- Expected in staging after one successful import
select count(*) from catalog.substances;                      -- 84
select count(*) from catalog.substance_aliases;               -- 104
select count(*) from evidence.sources;                        -- 41
select count(*) from evidence.claims;                         -- 37
select count(*) from catalog.organizations
 where legacy_id is not null;                                 -- 5
select count(*) from evidence.lot_substance_observations;     -- 15
select count(*) from evidence.evidence_issues
 where legacy_id is not null;                                 -- 5

-- No phantom "FDA-approved product" records from categoryType labels
select count(*) from regulatory.regulatory_product_records
 where origin = 'legacy_category_flag';                       -- 0
```

**A query returning target counts is necessary but not sufficient.** Compare all normalized field values against the source manifest, preserve raw hashes and unknown states, and run deliberate negative cases before acceptance.

## 9. Migration questions to resolve

1. Are same seller + lot code values globally unique across formulations/dates? Current data cannot establish this.
2. How should brands and blends be indexed for users without being treated as precise chemical synonyms?
3. Which supplier source PDFs may be stored/rehosted, versus linked with only metadata?
4. What level of confidence is enough to show manufacturer/pharmacy identity and prices?
5. Which original date strings can be reliably normalized, and what constitutes a checked current observation?
6. Who is allowed to review lab reports and approve site wording about them?

**Status:** Field crosswalk complete as a proposed mapping; importer, SQL migration and reconciliation execution still pending approval.
