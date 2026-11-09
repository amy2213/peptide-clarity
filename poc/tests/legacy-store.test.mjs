// POC-001 regression and negative tests for the isolated relational data model.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createDatabase, importLegacy, reconciliation, getSubstanceEvidence, getCompanyLotEvidence } from '../src/legacy-store.mjs';

const original=JSON.parse(readFileSync(new URL('../fixtures/researchData.v091.json',import.meta.url),'utf8'));
const seeded=()=>{const db=createDatabase();const count=importLegacy(db,original);return {db,count};};

test('M01/M02/M03: all source entities and aliases reconcile',()=>{
  const {db,count}=seeded();
  assert.equal(count.substances,84);
  assert.equal(count.aliases,104);
  assert.equal(count.sources,41);
  assert.equal(count.claims,37);
  assert.equal(count.companies,5);
  assert.equal(count.companyFields,45);
  assert.equal(count.issues,5);
  assert.equal(count.rawRecords,84+41+37+5+15+5+3);
  assert.equal(db.prepare('PRAGMA foreign_key_check').all().length,0);
});

test('M04/M05/M06: preserve all lot associations, only provisional group them by code',()=>{
  const {db,count}=seeded();
  assert.equal(count.lotAssociations,15);
  assert.equal(count.lotGroups,14);
  const blends=db.prepare("SELECT a.id,a.substance_id,g.identity_status FROM lot_associations a JOIN reported_lot_groups g ON g.id=a.group_id WHERE g.company_id='polaris' AND g.lot_token='POL-GLOW50-2' ORDER BY a.id").all();
  assert.equal(blends.length,2);
  assert.deepEqual(blends.map(x=>x.substance_id).sort(),['bpc-157','ghk-cu']);
  assert.ok(blends.every(x=>x.identity_status==='unverified'));
});

test('M09/M13/D05: vendor COA claims remain unauthenticated, do not create verification events',()=>{
  const {db,count}=seeded();
  const particle=getCompanyLotEvidence(db,'particle');
  const withReport=particle.lots.find(x=>x.id==='LOT-PAR-BPC-2026346');
  assert.ok(withReport);
  assert.equal(withReport.reported_purity,99.2);
  assert.equal(withReport.issuer_authenticated_raw,0);
  assert.equal(withReport.custody_verified_raw,0);
  assert.ok(withReport.report_url.startsWith('https://'));
  assert.equal(count.verificationEvents,0);
  assert.equal(db.prepare('SELECT count(*) n FROM lot_associations WHERE issuer_authenticated_raw=1 OR custody_verified_raw=1').get().n,0);
});

test('M08: free-text publication dates remain raw; not invented into parsed timestamps',()=>{
  const {db}=seeded();
  assert.equal(db.prepare("SELECT published_raw FROM source_records WHERE id='SRC-001'").get().published_raw,'Live advisory; date not independently checked');
});

test('M10/D01/D03: compound status never creates an FDA approval; separate product validation enforced',()=>{
  const {db,count}=seeded();
  assert.equal(count.productRecords,0);
  assert.ok(getSubstanceEvidence(db,'semaglutide').substance.category_type_raw==='approved');
  assert.equal(getSubstanceEvidence(db,'semaglutide').products.length,0);
  const add=db.prepare('INSERT INTO product_records(id,ingredient_substance_id,product_kind,approval_status,authority,application_number,source_id,reviewed_at) VALUES(?,?,?,?,?,?,?,?)');
  assert.throws(()=>add.run('invalid-approved','semaglutide','fda_approved_medicine','approved',null,null,null,null));
  assert.throws(()=>add.run('invalid-compounded','semaglutide','compounded_preparation','approved',null,null,null,null));
  add.run('SYNTHETIC-APPROVED','semaglutide','fda_approved_medicine','approved','SYNTHETIC TEST AUTHORITY','SYNTHETIC-NUMBER','SRC-001','2026-11-08');
  add.run('SYNTHETIC-COMPOUNDED','semaglutide','compounded_preparation','not_approved',null,null,null,null);
  assert.equal(getSubstanceEvidence(db,'semaglutide').products.length,2);
  assert.equal(db.prepare("SELECT approval_status FROM product_records WHERE id='SYNTHETIC-COMPOUNDED'").get().approval_status,'not_approved');
});

test('M03/P05: scientific evidence joins its actual linked source IDs',()=>{
  const {db}=seeded();
  const result=getSubstanceEvidence(db,'tirzepatide');
  assert.ok(result.claims.length>=3);
  assert.ok(result.claims.every(x=>x.source_id&&x.url));
  const unique=new Set(result.claims.map(x=>x.id));
  assert.ok(unique.has('CL-004'));
  assert.equal(db.prepare('PRAGMA foreign_key_check').all().length,0);
});

test('M07: a missing claim source rejects the transaction, leaves the database empty',()=>{
  const corrupt=structuredClone(original);
  corrupt.compounds[0].claims[0].sources.push('SRC-NOT-REAL');
  const db=createDatabase();
  assert.throws(()=>importLegacy(db,corrupt),/FOREIGN KEY constraint failed/);
  assert.equal(reconciliation(db).sources,0);
  assert.equal(reconciliation(db).substances,0);
  assert.equal(reconciliation(db).rawRecords,0);
});

test('M11: re-importing the same source does not duplicate records',()=>{
  const {db,count}=seeded();
  const twice=importLegacy(db,original);
  assert.deepEqual(twice,count);
});

test('M12: changing raw source under same legacy ID fails and rolls back safely',()=>{
  const {db,count}=seeded();
  const changed=structuredClone(original);
  changed.sources[0].title='Unreviewed changed citation';
  assert.throws(()=>importLegacy(db,changed),/Changed raw record/);
  assert.deepEqual(reconciliation(db),count);
  assert.equal(db.prepare("SELECT title FROM source_records WHERE id='SRC-001'").get().title,original.sources[0].title);
});

test('M16: unresolved evidence issues remain unresolved after import',()=>{
  const {db}=seeded();
  const rows=db.prepare('SELECT id,status FROM evidence_issues ORDER BY id').all();
  assert.equal(rows.length,5);
  assert.ok(rows.every(x=>x.status==='Unresolved'));
});

test('M15: preserve original metadata, validation and source-provided declared counts',()=>{
  const {db}=seeded();
  const row=db.prepare("SELECT raw_json FROM raw_import_records WHERE collection='validation' AND legacy_id='validation'").get();
  assert.deepEqual(JSON.parse(row.raw_json),original.validation);
});

test('S/D: reject a claimed active pharmacy license without verification date and source',()=>{
  const {db}=seeded();
  const stmt=db.prepare('INSERT INTO pharmacy_license_observations(id,company_id,jurisdiction,status,checked_at,source_id) VALUES(?,?,?,?,?,?)');
  assert.throws(()=>stmt.run('test-unknown','particle','TX','verified_active',null,null));
  stmt.run('test-uncertain','particle','TX','unknown',null,null);
  assert.equal(db.prepare('SELECT status FROM pharmacy_license_observations WHERE id=?').get('test-uncertain').status,'unknown');
});
