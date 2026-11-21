import test from 'node:test';
import assert from 'node:assert/strict';
import { getPreviewDbConfig } from '../../apps/web/lib/db-connection.mjs';

const REF='jyzyguuukscavzqirlmv';
const good={
  PC_DATABASE_MODE:'hosted',
  DATABASE_URL:'postgresql://pc_stage_web:dummy-password@db.'+REF+'.supabase.co:5432/postgres',
};
test('OPS-S01: direct Supabase staging access is read-only user and TLS verified',()=>{
  const cfg=getPreviewDbConfig(good);
  assert.equal(cfg.user,'pc_stage_web');
  assert.equal(cfg.host,'db.'+REF+'.supabase.co');
  assert.deepEqual(cfg.ssl,{rejectUnauthorized:true});
  assert.equal(cfg.password,'dummy-password');
});
test('OPS-S02: staging pooler connection preserves exact project identity',()=>{
  const env={...good,DATABASE_URL:'postgresql://pc_stage_web.'+REF+':a-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres'};
  const cfg=getPreviewDbConfig(env);
  assert.equal(cfg.user,'pc_stage_web.'+REF);
  assert.equal(cfg.port,6543);
  assert.deepEqual(cfg.ssl,{rejectUnauthorized:true});
});
test('OPS-S03: no implicit downgrade to insecure/no-mode connections',()=>{
  assert.throws(()=>getPreviewDbConfig({...good,PC_DATABASE_MODE:undefined}),/PC_DATABASE_MODE/);
  assert.throws(()=>getPreviewDbConfig({...good,DATABASE_URL:''}),/not configured/);
  assert.throws(()=>getPreviewDbConfig({...good,DATABASE_URL:'foo'}),/Invalid/);
  assert.throws(()=>getPreviewDbConfig({...good,DATABASE_URL:'http://example.org'}),/Invalid PostgreSQL/);
  assert.throws(()=>getPreviewDbConfig({...good,DATABASE_URL:good.DATABASE_URL+'?sslmode=disable'}),/unsafe\/ambiguous/);
});
test('OPS-S04: cannot connect to CareerOS or another Supabase project',()=>{
  assert.throws(()=>getPreviewDbConfig({...good,DATABASE_URL:'postgresql://pc_stage_web:test@db.vpejzxrkmsmhujusirsa.supabase.co:5432/postgres'}),/project/);
  assert.throws(()=>getPreviewDbConfig({...good,DATABASE_URL:'postgresql://pc_stage_web.otherref:test@aws-0-us-east-1.pooler.supabase.com:6543/postgres'}),/project/);
});
test('OPS-S05: reject postgres, service, anon and writable identities',()=>{
  for(const role of ['postgres','service_role','anon','authenticated','pc_preview_reader','pc_ingest_worker','pc_stage_editor']){
    const u='postgresql://'+role+':demo@db.'+REF+'.supabase.co:5432/postgres';
    assert.throws(()=>getPreviewDbConfig({...good,DATABASE_URL:u}),/read-only login mismatch|project or read-only/);
  }
});
test('OPS-S06: local CI access cannot be reused on a remote database',()=>{
  const ci={PC_DATABASE_MODE:'ci',PC_ALLOW_DISPOSABLE_LOCAL_TEST:'true',DATABASE_URL:'postgresql://pc_ci_web:test@127.0.0.1:5432/poc_test'};
  assert.equal(getPreviewDbConfig(ci).ssl,false);
  assert.throws(()=>getPreviewDbConfig({...ci,DATABASE_URL:'postgresql://pc_ci_web:test@db.'+REF+'.supabase.co:5432/poc_test'}),/strict local-only/);
  assert.throws(()=>getPreviewDbConfig({...ci,PC_ALLOW_DISPOSABLE_LOCAL_TEST:'false'}),/strict local-only/);
  assert.throws(()=>getPreviewDbConfig({...ci,DATABASE_URL:'postgresql://postgres:test@127.0.0.1:5432/poc_test'}),/strict local-only/);
});
test('OPS-S07: trusted custom CA can be used without disabling verification',()=>{
  const c=getPreviewDbConfig({...good,PC_DB_CA_PEM:'-----BEGIN CERTIFICATE-----\nTEST\n-----END CERTIFICATE-----'});
  assert.deepEqual(c.ssl,{rejectUnauthorized:true,ca:'-----BEGIN CERTIFICATE-----\nTEST\n-----END CERTIFICATE-----'});
});
test('OPS-S08: credentials never appear in thrown error messages',()=>{
  const sensitive='do-not-expose-this-password';
  assert.throws(
    ()=>getPreviewDbConfig({...good,DATABASE_URL:'postgresql://postgres:'+sensitive+'@db.'+REF+'.supabase.co:5432/postgres'}),
    error=>error instanceof Error && !error.message.includes(sensitive),
  );
});
