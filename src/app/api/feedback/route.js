import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, type, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook not configured.' }, { status: 500 });
    }

    const typeEmoji = { feedback: '💬', bug: '🐛', suggestion: '💡', other: '📩' };
    const emoji = typeEmoji[type] || '📩';

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: `${emoji} ${type?.toUpperCase() || 'MESSAGE'} dari SnapDin`,
          color: type === 'bug' ? 0xFE2C55 : type === 'suggestion' ? 0xa78bfa : 0x25F4EE,
          fields: [
            { name: '👤 Nama', value: name, inline: true },
            { name: '📧 Email', value: email || 'Tidak diisi', inline: true },
            { name: '💬 Pesan', value: message },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: 'SnapDin Feedback System' },
        }],
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
