# GitHub Pages setup and release checklist

## One-time repository setup (GitHub account `amy2213`)
1. Visit https://github.com/new and create a new repository named `peptide-clarity`.
2. Prefer **Private** during internal preparation. On GitHub Free, private repositories do not qualify for GitHub Pages; a public repository is needed for no-cost Pages hosting. A public repository makes source code accessible to everyone.
3. Upload `index.html`, `.nojekyll`, `robots.txt`, `README.md`, and this checklist to the repository root. **GitHub's Upload files interface does not automatically unpack a ZIP.**
4. Keep GitHub Pages **disabled** until the owner explicitly authorizes publication under GOV-001 G7, or records a bounded preview-publication exception with appropriate review and limitations.

## When publication is explicitly authorized
5. If needed for the account plan, change repository visibility to **Public** only after confirming the files do not include secrets or private information.
6. Open repository **Settings → Pages → Build and deployment**.
7. Choose **Deploy from a branch**, branch **main**, folder **/(root)**, and **Save**.
8. GitHub will build the site. The expected project site URL is https://amy2213.github.io/peptide-clarity/ . **It is not live until Pages confirms success.**
9. Confirm HTTPS, mobile navigation, source links, Notes, JSON export, no browser errors, and conspicuous development labels. Do not claim expert review completed.
10. Log publication date, reviewed commit, owner decision, known limitations, and a rollback approach. Ensure correction and incident contacts are defined before public product release.

## Why public URL ≠ private preview
GitHub Pages sites are public by default even when the repository is private; `robots.txt` and `noindex` are *not* security controls. Avoid using Pages for confidential internal content. GitHub Pages does not provide a backend database or user authentication for this prototype.

Sources:
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/quickstart