# Peptide Clarity v0.8 | Experience redesign

**Status:** Owner-led design-review preview, not approved public health-information release.
**Research snapshot:** v0.7 dataset, October 25, 2026, unchanged scientific, supplier and lot records.
**UI build:** October 27, 2026.

## Why this version exists
The owner reported that v0.7 was hard to navigate, hard to understand, and did not feel professionally designed. The intention is to replace the researcher-facing feel with a clear, trusted, approachable information site. Research standards remain intact, but the visitor sees plain language first and sources underneath.

## Key changes
- Clean, responsive editorial visual system with restrained teal, warm neutrals, professional type, and more white space.
- Short, search-first homepage plus three obvious entry points: **Explore**, **Compare**, **COA guide**.
- 84-name autocomplete with alias support and keyboard use, filtered library, working **Browse all**.
- 13 source-linked profiles (8 with expanded plain-English summaries), and 71 indexed entries clearly labeled **Research pending**.
- One profile view: short answer, why people care, what's unknown, source-linked findings, tappable explanations, then company documents.
- Company evidence pages and responsive 3-company comparisons by compound without numeric trust/safety ratings.
- Interactive, synthetic COA terminology guide; no upload, health advice or dosing.
- Mobile bottom navigation and responsive cards; no horizontal overflow at tested 390px width.

## Source/provenance preservation
Original arrays for `compounds`, `sources`, `companies`, `lots`, `validation`, and `issues` were parsed and compared with the embedded JSON in `index.html`; all match the source v0.7 dataset exactly. The only dataset modifications in the build script are UI-only metadata fields. No claims were added or upgraded, no supplier safety conclusion asserted, and no source-status labels relabeled as independent verification.

## Important limitations
- The preview path is **publicly accessible** when hosted on GitHub Pages. `noindex` and `robots.txt` discourage indexing, not access; no personal or confidential information should be entered.
- No independent medical, scientific/analytical or regulatory/legal peer review has been completed. Owner-only usability evaluation is N=1 under DEC-002.
- No laboratory issuer independently confirmed and no seller/lot custody independently validated. Supplier sites are linked as evidence sources, not purchasing recommendations.
- All 84 names are navigable, but only 13 have source-linked claim summaries. Missing profiles do not imply lack of scientific research elsewhere.
- GOV-001, PDP v1.0, G7 launch review remain applicable. This is a **controlled owner testing preview**, not a release-approved product.

## Product next step
Collect the owner's concrete mobile navigation feedback, revise the information hierarchy, then separately plan scientific editorial verification, accessibility/security audit, proper correction workflows and eventual launch gate. Do not merge this draft to the main landing page solely because the preview displays correctly.