import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const backendUrl = process.env.API_URL || 'https://snapdin-backend-production.up.railway.app';

    const res = await fetch(`${backendUrl}/api/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, hd: true }),
      cache: 'no-store',
    });

    const text = await res.text();
    const data = JSON.parse(text);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
