import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const backendUrl = process.env.API_URL || 'https://snapdinbackend-gcn3slyb.b4a.run';

    const res = await fetch(`${backendUrl}/api/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const text = await res.text();
    const data = JSON.parse(text);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
