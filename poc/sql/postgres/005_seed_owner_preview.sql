-- G3-SEC-001: deliberately staged, owner-preview-only projection from legacy source.
-- This script is a controlled manual test seed, NOT a scheduled ingestion/publish pathway.
\set ON_ERROR_STOP on
BEGIN;
INSERT INTO pc_preview.snapshots(id,owner_preview_enabled,public_approved,scope_note)
VALUES ('v091-internal-owner-preview',false,false,
  'Owner testing only; all imported scientific and supplier content is provisional/unverified')
ON CONFLICT(id) DO NOTHING;

INSERT INTO pc_preview.substances(snapshot_id,id,name,group_raw,summary_raw,profile_stage_raw,source_count)
SELECT 'v091-internal-owner-preview', s.id, s.name,s.group_raw,
 COALESCE(NULLIF(s.plain_english_json->>'simple',''),s.raw_json->>'summary'),
 s.profile_stage_raw,
 (SELECT count(DISTINCT cs.source_id) FROM poc.claims c
  JOIN poc.claim_sources cs ON cs.claim_id=c.id WHERE c.substance_id=s.id)
FROM poc.substances s
ON CONFLICT(snapshot_id,id) DO NOTHING;

INSERT INTO pc_preview.claims(snapshot_id,id,substance_id,claim_title,claim_text,source_refs)
SELECT 'v091-internal-owner-preview',c.id,c.substance_id,c.title,c.claim_text,
  COALESCE((
    SELECT jsonb_agg(jsonb_build_object('id',src.id,'title',src.title,'url',src.url,
      'publishedRaw',src.published_raw) ORDER BY src.id)
    FROM poc.claim_sources cs JOIN poc.source_records src ON src.id=cs.source_id
    WHERE cs.claim_id=c.id
  ),'[]'::jsonb)
FROM poc.claims c
ON CONFLICT(snapshot_id,id) DO NOTHING;

INSERT INTO pc_preview.companies(snapshot_id,id,name,domain,source_observed_at_raw)
SELECT 'v091-internal-owner-preview', c.id,c.name,c.domain,c.observed_raw FROM poc.companies c
ON CONFLICT(snapshot_id,id) DO NOTHING;

INSERT INTO pc_preview.lot_observations(snapshot_id,id,company_id,substance_id,reported_lot_token,
  reported_purity,issuer_authenticated,custody_verified,document_url,source_id)
SELECT 'v091-internal-owner-preview', l.id,l.company_id,l.substance_id,g.lot_token,
  l.reported_purity,l.issuer_authenticated_raw,l.custody_verified_raw,l.report_url,l.source_id
FROM poc.lot_associations l JOIN poc.reported_lot_groups g ON g.id=l.group_id
ON CONFLICT(snapshot_id,id) DO NOTHING;

INSERT INTO pc_preview.evidence_issues(snapshot_id,id,company_id,issue_status_raw,issue_summary_raw)
SELECT 'v091-internal-owner-preview',i.id,i.company_id,i.status,i.raw_json->>'summary'
FROM poc.evidence_issues i
ON CONFLICT(snapshot_id,id) DO NOTHING;

-- A deliberate owner-preview test activation in the disposable test database.
-- Not a medical/public release; this action should later be recorded in an approval service.
UPDATE pc_preview.snapshots SET owner_preview_enabled=true
WHERE id='v091-internal-owner-preview' AND public_approved=false;
COMMIT;
