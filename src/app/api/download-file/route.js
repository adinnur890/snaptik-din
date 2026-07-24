import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const filename = searchParams.get('filename') || 'snapdin_video';

  const hd = searchParams.get('hd') || '1';

  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

  const backendUrl = process.env.API_URL || 'https://snapdin-backend-production.up.railway.app';
  const params = new URLSearchParams({ url, filename, hd });

  const res = await fetch(`${backendUrl}/api/download-file?${params}`, {
    cache: 'no-store',
    headers: { 'X-Quality': 'hd', 'X-HD': '1' },
  });

  const headers = new Headers();
  headers.set('Content-Disposition', res.headers.get('Content-Disposition') || `attachment; filename="${filename}"`);
  headers.set('Content-Type', res.headers.get('Content-Type') || 'application/octet-stream');
  const contentLength = res.headers.get('Content-Length');
  if (contentLength) headers.set('Content-Length', contentLength);

  return new NextResponse(res.body, { status: res.status, headers });
}
