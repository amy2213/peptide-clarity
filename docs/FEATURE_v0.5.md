# FEATURE-005 — v0.5 Expanded Company + Lot Evidence Explorer

**Status:** Owner-led internal design/build draft under DEC-001/DEC-002; not approved first-release requirements, PDP v1.0 or G7 launch.  
**Snapshot:** 2026-10-24.  
**GitHub:** `amy2213/peptide-clarity`, review branch `ux-v0.3-three-paths`. Public Pages `main` intentionally unchanged pending publication review.

## Intent and observed problem
The owner wants a newcomer to select a peptide, learn the science, identify the companies whose public pages list it, view each company’s known/unknown evidence, examine individual lots and compare multiple companies. The previous release supported only two companies with five product/index links. This iteration expands the *evidence* footprint without claiming supplier quality or a safe purchasing decision.

## What is implemented
- Seven substance/related research-term records, including non-peptide 5-Amino-1MQ explicitly classified as a small molecule. Three starter evidence profiles retain the source-backed v0.4 claims; remaining science summaries remain provisional/not reviewed.
- Five company dossiers: Particle Peptides, Polaris Peptides, Protide Health, Peptide Maxxing, Peptide Labs. The fifth has an explicit account-wall record but **no inferred chemical test result**.
- Fifteen company–substance–lot associations across **14 distinct company+lot identifiers**. A single GLOW 50 blend may appear when browsing two ingredient entries, but must not be counted as two independently tested physical lots.
- Twenty-two source-index entries: 11 inherited scientific/regulatory sources and 11 dated new supplier / issuer-lookup references, linked to source review-status labels.
- Five open issue/reconciliation records with stable RCN IDs.
- Lot inspector: product formulation, source type, named issuer vs actual issuer authentication, L0–L2 documentary depth, purity/content *reported for a sample*, measured-vs-labeled quantity where both were observed, sterility/endotoxin limitations, open issues, dates and evidence source links.
- Company dossiers with nine evidence domains; missing or inaccessible documentation is not a grade or accusation.
- Comparison of up to three distinct companies for a selected substance. It shows their available lot records and review depth with responsive cards. It does not compute ungrounded averaged scores, normalize non-equivalent blends or imply product safety.
- Approved prescription active ingredient pathway separated from research-only suppliers; current licensed-pharmacy inventory/pricing not asserted.
- Compact mobile-first homepage; expanded company index is hidden behind optional disclosure to preserve the peptide-first journey.

## Acceptance checks
- User can choose BPC-157, view eight associated evidence records, open the Particle batch and see 5 mg labeled vs 6.38 mg reported, +27.6%, and the statement that lab issuance was not independently confirmed.
- Company profiles include inaccessible Peptide Labs as an access finding with **zero inferred lots**.
- User can select three of four companies with BPC documentation, deselect/switch one, and browse all selected lot records without side scrolling at a 390px viewport.
- Supplier certificate numbers/purity figures never substitute for clinical evidence or sterility certification.
- On the approved-drug pathway, user sees a licensed-pharmacy caution rather than research-supplier shopping links.
- The five source exceptions remain open. No false claim of completed laboratory authentication, purchaser-vial match, current inventory or independent expert sign-off.

## Exclusions
No transactional purchasing, affiliate promotions, dosing, injection calculations, prescription guidance, file uploads, login systems, database, automatic AI health conclusions, independent specimen testing, authenticated issuer API, comprehensive regulatory clearance or company response workflow. The page is a local/static owner prototype only.

## Remaining gate dependencies
PDP-001 v1.0 approval; traceable source ingest/edit history; expert scientific and analytical review; legal review of company profiles and third-party links; WCAG 2.2 AA audit; privacy/security review; correction processes; G7 explicit publication approval. Outside user interviews remain deferred, not completed.