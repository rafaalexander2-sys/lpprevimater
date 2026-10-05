/**
 * ATRIBUIÇÃO DA LP PREVIMATER → CRM  (v1, 05/10/2026)
 * ---------------------------------------------------------------------
 * Colar antes do </body> da LP, num <script> (ou como arquivo separado).
 * Não depende de biblioteca nenhuma.
 *
 * POR QUE EXISTE: o clique do Google (gclid/gbraid/wbraid) só existe na
 * URL desta página. Quando a cliente toca no botão do WhatsApp, esta
 * página fecha e o identificador some — o WhatsApp não carrega nada
 * dele, ao contrário do anúncio do Meta. Então, no clique, o script
 * manda tudo para o CRM e deixa duas pistas para ligar à conversa:
 *   1. o TELEFONE que ela digitar (na variante com telefone do teste);
 *   2. um CÓDIGO de 6 caracteres no fim do texto pré-preenchido.
 * O telefone sobrevive a ela apagar o texto; o código cobre quem não
 * está na variante com telefone.
 *
 * O QUE PRECISA EXISTIR NA PÁGINA:
 *   - botões do WhatsApp como <a href="https://wa.me/..."> (ou
 *     api.whatsapp.com). Botão que abre o WhatsApp por JavaScript, sem
 *     link, não é visto — trocar por <a>;
 *   - para o teste do telefone, um campo com o atributo data-pm-telefone
 *     dentro de um bloco com a classe pm-so-telefone (modelo no fim).
 */
