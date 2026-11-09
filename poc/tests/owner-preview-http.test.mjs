import test from 'node:test';
import assert from 'node:assert/strict';

const base = process.env.POC_HTTP_BASE ?? 'http://127.0.0.1:3100';
const token = process.env.PREVIEW_ACCESS_TOKEN;
if (!token || token.length < 32) throw Error('PREVIEW_ACCESS_TOKEN must be configured for disposable CI');

async function request(path, auth=true, options={}) {
  const response=await fetch(base+path,{
    ...options,
    headers:{
      ...(auth?{'x-preview-token':token}:{}),
      ...options.headers,
    },
    redirect:'manual',
  });
  const contentType=response.headers.get('content-type') ?? '';
  const payload=contentType.includes('json')?await response.json():await response.text();
  return {response,payload};
}

test('APP-S01: anonymous and incorrect tokens cannot access any preview data',async()=>{
  for(const path of ['/api/preview/health','/api/preview/substances','/api/preview/companies']) {
    const anon=await request(path,false);
    assert.equal(anon.response.status,401,path);
    assert.deepEqual(anon.payload,{error:'unauthorized'});
    assert.match(anon.response.headers.get('cache-control')??'',/no-store/);
    const wrong=await request(path,false,{headers:{'x-preview-token':'not-the-token'}});
    assert.equal(wrong.response.status,401);
  }
});

test('APP-S02: owner preview health makes release limitations explicit',async()=>{
  const x=await request('/api/preview/health');
  assert.equal(x.response.status,200);
  assert.equal(x.payload.releaseClass,'owner_testing_only');
  assert.equal(x.payload.snapshot.ownerEnabled,true);
  assert.equal(x.payload.snapshot.publicApproved,false);
  assert.match(x.response.headers.get('cache-control')??'',/no-store/);
});

test('APP-D01: search is parameterized and retains the draft state',async()=>{
  const x=await request('/api/preview/substances?search=semaglutide');
  assert.equal(x.response.status,200);
  assert.ok(x.payload.items.some(s=>s.id==='semaglutide'));
  assert.ok(x.payload.items.every(s=>s.reviewState==='legacy_draft_unverified'));
  assert.ok(x.payload.reviewNotice.toLowerCase().includes('not independently verified'));
  const injected=await request('/api/preview/substances?search=%27%20OR%201%3D1');
  assert.equal(injected.response.status,200);
  assert.equal(injected.payload.items.length,0);
});

test('APP-M01: full catalogue can be paginated without losing entries',async()=>{
  const a=await request('/api/preview/substances?limit=50');
  const b=await request('/api/preview/substances?limit=50&offset=50');
  assert.equal(a.payload.items.length,50);
  assert.equal(b.payload.items.length,34);
  assert.equal(new Set([...a.payload.items,...b.payload.items].map(s=>s.id)).size,84);
});

test('APP-E01: substance evidence includes direct source refs but no product approval assertion',async()=>{
  const x=await request('/api/preview/substances/tirzepatide');
  assert.equal(x.response.status,200);
  assert.ok(x.payload.claims.length>0);
  assert.ok(x.payload.claims.every(c=>c.sources.length>0 && c.sources.every(s=>s.url)));
  assert.equal(x.payload.regulatoryStatus,'not_verified_for_any_specific_product');
  assert.ok(!JSON.stringify(x.payload).includes('pharmacyLicenseVerified'));
});

test('APP-E02: company COA data never implies human-use safety or issuer authentication',async()=>{
  const x=await request('/api/preview/companies/particle');
  assert.equal(x.response.status,200);
  assert.ok(x.payload.lotObservations.length>0);
  assert.ok(x.payload.lotObservations.every(l=>l.issuerAuthenticated===false&&l.custodyVerified===false));
  assert.ok(x.payload.reviewNotice.includes('does not establish'));
});

test('APP-M06: duplicate Polaris GLOW observations remain separately visible',async()=>{
  const x=await request('/api/preview/companies/polaris');
  assert.equal(x.response.status,200);
  const matches=x.payload.lotObservations.filter(l=>l.reportedLot==='POL-GLOW50-2');
  assert.equal(matches.length,2);
  assert.deepEqual(matches.map(l=>l.substanceId).sort(),['bpc-157','ghk-cu']);
});

test('APP-D08: source issue states retain their original distinctions',async()=>{
  const x=await request('/api/preview/companies');
  assert.equal(x.response.status,200);
  assert.equal(x.payload.items.length,5);
  const statuses=[];
  for(const company of x.payload.items) {
    const d=await request('/api/preview/companies/'+company.id);
    statuses.push(...d.payload.evidenceIssues.map(i=>i.status));
  }
  assert.equal(statuses.filter(x=>x==='Unresolved').length,3);
  assert.equal(statuses.filter(x=>x==='Not assessable').length,1);
  assert.equal(statuses.filter(x=>x==='Not inspected').length,1);
});

test('APP-S03: requests enforce validation and predictable 404/405 results',async()=>{
  const bad=await request('/api/preview/substances?limit=100000');
  assert.equal(bad.response.status,400);
  const notFound=await request('/api/preview/substances/unknown-nonexistent');
  assert.equal(notFound.response.status,404);
  const badId=await request('/api/preview/companies/%24bad');
  assert.equal(badId.response.status,400);
  const posted=await request('/api/preview/substances',true,{method:'POST'});
  assert.equal(posted.response.status,405);
});

test('APP-S04: public landing page has no DB access credentials or source payload',async()=>{
  const x=await request('/',false);
  assert.equal(x.response.status,200);
  assert.match(x.payload,/Owner-only data preview/);
  assert.ok(!x.payload.includes(token));
  assert.ok(!x.payload.includes(process.env.DATABASE_URL||'SHOULD_NEVER_EXIST'));
  assert.ok(!x.payload.includes('LOT-PAR-BPC-2026346'));
});
