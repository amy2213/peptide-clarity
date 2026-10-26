# QA-007 | Peptide Clarity v0.6.1: search and browse repair

**Date:** 2026-10-24  
**Status:** Internal functional QA of a publicly viewable owner-testing prototype. Not G7 public product release or independent scientific review.  
**Authority:** GOV-001, DEC-002 owner-led testing, DEC-003 limited public prototype update.

## Reported defect
Owner reports that the peptide search and “View all / Browse all” feature are not functioning. There are two overlapping causes:

1. **Deployment mismatch:** GitHub Pages `main` still served v0.5, which never contained the v0.6 autocomplete/browse functionality. v0.6 existed only on an unmerged GitHub draft branch and in a local HTML review copy. Refreshing the live page cannot reveal unmerged features.
2. **Interaction and discoverability defects in the v0.6 draft:** Browse button rendered after the first nine cards. Expanding inserted 75 more cards before the button, moving its location and giving the impression that nothing happened. Closing the autocomplete panel on `pointerdown` could shift content before `click` fired, dropping intended taps on controls below it. Partial text submission also selected the first matching substance, even when multiple choices existed.

## v0.6.1 changes
- Move the browse button **above** the catalogue and announce a visible count: nine featured or all 84 searchable names.
- Make autocomplete an in-page, scrollable panel directly after the search form, preventing overlay of other controls.
- Close suggestions after a completed outside click rather than on pointerdown, so taps on the browse control are not lost to mid-gesture layout shifts.
- Keep Browse all available after search entry; selecting Browse all clears the query and displays all names, and Show featured collapses back to nine.
- Add a **Clear** search control.
- Submit precise names or aliases directly, but **do not automatically choose the first match** when the user submits an ambiguous fragment. Show matching choices instead.
- Preserve the existing FDA vs supplier distinction, review notices, `noindex` tag, and all 84 catalog/source records unchanged.

## Tests completed
Programmatic Chromium checks on desktop 1280×820 and iPhone-sized 390×844 touch viewport:
- Initial nine cards, Browse all expands to **84**, correct `aria-expanded` and status text, collapses to nine.
- Search `sem` gives 3 suggestions and filters result cards; ambiguous Search stays on the homepage with choice prompt.
- Select Semax from suggestions; submit aliases `ss31` and `bpc157` to the expected profiles.
- Clear resets the query/results and Browse all remains clickable after autocomplete was opened.
- Browse all while a query is active clears the search and reveals all 84 names.
- Exact company search opens Protide Health dossier; existing comparison renders.
- Zero uncaught page JS errors; no horizontal document overflow at either test size.
- Node.js `--check` passed for inline application script.
- **Embedded research JSON exact SHA-256 unchanged**: `fdde7cc9b4ad558c0f1586b8c86b1db298d3a225db41af52d9d8b52c5d07b499`.

**Limitations:** Browser harness used `set_content` because file and localhost navigation are blocked. Automated Chromium responsive checks are not real iOS Safari/VoiceOver verification and do not prove a GitHub Pages deployment has propagated. No new source/medical assertions or supplier authentication were introduced by the repair.

## Remaining owner checks
On real iPhone Safari using deployed GitHub Pages: verify suggestion selection, Scroll and Browse all operation, company search, and comparison; test VoiceOver and keyboard later. Screenshot evidence and final owner sign-off remain pending.