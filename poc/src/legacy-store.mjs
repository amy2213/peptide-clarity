// POC-001: ephemeral relational proof of concept using Node 22's built-in SQLite.
// This exercises data-shape and FK logic. PostgreSQL / Supabase verification is NOT claimed.
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';

const ddl = [
  "PRAGMA foreign_keys = ON",
  "CREATE TABLE IF NOT EXISTS snapshots (id TEXT PRIMARY KEY, meta_json TEXT NOT NULL, validation_json TEXT NOT NULL, record_counts_json TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS source_records (id TEXT PRIMARY KEY, title TEXT NOT NULL, publisher_raw TEXT NOT NULL, kind_raw TEXT NOT NULL, url TEXT, published_raw TEXT, raw_json TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS substances (id TEXT PRIMARY KEY, name TEXT NOT NULL, group_raw TEXT, category_raw TEXT, category_type_raw TEXT, profile_stage_raw TEXT, expert_reviewed_raw INTEGER, plain_english_json TEXT, raw_json TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS aliases (substance_id TEXT NOT NULL REFERENCES substances(id), ordinal INTEGER NOT NULL, name TEXT NOT NULL, PRIMARY KEY(substance_id, ordinal))",
  "CREATE TABLE IF NOT EXISTS claims (id TEXT PRIMARY KEY, substance_id TEXT NOT NULL REFERENCES substances(id), kind_raw TEXT, title TEXT, claim_text TEXT, review_raw TEXT, raw_json TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS claim_sources (claim_id TEXT NOT NULL REFERENCES claims(id), source_id TEXT NOT NULL REFERENCES source_records(id), PRIMARY KEY(claim_id, source_id))",
  "CREATE TABLE IF NOT EXISTS companies (id TEXT PRIMARY KEY, name TEXT NOT NULL, domain TEXT, observed_raw TEXT, review_raw TEXT, raw_json TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS company_fields (company_id TEXT NOT NULL REFERENCES companies(id), ordinal INTEGER NOT NULL, label TEXT NOT NULL, value_raw TEXT, note_raw TEXT, source_url TEXT, PRIMARY KEY(company_id, ordinal))",
  "CREATE TABLE IF NOT EXISTS reported_lot_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, company_id TEXT NOT NULL REFERENCES companies(id), lot_token TEXT NOT NULL, identity_status TEXT NOT NULL DEFAULT 'unverified', UNIQUE(company_id, lot_token))",
  "CREATE TABLE IF NOT EXISTS lot_associations (id TEXT PRIMARY KEY, group_id INTEGER NOT NULL REFERENCES reported_lot_groups(id), company_id TEXT NOT NULL REFERENCES companies(id), substance_id TEXT NOT NULL REFERENCES substances(id), source_id TEXT NOT NULL REFERENCES source_records(id), report_source_id TEXT REFERENCES source_records(id), reported_purity REAL, issuer_authenticated_raw INTEGER NOT NULL, custody_verified_raw INTEGER NOT NULL, report_url TEXT, raw_json TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS evidence_issues (id TEXT PRIMARY KEY, company_id TEXT NOT NULL REFERENCES companies(id), source_id TEXT REFERENCES source_records(id), status TEXT NOT NULL, raw_json TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS product_records (id TEXT PRIMARY KEY, ingredient_substance_id TEXT NOT NULL REFERENCES substances(id), product_kind TEXT NOT NULL CHECK(product_kind IN ('fda_approved_medicine', 'compounded_preparation', 'research_listing')), approval_status TEXT NOT NULL CHECK(approval_status IN ('approved', 'not_approved', 'unknown')), authority TEXT, application_number TEXT, source_id TEXT REFERENCES source_records(id), reviewed_at TEXT, CHECK(product_kind != 'fda_approved_medicine' OR (approval_status='approved' AND authority IS NOT NULL AND application_number IS NOT NULL AND source_id IS NOT NULL AND reviewed_at IS NOT NULL)), CHECK(product_kind != 'compounded_preparation' OR approval_status != 'approved'))",
  "CREATE TABLE IF NOT EXISTS pharmacy_license_observations (id TEXT PRIMARY KEY, company_id TEXT NOT NULL REFERENCES companies(id), jurisdiction TEXT NOT NULL, status TEXT NOT NULL, checked_at TEXT, source_id TEXT REFERENCES source_records(id), CHECK(status != 'verified_active' OR (checked_at IS NOT NULL AND source_id IS NOT NULL)))",
  "CREATE TABLE IF NOT EXISTS verification_events (id TEXT PRIMARY KEY, subject_id TEXT NOT NULL, verification_type TEXT NOT NULL, outcome TEXT NOT NULL, reviewed_at TEXT NOT NULL, evidence_source_id TEXT NOT NULL REFERENCES source_records(id))",
  "CREATE TABLE IF NOT EXISTS raw_import_records (collection TEXT NOT NULL, legacy_id TEXT NOT NULL, raw_json TEXT NOT NULL, sha256 TEXT NOT NULL, PRIMARY KEY(collection, legacy_id))"
];

