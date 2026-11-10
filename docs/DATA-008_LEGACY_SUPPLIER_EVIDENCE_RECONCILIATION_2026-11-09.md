# DATA-008 | Legacy Research-Company Evidence Reconciliation

**Inspected:** 2026-11-09 | **Status:** BASELINE DATA INVENTORY VERIFIED AGAINST REPOSITORY FIXTURE; NOT AN INDEPENDENT SUPPLIER/LABORATORY AUDIT
**Fixture:** `poc/fixtures/researchData.v091.json` on `main`, extracted from the public prototype `index.html`. Source snapshot record names and flags describe historical source observations, not validated present-day company facts.
**Related:** [G2-VAL-001 #21](https://github.com/amy2213/peptide-clarity/issues/21), [REQ-013 #10](https://github.com/amy2213/peptide-clarity/issues/10), [G2-EVID-002](G2_COMPETITIVE_AND_REGULATORY_AUDIT_2026-11-09.md).

## 1. Exact source-record counts and reconciliation

| Recorded company ID | Name in source | Lot/substance rows | Distinct (company, reported lot token) keys | Records carrying direct report URL | With seller-reported numerical purity | Evidence issues and raw statuses |
|---|---|---:|---:|---:|---:|---|
| `particle` | Particle Peptides | 5 | 5 | **1** | 2 | 2 Unresolved |
| `polaris` | Polaris Peptides | 3 | 2 | 0 | 2 | 1 Unresolved |
| `protide` | Protide Health | 4 | 4 | 0 | 4 | None recorded |
| `maxxing` | Peptide Maxxing | 3 | 3 | 0 | 0 | 1 Not inspected |
| `peptidelabs` | Peptide Labs | 0 | 0 | 0 | 0 | 1 Not assessable |
| **Total** | 5 dossiers | **15** | **14** | **1** | **8** | **5 issues** |

**Other verified baseline characteristics:** 84 named index entries, 104 raw aliases, 41 source records with URLs, 37 nested claim records, five supplier dossiers. **Zero** original lot records have `issuerAuthenticated=true` or `sampleCustodyVerified=true`.

### Important denominators

- **1 of 15 lot-substance observations** has a direct `reportURL`. This is not “1 of 14 verified lots” because grouping by seller/reported lot text does not prove shared physical sample identity.
- All 15 lot-association rows have a `sourceId`, typically a seller publication/index. A source link is not a directly inspectable analytical report.
- Eight source lot-association rows include numerical purity values. These are **seller-reported** values; none has been promoted to independently confirmed analytical evidence.
- `polaris` + `POL-GLOW50-2` appears with BPC-157 and GHK-Cu associations, giving three observation rows but two candidate reported-lot tokens for that company. Do not discard either association or certify the blend composition from a matching string.
- “None recorded” means the current dataset contains no issue record for that company, **not** that the company was verified free of quality concerns.
- The fixture's `meta.version` refers to an earlier dataset work stage; it must not be described as new/independently refreshed vendor research simply because it is hosted by a v0.9.1 UI.

## 2. What we can and cannot conclude

**Supportable from records:** A legacy platform desk-observation dataset contains a named company and seller-published listing or source observation; source date/text and available report link can be shown as reported; unresolved claims can be compared with explicit uncertainty.

**Not supportable:** That a named vendor is licensed as a pharmacy, its products are safe or legal for human use, its listed COA corresponds to the vial a user might receive, the COA issuer independently authorized the report, the sample chain of custody is established, a reported purity implies sterility, or a peptide is FDA-approved based on compound labels.

Do not create a 0–100 safety/trust rating from missing documentation. “Not inspected” is not equivalent to “failed” and “no issue recorded” is not equivalent to “passed.”

## 3. Five-company verification pilot protocol (NOT YET EXECUTED)

For each existing company record, investigate the following separately:

| Pilot field | Evidence needed | If unsupported |
|---|---|---|
| Organization identity and business name | Primary company disclosure, legal entity registry when appropriate, dated citation | `identity_unverified` |
| Public research document availability | Exact company listing/report URL, snapshot/observed time, document type and copyright/access permission | `report_not_retrieved` |
| Claimed laboratory and report issuer | Lab's own independent portal or signed/verified direct confirmation; exact report ID | `issuer_unverified` |
| Sample/lot identity | Evidence linking report sample IDs, seller lot token, formulation and collection/sample custody | `custody_unverified` |
| Analytical method and numerical claims | Report text, units, named analytical method, reliability limitations and qualified analytical assessment | `reported_only` |
| Discrepancy resolution | Dated contact/channel, independent evidence, original/revised observation, owner/editor decision | `unresolved` |
| Cost/effort feasibility | Actual minutes per document, fees, retrieval failures and response delay | `not_measured` |

**Do not claim company identity, present-day report availability or lab authentication checked by this baseline audit.** It is a map of research needed, not a statement that any supplier passed.

## 4. Quantitative targets for feasibility pilot

Collect actual numerators and denominators only after attempted verification:
- Direct documents retrieved / lot observations investigated.
- Source-to-issuer authentication success / reports eligible for authentication.
- Candidate lot-to-reported-document mapping resolved / candidate mappings evaluated.
- Average reviewer minutes, total fees (USD), failed lookup reasons, and time since observation.
- Disputed/changed records and correction cycle time.

**Gate decision:** A transparent directory with high “unknown” coverage may still be appropriate for a **limited documented-evidence preview**, but avoid confidence metrics implying verified supplier safety. A production sourcing service cannot claim confirmed lab-report authenticity with zero independent issuer verifications.

## 5. Scope and dependency

- No new supplier or laboratory was contacted.
- No external report PDF was downloaded or redistributed.
- No current pricing, licensure or legal product access verified.
- No human-use buying link or supplier safety endorsement approved.
- G2 feasibility and G7 qualified release review remain open.

**Next:** Execute an owner-led 5-company pilot with direct report provenance verification and accurate effort/cost tracking. Preserve the original 15 associations and all five source-issue statuses throughout.
