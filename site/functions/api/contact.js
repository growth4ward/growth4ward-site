export async function onRequestPost(context) {
  try {
    const contentType = context.request.headers.get('content-type') || '';
    let payload = {};
    if (contentType.includes('application/json')) {
      payload = await context.request.json();
    } else {
      const formData = await context.request.formData();
      payload = Object.fromEntries(formData.entries());
    }

    const name = String(payload.name || '').trim();
    const email = String(payload.email || '').trim();
    const business = String(payload.business || '').trim();
    const service_area = String(payload.service_area || '').trim();
    const message = String(payload.message || '').trim();

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
    }

    const ip = context.request.headers.get('CF-Connecting-IP') || '';
    const userAgent = context.request.headers.get('User-Agent') || '';

    if (context.env.DB) {
      await context.env.DB.prepare(
        `INSERT INTO contact_messages (name, email, business, service_area, message, ip_address, user_agent)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(name, email, business, service_area, message, ip, userAgent).run();
    }

    return Response.json({ ok: true, message: 'Thanks — your message has been received.' }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    return Response.json({ ok: false, error: 'Unable to submit form right now.' }, { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
