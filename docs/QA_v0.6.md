# QA-006: Autocomplete + expanded catalogue

**Date:** October 24, 2026  
**Scope:** Static owner-testing v0.6; tested in headless Chromium at 390×844 and 1280×820.  

## Scripted results
**50/50 browser assertions passed, zero page-level JavaScript errors.** Checks were repeated independently on mobile and desktop test viewports:
- Default listing count (84) and manageable featured set (9)
- Search focus triggers suggestions; ARIA expanded state follows
- Suggestions remain on screen and anchor to search field
- Alias `ss31` matches elamipretide; FDA source link exposed on its profile
- `glow` matches a separate commercial blend/marketing term
- ArrowUp/ArrowDown focus metadata, Enter selects; Escape closes
- Normalized `bpc157` matches BPC-157 and preserves existing lot cards
- Expand/collapse all 84 index terms
- Existing two/three-company comparisons continue working
- Company name search still routes to company dossier
- No document-wide horizontal overflow or page script exceptions

**Additional validation:** Extracted JavaScript passes `node --check`, data JSON parses, IDs are distinct, expected category counts reconcile, and supplier lot entries remain explicitly unverified. The embedded JSON is generated from the same `data/public-research-v0.6.json` records.

## Limitations
- The automated browser's administrator policy blocked direct file/localhost URL navigation; the test harness injected the full HTML into an in-memory browser page. We have *not* verified live GitHub Pages deployment, offline persistence, Safari iOS VoiceOver, other screen readers, keyboard-only end-to-end accessibility, or comprehensive WCAG 2.2 AA criteria.
- Scientific/clinical claims, supplier lab authenticity and legal/regulatory statements have **not** received qualified independent publication signoff.
- A name index or a brand alias is not an authentication of the advertised chemical identity.
- Do not describe 84 entries as 84 completed peptide profiles. Of the 84, 13 are specifically marked as blends, proteins, or other non-peptide-related terms.

**Release:** Development branch review only. Public `main` update requires explicit appropriately scoped approval. GOV-001, DEC-001, DEC-002 and applicable limited preview controls still apply.