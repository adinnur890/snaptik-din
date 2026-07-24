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

  const buffer = await res.arrayBuffer();
  const contentType = res.headers.get('Content-Type') || 'video/mp4';
  const contentDisposition = res.headers.get('Content-Disposition') || `attachment; filename="${filename}.mp4"`;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': contentDisposition,
      'Content-Length': buffer.byteLength.toString(),
    },
  });
}