(function () {
  'use strict';

  var ENDPOINT = 'https://ggyngtqknonwnohbzkyj.supabase.co/functions/v1/lp-visita';

  // Teste A/B do campo de telefone. A cliente é sorteada UMA vez e fica
  // na mesma variante nas próximas visitas, senão a comparação mistura
  // as duas. 0.5 = metade vê o campo. Para encerrar o teste: 0 (ninguém
  // vê) ou 1 (todas veem).
  var FRACAO_COM_TELEFONE = 0.5;

  // Texto que vai junto com o código. O webhook procura "Cód." seguido
  // do código — mudar aqui exige mudar lá.
  var PREFIXO_CODIGO = 'Cód. ';

  // Sem 0/O/1/I: a cliente às vezes reescreve o código à mão.
  var ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var PARAMS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium',
    'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'campaignid',
    'adgroupid', 'creative', 'keyword', 'matchtype', 'network', 'device'];

  function ler(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function gravar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* modo anônimo: segue sem guardar */ } }

  // 1. Toques. PRIMEIRO = a primeira visita que trouxe parâmetro, nunca
  // sobrescrito. ÚLTIMO = a visita mais recente que trouxe parâmetro; é
  // ele que vale para o Google, porque o crédito é do clique mais novo.
  // Visita sem parâmetro (voltou digitando o endereço) não apaga o
  // último clique pago.
  var q = new URLSearchParams(location.search);
  var agora = new Date().toISOString();
  var toque = { url: location.href.slice(0, 500), referrer: (document.referrer || '').slice(0, 500), em: agora };
  var temParam = false;
  PARAMS.forEach(function (p) { var v = q.get(p); if (v) { toque[p] = v; temParam = true; } });
  if (temParam) {
    if (!ler('pm_primeiro')) gravar('pm_primeiro', toque);
    gravar('pm_ultimo', toque);
  } else if (!ler('pm_ultimo')) {
    gravar('pm_ultimo', toque);
  }

  // 2. Variante do teste do telefone.
  var variante = ler('pm_variante');
  if (variante !== 'telefone' && variante !== 'sem_telefone') {
    variante = Math.random() < FRACAO_COM_TELEFONE ? 'telefone' : 'sem_telefone';
    gravar('pm_variante', variante);
  }
  document.documentElement.setAttribute('data-pm-variante', variante);
  var css = document.createElement('style');
  css.textContent = '[data-pm-variante="sem_telefone"] .pm-so-telefone{display:none!important}';
  document.head.appendChild(css);

  function codigoNovo() {
    var b = new Uint8Array(6), s = '';
    (window.crypto || window.msCrypto).getRandomValues(b);
    for (var i = 0; i < 6; i++) s += ALFABETO[b[i] % ALFABETO.length];
    return s;
  }
  // Mesma regra do CRM: tira o 55 do país, exige DDD + número.
  function digitosValidos(v) {
    var d = String(v || '').replace(/\D/g, '');
    if ((d.length === 12 || d.length === 13) && d.indexOf('55') === 0) d = d.slice(2);
    return d.length === 10 || d.length === 11 ? d : null;
  }
  function ehWhatsApp(a) {
    return a && a.href && /(wa\.me|api\.whatsapp\.com|whatsapp:\/\/)/i.test(a.href);
  }

  // A LP tem vários CTAs. Mantém os campos em sincronia apenas em memória;
  // o telefone não é gravado no localStorage.
  var campos = Array.prototype.slice.call(document.querySelectorAll('[data-pm-telefone]'));
  campos.forEach(function (campo) {
    campo.addEventListener('input', function () {
      campos.forEach(function (outro) {
        outro.value = campo.value;
        outro.removeAttribute('aria-invalid');
        var bloco = outro.closest('.pm-so-telefone');
        var erro = bloco && bloco.querySelector('[data-pm-erro]');
        if (erro) erro.hidden = true;
      });
    });
  });

  function campoDoBotao(a) {
    var bloco = a.closest('.btn-bloco');
    var campo = bloco && bloco.querySelector('[data-pm-telefone]');
    if (campo) return campo;
    // O botão da barra fixa usa o campo do painel que está visível.
    return campos.filter(function (c) { return c.offsetParent !== null; })[0] || campos[0];
  }

  // 3. Clique no botão. Fase de captura, para rodar antes de qualquer
  // outro script da página mexer no clique.
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
    if (!ehWhatsApp(a)) return;

    var telefone = null;
    if (variante === 'telefone') {
      var campo = campoDoBotao(a);
      if (campo) {
        telefone = digitosValidos(campo.value);
        if (!telefone) {
          // Na variante com telefone o campo é obrigatório: é exatamente
          // isso que o teste mede.
          ev.preventDefault();
          ev.stopImmediatePropagation();
          var bloco = campo.closest('.pm-so-telefone');
          var erro = bloco && bloco.querySelector('[data-pm-erro]');
          if (erro) erro.hidden = false;
          campo.setAttribute('aria-invalid', 'true');
          campo.scrollIntoView({ block: 'center', behavior: 'smooth' });
          campo.focus({ preventScroll: true });
          return;
        }
      }
    }

    var codigo = codigoNovo();
    try {
      // Cada clique parte da mensagem original, sem acumular códigos anteriores.
      var base = a.getAttribute('data-pm-href-base') || a.href;
      a.setAttribute('data-pm-href-base', base);
      var u = new URL(base);
      var texto = u.searchParams.get('text') || '';
      u.searchParams.set('text', (texto ? texto + '\n\n' : '') + PREFIXO_CODIGO + codigo);
      a.href = u.toString(); // troca antes da navegação padrão acontecer
    } catch (e) { /* link fora do padrão: segue sem código, o telefone ainda casa */ }

    var corpo = JSON.stringify({
      codigo: codigo,
      clique_em: new Date().toISOString(),
      variante: variante,
      telefone: telefone,
      ultimo: ler('pm_ultimo') || toque,
      primeiro: ler('pm_primeiro')
    });
    // text/plain + no-cors: pedido "simples", sem preflight. keepalive
    // garante que o envio termina mesmo com a página fechando para
    // abrir o WhatsApp. Não esperamos resposta de propósito: atrasar o
    // WhatsApp para confirmar gravação custa cliente.
    try {
      fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'text/plain' }, body: corpo });
    } catch (e) {
      try { navigator.sendBeacon(ENDPOINT, new Blob([corpo], { type: 'text/plain' })); } catch (e2) {}
    }
  }, true);
})();
