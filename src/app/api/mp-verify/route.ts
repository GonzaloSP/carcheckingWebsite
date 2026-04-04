import { NextRequest, NextResponse } from 'next/server';

const APPWRITE_BASE = (process.env.NEXT_PUBLIC_APPWRITE_BASE ?? 'https://server.innsimulation.com/v1').replace(/\/$/, '');
const PROJECT_ID    = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '';

export async function GET(request: NextRequest) {
  const external_reference = request.nextUrl.searchParams.get('external_reference') ?? '';
  const res = await fetch(`${APPWRITE_BASE}/functions/mp-verify-preference/executions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Appwrite-Project': PROJECT_ID },
    body: JSON.stringify({ async: false, method: 'GET', path: `/?external_reference=${encodeURIComponent(external_reference)}` }),
  });
  const exec = await res.json();
  const data = JSON.parse(exec.responseBody || '{}');
  return NextResponse.json(data, { status: exec.responseStatusCode ?? res.status });
}
