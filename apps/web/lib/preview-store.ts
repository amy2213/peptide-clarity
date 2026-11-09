import pg from "pg";

const { Pool } = pg;
const snapshotId = "v091-internal-owner-preview";
let instance: pg.Pool | undefined;

function pool(): pg.Pool {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing");
  if (!instance) {
    instance = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      connectionTimeoutMillis: 3500,
      idleTimeoutMillis: 15000,
      statement_timeout: 4000,
      application_name: "peptide_clarity_owner_preview",
    });
  }
  return instance;
}

// The connection user must inherit pc_preview_reader only: no source-table reads, no writes.
export async function listSubstances(search: string, limit: number, offset: number) {
  const rows = await pool().query(
    `SELECT id,name,group_raw AS "group",summary_raw AS "plainEnglishDraft",
      profile_stage_raw AS "profileStage",source_count AS "sourceCount",
      review_state AS "reviewState"
     FROM pc_preview.substances
     WHERE snapshot_id=$1 AND
      ($2='' OR POSITION(LOWER($2) IN LOWER(name))>0 OR POSITION(LOWER($2) IN LOWER(id))>0)
     ORDER BY name,id LIMIT $3 OFFSET $4`,
    [snapshotId, search, limit, offset],
  );
  return { snapshotId, reviewNotice: "Owner testing only. Draft information is not independently verified.",
    items: rows.rows, limit, offset };
}

export async function findSubstance(id: string) {
  const r = await pool().query(
    `SELECT id,name,group_raw AS "group",summary_raw AS "plainEnglishDraft",
       profile_stage_raw AS "profileStage",review_state AS "reviewState"
     FROM pc_preview.substances WHERE snapshot_id=$1 AND id=$2`,
    [snapshotId,id],
  );
  if (!r.rows[0]) return null;
  const claims = await pool().query(
    `SELECT id,claim_title AS "title",claim_text AS "text",
       source_refs AS "sources",review_state AS "reviewState"
     FROM pc_preview.claims WHERE snapshot_id=$1 AND substance_id=$2 ORDER BY id`,
    [snapshotId,id],
  );
  return { snapshotId, substance:r.rows[0], claims:claims.rows,
    regulatoryStatus:"not_verified_for_any_specific_product",
    reviewNotice:"Draft science and source links do not establish medication approval or human-use safety." };
}

export async function listCompanies(limit: number, offset: number) {
  const r = await pool().query(
    `SELECT id,name,domain,source_observed_at_raw AS "observedRaw",
     review_state AS "reviewState"
     FROM pc_preview.companies WHERE snapshot_id=$1 ORDER BY name,id LIMIT $2 OFFSET $3`,
    [snapshotId,limit,offset],
  );
  return {snapshotId,items:r.rows,limit,offset,
    reviewNotice:"Research company evidence directory. No supplier is certified as safe for human use."};
}

export async function findCompany(id: string) {
  const r=await pool().query(
    `SELECT id,name,domain,source_observed_at_raw AS "observedRaw",
      review_state AS "reviewState" FROM pc_preview.companies
      WHERE snapshot_id=$1 AND id=$2`,[snapshotId,id]);
  if(!r.rows[0])return null;
  const [lots,issues]=await Promise.all([
    pool().query(
      `SELECT id,substance_id AS "substanceId",reported_lot_token AS "reportedLot",
        reported_purity AS "reportedPurity",issuer_authenticated AS "issuerAuthenticated",
        custody_verified AS "custodyVerified",document_url AS "documentUrl",
        source_id AS "sourceId",verification_statement AS "verificationStatement"
      FROM pc_preview.lot_observations WHERE snapshot_id=$1 AND company_id=$2 ORDER BY id`,
      [snapshotId,id]),
    pool().query(
      `SELECT id,issue_status_raw AS "status",issue_summary_raw AS "summary"
       FROM pc_preview.evidence_issues WHERE snapshot_id=$1 AND company_id=$2 ORDER BY id`,
      [snapshotId,id]),
  ]);
  return {snapshotId,company:r.rows[0],lotObservations:lots.rows,evidenceIssues:issues.rows,
    reviewNotice:"Seller-reported lots are provisional. Purity does not establish sterility, identity or human-use safety."};
}

export async function snapshotHealth() {
  const r=await pool().query(
    `SELECT id,scope_note AS "scopeNote",owner_preview_enabled AS "ownerEnabled",
       public_approved AS "publicApproved"
     FROM pc_preview.snapshots WHERE id=$1`,[snapshotId]);
  return {snapshot: r.rows[0] ?? null, releaseClass:"owner_testing_only"};
}
