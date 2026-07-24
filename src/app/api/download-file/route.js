import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const filename = searchParams.get('filename') || 'snapdin_video';

  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

  const backendUrl = process.env.API_URL || 'https://snapdinbackend-sntq9t38.b4a.run';
  const params = new URLSearchParams({ url, filename });

  const res = await fetch(`${backendUrl}/api/download-file?${params}`, { cache: 'no-store' });

  const headers = new Headers();
  headers.set('Content-Disposition', res.headers.get('Content-Disposition') || `attachment; filename="${filename}"`);
  headers.set('Content-Type', res.headers.get('Content-Type') || 'application/octet-stream');

  return new NextResponse(res.body, { status: res.status, headers });
}
