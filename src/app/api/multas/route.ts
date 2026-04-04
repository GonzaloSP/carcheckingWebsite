import { NextRequest, NextResponse } from 'next/server';

const APPWRITE_BASE = (process.env.NEXT_PUBLIC_APPWRITE_BASE ?? 'https://server.innsimulation.com/v1').replace(/\/$/, '');
const PROJECT_ID    = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '';
const EXEC_URL      = `${APPWRITE_BASE}/functions/multas/executions`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(EXEC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': PROJECT_ID,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
