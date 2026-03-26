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

const ENDPOINT   = process.env.APPWRITE_API_ENDPOINT || 'https://server.innsimulation.com/v1';
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID || config.projectId;
const API_KEY    = process.env.APPWRITE_API_KEY;

console.log(`[deploy-functions] endpoint=${ENDPOINT} project=${PROJECT_ID} key=${API_KEY ? 'set' : 'MISSING'}`);

if (!PROJECT_ID || !API_KEY) {
  console.warn('[deploy-functions] APPWRITE_PROJECT_ID or APPWRITE_API_KEY missing — skipping function deploy.');
  process.exit(0);
}
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

  // 2. Install deps if package.json has dependencies
  const pkg = JSON.parse(readFileSync(join(fnPath, 'package.json'), 'utf-8'));
  if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
    console.log('  Installing dependencies...');
    execSync('npm install --production', { cwd: fnPath, stdio: 'inherit' });
  }

  // 3. Create tarball
  const tarPath = `/tmp/${fnId}.tar.gz`;
  execSync(`tar --exclude='./node_modules/.cache' -czf ${tarPath} -C ${fnPath} .`);
  console.log('  Tarball created.');

  // 4. Upload deployment via curl (multipart upload)
  console.log('  Uploading deployment...');
  const curl = [
    'curl', '-s', '-X', 'POST',
    `${ENDPOINT}/functions/${fnId}/deployments`,
    '-H', `X-Appwrite-Project: ${PROJECT_ID}`,
    '-H', `X-Appwrite-Key: ${API_KEY}`,
    '-F', `code=@${tarPath}`,
    '-F', 'activate=true',
    '-F', `entrypoint=${fn.entrypoint}`,
  ].map(a => a.includes(' ') ? `"${a}"` : a).join(' ');

  const result = execSync(curl, { encoding: 'utf-8' });
  let deployData;
  try { deployData = JSON.parse(result); } catch { deployData = result; }

  if (deployData?.$id) {
    console.log(`  Deployment queued: ${deployData.$id} (status: ${deployData.status})`);
    return true;
  } else {
    console.error(`  Deployment failed: ${typeof deployData === 'string' ? deployData : JSON.stringify(deployData)}`);
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
