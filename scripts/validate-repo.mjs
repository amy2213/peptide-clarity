#!/usr/bin/env node
// Dependency-free structural regression check. NOT clinical, accessibility, or security certification.
import { readFileSync, existsSync } from 'node:fs';

const required = [
  'index.html', 'README.md', 'CONTRIBUTING.md', 'CHANGELOG.md',
  'docs/CONTROL_CENTER.md', 'docs/ENGINEERING_STANDARDS.md',
  'docs/CHANGE_REGISTER.md', 'docs/REQUIREMENTS_REGISTER.md',
  'docs/PRODUCT_SCOPE_PDP-001_v0.3_WORKING.md',
  'docs/RELEASE_HISTORY.md', 'docs/RELEASE_CHECKLIST.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
  '.github/ISSUE_TEMPLATE/feature_request.md',
  '.github/ISSUE_TEMPLATE/bug_report.md',
  '.github/workflows/validate.yml'
];
let failures = [];
const check = (ok, label) => {
  if (ok) process.stdout.write('PASS ' + label + '\n');
  else { process.stderr.write('FAIL ' + label + '\n'); failures.push(label); }
};
for (const file of required) check(existsSync(file), 'file: ' + file);
if (existsSync('index.html')) {
  const html = readFileSync('index.html', 'utf8');
  check(/<main\b[^>]*id=["']app["']/.test(html), 'main landmark');
  check(/<meta\s+name=["']robots["'][^>]*noindex/.test(html), 'owner-preview noindex notice');
  check(/OWNER-TESTING PREVIEW/.test(html), 'visible prototype warning');
  check(/function\s+(findMatches|searchComponent)\(/.test(html), 'search implementation present');
  check(/function\s+explore\(/.test(html), 'browse implementation present');
  check(/function\s+compare\(/.test(html), 'company comparison implementation present');
  check(/function\s+coa\(/.test(html), 'COA education implementation present');
  const m = html.match(/<script\b[^>]*\bid=["']researchData["'][^>]*>([\s\S]*?)<\/script>/i);
  check(Boolean(m), 'embedded research JSON located');
  if (m) {
    try {
      const data = JSON.parse(m[1]);
      check(Array.isArray(data.compounds) && data.compounds.length > 0, 'nonempty compounds');
      check(Array.isArray(data.companies), 'companies array');
      check(Array.isArray(data.lots), 'lots array');
      check(Array.isArray(data.sources), 'sources array');
      const ids = data.compounds?.map(x => x.id) ?? [];
      check(ids.length === new Set(ids).size && ids.every(Boolean), 'unique compound IDs');
      const sourceIds = new Set(data.sources?.map(x => x.id) ?? []);
      const claims = (data.compounds ?? []).flatMap(x => x.claims ?? []);
      const refsValid = claims.every(c => (c.sources ?? []).every(id => sourceIds.has(id)));
      check(refsValid, 'claim source references resolve');
      const companyIds = new Set(data.companies?.map(x => x.id) ?? []);
      check((data.lots ?? []).every(l => companyIds.has(l.company) && ids.includes(l.compound)), 'lot links resolve');
      check((data.lots ?? []).every(l => l.issuerAuthenticated !== true || l.sampleCustodyVerified !== true || (l.reportURL || l.source)), 'authenticated lot flags require document link');
    } catch (err) {
      check(false, 'research JSON parses: ' + err.message);
    }
  }
}
if (existsSync('docs/CONTROL_CENTER.md')) {
  const ctrl = readFileSync('docs/CONTROL_CENTER.md', 'utf8');
  check(/GOV-001/.test(ctrl) && /PDP-001/.test(ctrl) && /DEC-002/.test(ctrl), 'governance authority references');
}
if (failures.length) {
  process.stderr.write('\n' + failures.length + ' structural checks failed.\n');
  process.exitCode = 1;
} else {
  process.stdout.write('\nStructural checks passed. Manual/expert release checks still required.\n');
}
