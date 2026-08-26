# Landing page — Salário Maternidade (Previmater)

Página estática, arquivo único, sem build. Publica na Cloudflare Pages.

```
index.html          a página
privacidade.html    política de privacidade (LGPD) — o rodapé aponta pra cá
robots.txt
functions/api/capi.js   repasse de eventos pra Conversions API (inerte até configurar)
```

---

## 1. Antes de subir — três coisas para preencher

Tudo que precisa ser trocado está marcado em MAIÚSCULA.

| Onde | O quê |
|---|---|
| `index.html`, bloco `CONFIG` no fim do arquivo | `whatsapp` — número com DDI e DDD, só dígitos: `5541988887777` |
| `index.html`, mesmo bloco | `pixelId` — id do **pixel de site**. Deixe `""` até criar. O antigo `177134800365534` está morto desde 2020 |
| `index.html` e `privacidade.html`, rodapé | CNPJ e e-mail de contato |

Confira também o número **+4 mil mães em 7 anos** na seção de prova — veio de um criativo de 2023 e precisa ser confirmado com o cliente antes de ir ao ar.

## 2. Publicar na Cloudflare Pages

1. **GitHub** — crie um repositório novo (pode ser privado) e suba estes arquivos. Dá para arrastar na interface do github.com, sem terminal.
2. **Cloudflare** — [dash.cloudflare.com](https://dash.cloudflare.com) → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
3. Escolha o repositório. Nas configurações de build, deixe tudo vazio:
   - Framework preset: **None**
   - Build command: *(vazio)*
   - Output directory: **/**
4. *Save and Deploy*. Sai no ar em `<projeto>.pages.dev` em cerca de um minuto.

Depois disso, todo push no GitHub republica sozinho.

## 3. Domínio próprio do Registro.br

O DNS do Registro.br não aceita CNAME no domínio raiz, então o caminho é **apontar os nameservers para a Cloudflare**. A Cloudflare resolve o apex sozinha.

1. Cloudflare → *Add a site* → digite o domínio → plano **Free**.
2. Ela mostra dois nameservers, tipo `xxx.ns.cloudflare.com`.
3. No Registro.br → *Painel* → seu domínio → *Alterar servidores DNS* → cole os dois.
4. Volte na Cloudflare, aba do Pages → *Custom domains* → *Set up a domain* → digite o domínio. Ela cria o registro sozinha.

A propagação leva de alguns minutos a algumas horas. O certificado HTTPS é automático e gratuito.

> Se o domínio já estiver em uso para e-mail, copie os registros MX atuais para a Cloudflare **antes** de trocar os nameservers, senão o e-mail para de funcionar.

## 4. O que a página já faz de rastreio

Sem nenhuma configuração extra:

- Lê `utm_content` da URL (onde entra a macro `{{ad.id}}` do Meta) e guarda na sessão.
- Injeta esse id **no começo da mensagem do WhatsApp**: `[LP-120250762186400524] Oi! ...`
  O robô já lê códigos entre colchetes — o regex vira `^\[LP-(\d+)\]`.
  É isso que devolve o `anuncio_id` que o Click-to-WhatsApp dava de graça.
- Captura `fbclid` e os cookies `_fbc` / `_fbp`, que a CAPI usa para casar o evento com o clique real.
- Gera um `event_id` por sessão, para deduplicar pixel e servidor.

Com `pixelId` preenchido, dispara também:

| Evento | Quando |
|---|---|
| `PageView` | ao abrir |
| `ViewContent` | quando o checklist de elegibilidade entra na tela — sinal de que ela leu o filtro |
| `Contact` | no clique do WhatsApp (evento padrão, serve para públicos) |
| `ClicouWhatsApp` | mesmo clique, com `origem` (hero, filtro, fecho, barra) e `ad_id` |

## 5. URL dos anúncios

Aponte o anúncio para:

```
https://SEUDOMINIO.com.br/?utm_source=meta&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.id}}
```

`utm_content={{ad.id}}` é o que faz a página saber qual anúncio trouxe a mãe. Sem isso o código vira `[LP]` genérico e a atribuição por criativo se perde.

## 6. Conversions API (opcional, depois)

`functions/api/capi.js` já está pronto e não faz nada até você definir, no painel da Cloudflare (*Settings → Environment variables*, produção):

- `META_DATASET_ID`
- `META_ACCESS_TOKEN` — marcar **Encrypt**

O token nunca entra no repositório.
