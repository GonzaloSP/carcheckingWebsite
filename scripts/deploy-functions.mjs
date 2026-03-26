#!/usr/bin/env node
/**
 * Deploy all Appwrite functions from appwrite.json via REST API.
 * Runs during the site build — no Appwrite CLI needed.
 *
 * Required env vars: APPWRITE_API_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY
 */

import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const config = JSON.parse(readFileSync(join(ROOT, 'appwrite.json'), 'utf-8'));

// Debug: show all Appwrite-related env vars available in the build
const appwriteVars = Object.entries(process.env)
  .filter(([k]) => /appwrite|project/i.test(k))
  .map(([k, v]) => `  ${k}=${k.toLowerCase().includes('key') ? '***' : v}`);
console.log(`[deploy-functions] Available env vars:\n${appwriteVars.join('\n') || '  (none)'}`);

const ENDPOINT = process.env.APPWRITE_API_ENDPOINT || 'https://server.innsimulation.com/v1';
const API_KEY  = process.env.APPWRITE_API_KEY;

if (!API_KEY) {
  console.warn('[deploy-functions] APPWRITE_API_KEY missing — skipping function deploy.');
  process.exit(0);
}

// Resolve project ID: env var > appwrite.json > auto-detect from API key
let PROJECT_ID = process.env.APPWRITE_PROJECT_ID || config.projectId || '';
if (!PROJECT_ID) {
  console.log('[deploy-functions] No project ID set — detecting from API key...');
  try {
    const r = await fetch(`${ENDPOINT}/projects`, {
      headers: { 'X-Appwrite-Key': API_KEY, 'Content-Type': 'application/json' },
    });
    if (r.ok) {
      const data = await r.json();
      if (data.projects?.length === 1) {
        PROJECT_ID = data.projects[0].$id;
      } else if (data.total === 1 && data.projects) {
        PROJECT_ID = data.projects[0].$id;
      }
    }
  } catch {}
  if (!PROJECT_ID) {
    console.error('[deploy-functions] Could not detect project ID. Set APPWRITE_PROJECT_ID env var.');
    process.exit(1);
  }
}

console.log(`[deploy-functions] endpoint=${ENDPOINT} project=${PROJECT_ID} key=set`);
const headers = { 'X-Appwrite-Project': PROJECT_ID, 'X-Appwrite-Key': API_KEY };

async function api(method, path, body, extra = {}) {
  const res = await fetch(`${ENDPOINT}${path}`, {
    method,
    headers: { ...headers, ...extra },
    body,
  });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}

async function deployFunction(fn) {
  const fnId   = fn.$id;
  const fnPath = join(ROOT, fn.path);

  console.log(`\n=== ${fnId} ===`);

  // 1. Check if function exists; create if not
  const check = await api('GET', `/functions/${fnId}`);

  if (check.status === 404) {
    console.log('  Creating function...');
    const body = {
      functionId: fnId,
      name:       fn.name,
      runtime:    fn.runtime,
      execute:    fn.execute || ['any'],
      entrypoint: fn.entrypoint,
      timeout:    fn.timeout || 300,
      enabled:    fn.enabled !== false,
      logging:    fn.logging !== false,
    };
    const cr = await api('POST', '/functions', JSON.stringify(body), { 'Content-Type': 'application/json' });
    if (!cr.ok) {
      console.error(`  FAILED to create: ${JSON.stringify(cr.data)}`);
      return false;
    }
    console.log('  Created.');
  } else {
    console.log('  Function exists.');
  }

  const pkg = JSON.parse(readFileSync(join(fnPath, 'package.json'), 'utf-8'));

  // 2. Create tarball (exclude node_modules — Appwrite builds deps via commands param)
  const tarPath = `/tmp/${fnId}.tar.gz`;
  execSync(`tar --exclude='./node_modules' -czf ${tarPath} -C ${fnPath} .`);
  console.log('  Tarball created.');

  // 4. Upload deployment via native fetch + FormData
  console.log('  Uploading deployment...');
  const fileBuffer = readFileSync(tarPath);
  const blob = new Blob([fileBuffer], { type: 'application/gzip' });
  const form = new FormData();
  form.append('code', blob, 'code.tar.gz');
  form.append('activate', 'true');
  form.append('entrypoint', fn.entrypoint);
  // Let Appwrite install deps during function build
  const hasDeps = pkg.dependencies && Object.keys(pkg.dependencies).length > 0;
  if (hasDeps) form.append('commands', 'npm install');

  const deployUrl = `${ENDPOINT}/functions/${fnId}/deployments`;
  console.log(`  POST ${deployUrl} (tarball ${fileBuffer.length} bytes)`);

  const uploadRes = await fetch(deployUrl, {
    method: 'POST',
    headers: {
      'X-Appwrite-Project': PROJECT_ID,
      'X-Appwrite-Key': API_KEY,
    },
    body: form,
  });
  console.log(`  Response: ${uploadRes.status} ${uploadRes.statusText}`);

  let deployData;
  try { deployData = await uploadRes.json(); } catch { deployData = await uploadRes.text(); }

  if (deployData?.$id) {
    console.log(`  Deployment queued: ${deployData.$id} (status: ${deployData.status})`);
    return true;
  } else {
    console.error(`  Deployment failed: ${JSON.stringify(deployData)}`);
    return false;
  }
}

let ok = true;
for (const fn of config.functions || []) {
  const success = await deployFunction(fn);
  if (!success) ok = false;
}

console.log(ok ? '\nAll functions deployed.' : '\nSome functions failed.');
process.exit(ok ? 0 : 1);
