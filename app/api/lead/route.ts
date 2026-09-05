const TELEGRAM_API = "https://api.telegram.org";

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json({ error: "Telegram sozlamalari topilmadi." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const name = clean(body.name, 100);
    const phone = clean(body.phone, 40);
    const service = clean(body.service, 100);
    const message = clean(body.message, 1000);

    if (!name || !phone || !service) {
      return Response.json({ error: "Majburiy maydonlarni to‘ldiring." }, { status: 400 });
    }

    const text = [
      "🚀 YANGI LEAD — MODERNA",
      "",
      `👤 Ism: ${name}`,
      `📞 Telefon: ${phone}`,
      `💼 Xizmat: ${service}`,
      message ? `💬 Loyiha: ${message}` : "💬 Loyiha: Ko‘rsatilmagan",
      "",
      `🕒 Vaqt: ${new Intl.DateTimeFormat("uz-UZ", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tashkent" }).format(new Date())}`,
    ].join("\n");

    const telegramResponse = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!telegramResponse.ok) {
      console.error("Telegram delivery failed", telegramResponse.status);
      return Response.json({ error: "So‘rovni yuborib bo‘lmadi." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Lead handler error", error);
    return Response.json({ error: "Server xatosi yuz berdi." }, { status: 500 });
  }
}
