# ARCH-002 | Repository Layout, Module Boundaries and API Contracts

**Status:** Proposed G3 application structure, not a working application or adopted framework.  
**Parent:** [ARCH-001](ARCH-001_G3_BLUEPRINT_v0.1.md). Keep `main/index.html` intact for legacy rollback until explicitly superseded.

## 1. Proposed structure (future implementation branch only)

```text
peptide-clarity/
├── legacy/
│   ├── v0.9.1/index.html        # frozen SHA and recovery copy, not edited
│   └── fixtures/researchData.json
├── apps/
│   └── web/
│       ├── app/
│       │   ├── (public)/        # /, /substances, /companies, /compare, /evidence
│       │   ├── (editorial)/     # authenticated /admin area
│       │   └── api/v1/         # read APIs, protected review commands
│       ├── components/         # shared accessible design system
│       ├── lib/                # API clients, typed display models, validators
│       └── styles/             # theme tokens, dark/teal visual system
├── packages/
│   ├── domain/                 # pure business rules and state types
│   ├── contracts/              # API request/response schemas
│   ├── data-access/            # repository interfaces, SQL adapters
│   ├── ingestion/              # source retrieval, quarantine, normalization
│   ├── editorial/              # review, approvals, corrections, publication
│   └── shared/                 # logging, error semantics, time/units
├── supabase/
│   ├── migrations/             # versioned, reviewed SQL (when approved)
│   ├── seed/                   # synthetic and redacted test fixtures only
│   └── config.toml             # environment-specific setup (no secrets)
├── scripts/
│   ├── export-legacy-data.*    # read-only extraction/checksum
│   ├── import-legacy-data.*    # idempotent staging import
│   ├── reconcile-legacy.*      # count/field/relationship and view checks
│   └── validate-repo.mjs       # current validator, retained
├── tests/
│   ├── unit/                   # taxonomy, text and evidence classification
│   ├── integration/            # Postgres policies, migrations, source links
│   ├── contract/               # route DTO and permission tests
│   ├── e2e/                    # browser/mobile/keyboard workflows
│   ├── fixtures/               # immutable legacy and synthetic cases
│   └── security/               # RLS, SSRF, data leak, auth bypass
├── docs/
│   ├── architecture/           # this controlled G3 package
│   ├── CONTROL_CENTER.md
│   └── ...                     # current decision/change/QA documents
├── .github/workflows/
│   ├── validate.yml            # existing CI baseline
│   └── future-application-ci.yml
├── package.json
├── pnpm-lock.yaml              # if pnpm selected, checked in
└── README.md
```

**Do not physically move the current `index.html` during G3 drafting.** Repository layout above is a proposed post-approval arrangement. App and storage projects do not exist merely because their folders are documented.

## 2. Modules and allowed ownership

| Domain | Owns | Exposes to other modules | May NOT do |
|---|---|---|---|
| `catalog` | Substance IDs, aliases, product-to-ingredient mapping and nomenclature | Search result and normalized identifiers | Treat drug brands as proven compound synonyms; assert approvals |
| `science` | Claim interpretations, study evidence, plain-English review statuses | Source-linked science summaries | Infer clinical safety from lab certificates |
| `regulatory` | Finished-product approvals, indications, compounding classification | Versioned product regulatory DTO | Set global substance `FDA-approved` |
| `pharmacies` | Pharmacy organizations, jurisdiction/credentials, lawful prescription access | Date-scoped license/access DTO | Assume licensure from a site, bypass Rx rules |
| `research-suppliers` | Organization dossiers, research listings, reported lot associations | Documentary comparisons | Rank vendors as human-use safe |
| `evidence` | Source snapshots, reports, measures, verification and open issues | Evidence chain with provenance and uncertainty | Mark seller PDF independently authenticated by default |
| `comparisons` | Compare eligibility, normalization, display composition | Side-by-side display DTO | Change primary evidence records or generate arbitrary safety scores |
| `ingestion` | Fetch queues, parsing, quarantine, deduplication, timestamped source observations | Staged candidate records | Write to public publication tables |
| `editorial` | Draft versions, corrections, reviewer assignments and decisions | Approval state transitions | Skip qualified reviews or silently overwrite publication |
| `publication` | Immutable public snapshots and read models | Public searchable DTOs and release metadata | Publish solely because ingestion succeeded |
| `audit` | Append-only action and decision log | Event references, authorized admin audit search | Allow normal editors to erase audit history |

**Dependency rule:** UI -> typed server endpoints -> domain services -> repository interfaces -> persistence. Ingestion -> staging -> editorial -> publication, never ingestion -> public. Source and report data can be displayed from an independently approved snapshot. Comparison consumes provenance-aware facts and does not own verification.

## 3. Public API proposal, v1

Public routes return only records in an explicitly approved public snapshot, no private raw supplier correspondence or internal decision notes.

