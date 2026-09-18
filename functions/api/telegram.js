export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = String(body.message || "").trim();

    if (!message) {
      return new Response(JSON.stringify({ ok: false, error: "Empty message" }), {
        status: 400,
        headers: { "content-type": "application/json" }
      });
    }

    const token = context.env.TELEGRAM_BOT_TOKEN;
    const chatId = context.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(JSON.stringify({ ok: false, error: "Missing configuration" }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }

    const response = await fetch(
      `https://api.telegram.org/…age`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.ok ? 200 : 500,
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: "Bad request" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
}
