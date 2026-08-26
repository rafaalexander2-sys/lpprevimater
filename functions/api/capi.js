/**
 * Cloudflare Pages Function — repasse de eventos para a Conversions API da Meta.
 *
 * Fica inerte até você definir as duas variáveis no painel da Cloudflare:
 *   Settings → Environment variables (production)
 *     META_DATASET_ID   → id do dataset de site
 *     META_ACCESS_TOKEN → token do dataset  (marcar como "Encrypt")
 *
 * Nunca coloque o token neste arquivo — ele vai para o GitHub.
 *
 * Uso a partir da página:
 *   fetch("/api/capi", {method:"POST", headers:{"Content-Type":"application/json"},
 *     body: JSON.stringify({event_name:"Contact", event_id: PREV.eventId,
 *                           fbc: PREV.fbc, fbp: PREV.fbp, ad_id: PREV.adId})})
 *
 * O event_id precisa ser o MESMO enviado no fbq(...,{eventID}) para a Meta
 * deduplicar pixel e servidor. Sem isso o evento conta duas vezes.
 */

const API = "https://graph.facebook.com/v21.0";

export async function onRequestPost({ request, env }) {
  const dataset = env.META_DATASET_ID;
  const token = env.META_ACCESS_TOKEN;

  if (!dataset || !token) {
    return json({ ok: false, erro: "CAPI não configurada" }, 501);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, erro: "JSON inválido" }, 400);
  }

  const evento = {
    event_name: body.event_name || "Contact",
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id,
    event_source_url: request.headers.get("referer") || undefined,
    action_source: "website",
    user_data: {
      client_ip_address: request.headers.get("cf-connecting-ip") || undefined,
      client_user_agent: request.headers.get("user-agent") || undefined,
      fbc: body.fbc || undefined,
      fbp: body.fbp || undefined
    },
    custom_data: { ad_id: body.ad_id || undefined }
  };

  const resp = await fetch(`${API}/${dataset}/events?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [evento] })
  });

  const resultado = await resp.json();
  return json({ ok: resp.ok, meta: resultado }, resp.ok ? 200 : 502);
}

function json(dados, status) {
  return new Response(JSON.stringify(dados), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