| Route | Response (candidate typed DTO) | Notes |
|---|---|---|
| `GET /api/v1/substances?q=&group=&page=` | `{items:[{id,name,kind,profileStage,plainSummary,sourceCount}], page, total, snapshotId}` | Topic matching limited to curated evidence-backed terms; paginated at scale but “browse all” accessible |
| `GET /api/v1/substances/:slug` | `{substance,scientificClaims,sourceRefs,reviewStatus,unknowns,snapshotId}` | No global drug approval status |
| `GET /api/v1/products/:id` | `{product,type,ingredients,regulatoryRecords,indications,sourceRefs,asOf}` | `approved` only if product-specific independently reviewed record |
| `GET /api/v1/pharmacies?jurisdiction=` | `{organizations,licenseStatus,verifiedAt,sourceRefs}` | State license expiry and Rx constraints |
| `GET /api/v1/research-companies` | `{items:[{id,name,dossierSummary,reviewStatus,sourceCount}]}` | Company directory |
| `GET /api/v1/research-companies/:id` | `{organization,publicClaims,reportedLots,unresolvedIssues,asOf}` | No 'safe to purchase/use' field |
| `POST /api/v1/compare` | `{mode,items,fields,comparabilityWarnings,snapshotId}` | Public **read-only computation**; bounded IDs, types and rate limiting, not an order request |
| `GET /api/v1/evidence/:id` | `{documentMetadata,reportedResults,verificationHistory,limitations}` | Redacted public document metadata only |
| `GET /api/v1/methodology` | `{version,methods,disclosure,releaseDate}` | Dated explanation of what has and hasn't been checked |

**Potential type definitions (conceptual):**
```ts
type ReviewState = 'draft' | 'owner_desk_review' |
  'expert_review_pending' | 'reviewed' | 'disputed' | 'rejected' | 'superseded';

type EvidenceStatus = 'not_checked' | 'claimed' |
  'reviewed_document' | 'authenticated' | 'contradicted' | 'unresolved';

type ProductKind = 'fda_approved_medicine' | 'compounded_preparation' |
  'research_listing' | 'investigational' | 'marketing_blend' | 'other' | 'unknown';

type PublicSource = { id: string; title: string; url: string | null;
  publishedRaw: string | null; checkedAt: string | null; reviewStatus: ReviewState; };

type PublicComparisonField = { label: string; values: Array<{
  subjectId: string; value: string | number | null; unit?: string;
  sourceIds: string[]; observedAt?: string; evidenceStatus: EvidenceStatus;
}>; comparabilityWarning?: string; };
```

**Contract constraints:** invalid/unknown IDs return 404 or 400 without private existence leakage; deny incomparable cross-type rankings; never return internal editor notes; no browser uploads or purchase checkout endpoints in initial scope; cache public DTOs by immutable `snapshotId`, not a blind global TTL.

## 4. Editorial/API command proposal, server only

`/api/v1/admin/drafts`, `/api/v1/admin/reviews`, `/api/v1/admin/publications`, `/api/v1/admin/corrections` would be **authenticated and specifically authorized** command routes. They require CSRF defense when cookie sessions are used, explicit reviewer permission, content validation, audit event, idempotency key and a documented change ID.

| Action | Minimal role | Required guard |
|---|---|---|
| Create draft/attach source | Editor | Valid identity, provenance, size limits and private storage |
| Mark a source inspected | Trained owner/editor according to policy | Evidence timestamp and specific scope |
| Authenticate laboratory issuer | Qualified authorized verifier | Independent authentication evidence and reviewer ID |
| Approve regulatory/medical claim | Qualified reviewer according to G5/G7 policy | Specific primary source, scope, date and independent review |
| Publish revision | Owner + applicable approvals | No blocking findings; immutable snapshot and rollback pointer |
| Amend published result | Owner or reviewed correction workflow | Superseding revision and visible correction history |
| Manage identity/roles | Owner/admin only | No role escalation via editable user metadata |

Until explicit role governance is approved, all editorial actions remain unavailable. The schema alone does not grant privileges.

## 5. Error, caching and traceability contract

- `validation_error` (400), `unauthenticated` (401), `forbidden` (403), `not_found` (404), `conflict` (409), `rate_limited` (429), `internal_error` (500).
- Every meaningful response includes `snapshotId` or `asOf`; field-level source/verification status for high-impact claims.
- Never expose stack traces, credentials, unrestricted table APIs or private IDs to anonymous users.
- Public pages may be statically generated or revalidated on approved publications, avoiding auto-publication from raw database changes.
- Search logs are minimized and retained per approved policy; no personalized treatment profiles by default.
- Contract tests must assert identical semantics across mobile/desktop, canonical slugs and legacy aliases.
- No cookies or tracking vendors by default without a documented privacy decision.

## 6. Transition boundaries

1. `legacy` module acts as a read-only golden fixture and rollback reference.
2. `data-access` implements repositories that can use static fixtures in tests and Postgres in staging.
3. Initial public adapter exposes only approved existing preview scope, with unchanged warnings.
4. New pathways remain behind feature flags and do not appear as approved until evidence, tests and release decision pass.
5. GitHub Pages stays a stable fallback; changing DNS or public hosting requires a separate controlled cutover, never implicit G3 sign-off.

**Ownership note:** Existing `scripts/validate-repo.mjs` remains active; new CI jobs do not bypass its verified structural guardrails. The workflow issue OPS-001 is not treated as resolved without an observed green run and enforced repository settings.
