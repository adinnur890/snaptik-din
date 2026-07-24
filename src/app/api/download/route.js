import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  const backendUrl = process.env.API_URL || 'https://snapdinbackend-gcn3slyb.b4a.run';
  const res = await fetch(`${backendUrl}/api/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
