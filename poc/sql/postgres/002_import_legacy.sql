-- POC-001: run after 001 in a disposable PostgreSQL 17 database.
-- The GitHub Actions Docker psql client mounts the repo at /work (no production data).
-- Read JSON as CSV with control-character quote and TAB delimiter: this fixture is one line,
-- contains no tabs/control-2, so JSON quotation and backslashes are preserved.
\set ON_ERROR_STOP on
BEGIN;
CREATE TEMP TABLE import_payload (raw_text text NOT NULL);
\copy import_payload(raw_text) FROM '/work/poc/fixtures/researchData.v091.json' WITH (FORMAT csv, DELIMITER E'\t', QUOTE E'\x02', ESCAPE E'\x02')
CREATE TEMP TABLE parsed_payload AS
  SELECT raw_text, raw_text::jsonb AS doc FROM import_payload;

INSERT INTO poc.snapshots(id,meta_json,validation_json,record_counts_json,original_raw_text,original_sha256)
SELECT 'v0.9.1', doc->'meta',doc->'validation',doc->'record_counts',raw_text,encode(sha256(convert_to(raw_text,'UTF8')),'hex')
FROM parsed_payload
ON CONFLICT (id) DO NOTHING;

INSERT INTO poc.source_records(id,title,publisher_raw,kind_raw,url,published_raw,raw_json)
SELECT x->>'id',x->>'title',x->>'publisher',x->>'kind',x->>'url',x->>'published',x
FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'sources') x
ON CONFLICT(id) DO NOTHING;

INSERT INTO poc.substances(id,name,group_raw,category_raw,category_type_raw,profile_stage_raw,expert_reviewed_raw,plain_english_json,raw_json)
SELECT x->>'id',x->>'name',x->>'catalogueGroup',x->>'category',x->>'categoryType',x->>'profileStage',
 (x->>'expertReviewed')::boolean,x->'plainEnglish',x
FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'compounds') x
ON CONFLICT(id) DO NOTHING;

INSERT INTO poc.aliases(substance_id,ordinal,name)
SELECT x->>'id',(a.ordinal-1)::integer,a.value
FROM parsed_payload p
CROSS JOIN LATERAL jsonb_array_elements(p.doc->'compounds') x
CROSS JOIN LATERAL jsonb_array_elements_text(x->'aliases') WITH ORDINALITY AS a(value,ordinal)
ON CONFLICT(substance_id,ordinal) DO NOTHING;

INSERT INTO poc.claims(id,substance_id,kind_raw,title,claim_text,review_raw,raw_json)
SELECT c->>'id',s->>'id',c->>'type',c->>'title',c->>'text',c->>'review',c
FROM parsed_payload p
CROSS JOIN LATERAL jsonb_array_elements(p.doc->'compounds') s
CROSS JOIN LATERAL jsonb_array_elements(s->'claims') c
ON CONFLICT(id) DO NOTHING;

INSERT INTO poc.claim_sources(claim_id,source_id)
SELECT c->>'id',cit.value
FROM parsed_payload p
CROSS JOIN LATERAL jsonb_array_elements(p.doc->'compounds') s
CROSS JOIN LATERAL jsonb_array_elements(s->'claims') c
CROSS JOIN LATERAL jsonb_array_elements_text(c->'sources') AS cit(value)
ON CONFLICT(claim_id,source_id) DO NOTHING;

INSERT INTO poc.companies(id,name,domain,observed_raw,review_raw,raw_json)
SELECT x->>'id',x->>'name',x->>'domain',x->>'observed',x->>'reviewStatus',x
FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'companies') x
ON CONFLICT(id) DO NOTHING;

INSERT INTO poc.company_fields(company_id,ordinal,label,value_raw,note_raw,source_url)
SELECT x->>'id',(item.ordinal-1)::integer,item.value->>0,item.value->>1,item.value->>2,item.value->>3
FROM parsed_payload p
CROSS JOIN LATERAL jsonb_array_elements(p.doc->'companies') x
CROSS JOIN LATERAL jsonb_array_elements(x->'fields') WITH ORDINALITY AS item(value,ordinal)
ON CONFLICT(company_id,ordinal) DO NOTHING;

INSERT INTO poc.reported_lot_groups(company_id,lot_token,identity_status)
SELECT DISTINCT x->>'company',x->>'lot','unverified'
FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'lots') x
ON CONFLICT(company_id,lot_token) DO NOTHING;

INSERT INTO poc.lot_associations(id,group_id,company_id,substance_id,source_id,report_source_id,reported_purity,issuer_authenticated_raw,custody_verified_raw,report_url,raw_json)
SELECT x->>'id',g.id,x->>'company',x->>'compound',x->>'sourceId',x->>'reportSourceId',
 (x->>'reportedPurityPct')::numeric,(x->>'issuerAuthenticated')::boolean,
 (x->>'sampleCustodyVerified')::boolean,x->>'reportURL',x
FROM parsed_payload p
CROSS JOIN LATERAL jsonb_array_elements(p.doc->'lots') x
JOIN poc.reported_lot_groups g ON g.company_id=x->>'company' AND g.lot_token=x->>'lot'
ON CONFLICT(id) DO NOTHING;

INSERT INTO poc.evidence_issues(id,company_id,source_id,status,raw_json)
SELECT x->>'id',x->>'company',x->>'sourceId',x->>'status',x
FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'issues') x
ON CONFLICT(id) DO NOTHING;

-- Lossless source objects: raw JSONB plus hash; exact original bytes kept in snapshots.
WITH records(collection,legacy_id,raw_obj) AS (
  SELECT 'sources',x->>'id',x FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'sources') x
  UNION ALL SELECT 'compounds',x->>'id',x FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'compounds') x
  UNION ALL SELECT 'claims',c->>'id',c FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'compounds') s CROSS JOIN LATERAL jsonb_array_elements(s->'claims') c
  UNION ALL SELECT 'companies',x->>'id',x FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'companies') x
  UNION ALL SELECT 'lots',x->>'id',x FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'lots') x
  UNION ALL SELECT 'issues',x->>'id',x FROM parsed_payload p CROSS JOIN LATERAL jsonb_array_elements(p.doc->'issues') x
  UNION ALL SELECT 'meta','meta',p.doc->'meta' FROM parsed_payload p
  UNION ALL SELECT 'validation','validation',p.doc->'validation' FROM parsed_payload p
  UNION ALL SELECT 'record_counts','record_counts',p.doc->'record_counts' FROM parsed_payload p
)
INSERT INTO poc.raw_import_records(collection,legacy_id,raw_json,sha256)
SELECT collection,legacy_id,raw_obj,encode(sha256(convert_to(raw_obj::text,'UTF8')),'hex') FROM records
ON CONFLICT(collection,legacy_id) DO NOTHING;

COMMIT;