const digest = (x) => createHash('sha256').update(x).digest('hex');
const stableRaw = (obj) => JSON.stringify(obj);

export function createDatabase() {
  const db = new DatabaseSync(':memory:');
  for (const sql of ddl) db.exec(sql);
  return db;
}

export function importLegacy(db, input) {
  // All rows in one transaction. A rejected orphan rolls back the entire import.
  db.exec('BEGIN');
  try {
    const storeRaw = db.prepare('INSERT OR IGNORE INTO raw_import_records (collection,legacy_id,raw_json,sha256) VALUES (?,?,?,?)');
    const checkRaw = db.prepare('SELECT raw_json FROM raw_import_records WHERE collection=? AND legacy_id=?');
    const raw = (collection,id,obj) => {
      const json=stableRaw(obj);
      storeRaw.run(collection,id,json,digest(json));
      if (checkRaw.get(collection,id).raw_json !== json) throw Error('Changed raw record: '+collection+'/'+id);
    };
    raw('meta','meta',input.meta);
    raw('validation','validation',input.validation);
    raw('record_counts','record_counts',input.record_counts);
    db.prepare('INSERT OR IGNORE INTO snapshots(id,meta_json,validation_json,record_counts_json) VALUES (?,?,?,?)').run('v0.9.1',stableRaw(input.meta),stableRaw(input.validation),stableRaw(input.record_counts));

    const source = db.prepare('INSERT OR IGNORE INTO source_records(id,title,publisher_raw,kind_raw,url,published_raw,raw_json) VALUES (?,?,?,?,?,?,?)');
    for (const x of input.sources) {
      raw('sources',x.id,x);
      source.run(x.id,x.title,x.publisher,x.kind,x.url ?? null,x.published ?? null,stableRaw(x));
    }
    const substance=db.prepare('INSERT OR IGNORE INTO substances(id,name,group_raw,category_raw,category_type_raw,profile_stage_raw,expert_reviewed_raw,plain_english_json,raw_json) VALUES (?,?,?,?,?,?,?,?,?)');
    const alias=db.prepare('INSERT OR IGNORE INTO aliases(substance_id,ordinal,name) VALUES (?,?,?)');
    for (const x of input.compounds) {
      raw('compounds',x.id,x);
      substance.run(x.id,x.name,x.catalogueGroup ?? null,x.category ?? null,x.categoryType ?? null,x.profileStage ?? null,x.expertReviewed == null ? null : Number(x.expertReviewed),x.plainEnglish == null ? null : stableRaw(x.plainEnglish),stableRaw(x));
      for (const [i,name] of (x.aliases ?? []).entries()) alias.run(x.id,i,name);
    }
    const claim=db.prepare('INSERT OR IGNORE INTO claims(id,substance_id,kind_raw,title,claim_text,review_raw,raw_json) VALUES (?,?,?,?,?,?,?)');
    const cite=db.prepare('INSERT OR IGNORE INTO claim_sources(claim_id,source_id) VALUES (?,?)');
    for (const x of input.compounds) for (const c of x.claims ?? []) {
      raw('claims',c.id,c);
      claim.run(c.id,x.id,c.type ?? null,c.title ?? null,c.text ?? null,c.review ?? null,stableRaw(c));
      for (const s of c.sources ?? []) cite.run(c.id,s);
    }
    const company=db.prepare('INSERT OR IGNORE INTO companies(id,name,domain,observed_raw,review_raw,raw_json) VALUES (?,?,?,?,?,?)');
    const field=db.prepare('INSERT OR IGNORE INTO company_fields(company_id,ordinal,label,value_raw,note_raw,source_url) VALUES (?,?,?,?,?,?)');
    for (const x of input.companies) {
      raw('companies',x.id,x);
      company.run(x.id,x.name,x.domain ?? null,x.observed ?? null,x.reviewStatus ?? null,stableRaw(x));
      for (const [i,tuple] of x.fields.entries()) field.run(x.id,i,tuple[0],tuple[1] ?? null,tuple[2] ?? null,tuple[3] ?? null);
    }
    const group=db.prepare("INSERT OR IGNORE INTO reported_lot_groups(company_id,lot_token,identity_status) VALUES (?,?,'unverified')");
    const groupGet=db.prepare('SELECT id FROM reported_lot_groups WHERE company_id=? AND lot_token=?');
    const association=db.prepare('INSERT OR IGNORE INTO lot_associations(id,group_id,company_id,substance_id,source_id,report_source_id,reported_purity,issuer_authenticated_raw,custody_verified_raw,report_url,raw_json) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
    for (const x of input.lots) {
      raw('lots',x.id,x);
      group.run(x.company,x.lot);
      const groupId=groupGet.get(x.company,x.lot).id;
      association.run(x.id,groupId,x.company,x.compound,x.sourceId,x.reportSourceId ?? null,x.reportedPurityPct ?? null,Number(x.issuerAuthenticated),Number(x.sampleCustodyVerified),x.reportURL ?? null,stableRaw(x));
    }
    const issue=db.prepare('INSERT OR IGNORE INTO evidence_issues(id,company_id,source_id,status,raw_json) VALUES (?,?,?,?,?)');
    for(const x of input.issues) {
      raw('issues',x.id,x);
      issue.run(x.id,x.company,x.sourceId ?? null,x.status,stableRaw(x));
    }
    db.exec('COMMIT');
  } catch(e) {
    db.exec('ROLLBACK');
    throw e;
  }
  return reconciliation(db);
}

const n=(db,t)=>db.prepare('SELECT COUNT(*) AS n FROM '+t).get().n;

export function reconciliation(db) {
  return {
    substances:n(db,'substances'),aliases:n(db,'aliases'),sources:n(db,'source_records'),
    claims:n(db,'claims'),claimSourceLinks:n(db,'claim_sources'),
    companies:n(db,'companies'),companyFields:n(db,'company_fields'),
    lotGroups:n(db,'reported_lot_groups'),lotAssociations:n(db,'lot_associations'),
    issues:n(db,'evidence_issues'),productRecords:n(db,'product_records'),
    verificationEvents:n(db,'verification_events'),rawRecords:n(db,'raw_import_records')
  };
}

export function getSubstanceEvidence(db,id){
  const substance=db.prepare('SELECT id,name,category_type_raw FROM substances WHERE id=?').get(id);
  if(!substance)return null;
  const claims=db.prepare('SELECT c.id,c.title,c.claim_text,s.id AS source_id,s.url,s.published_raw FROM claims c JOIN claim_sources cs ON cs.claim_id=c.id JOIN source_records s ON s.id=cs.source_id WHERE c.substance_id=? ORDER BY c.id,s.id').all(id);
  const products=db.prepare('SELECT * FROM product_records WHERE ingredient_substance_id=?').all(id);
  return {substance,claims,products};
}

export function getCompanyLotEvidence(db,id){
  const company=db.prepare('SELECT id,name FROM companies WHERE id=?').get(id);
  if(!company)return null;
  const lots=db.prepare('SELECT a.id,a.substance_id,g.lot_token,g.identity_status,a.reported_purity,a.issuer_authenticated_raw,a.custody_verified_raw,a.report_url,s.url AS vendor_source FROM lot_associations a JOIN reported_lot_groups g ON g.id=a.group_id JOIN source_records s ON s.id=a.source_id WHERE a.company_id=? ORDER BY a.id').all(id);
  return {company,lots};
}
