# Imagens da landing page — especificação e prompts

Oito peças. Cada uma traz **onde entra, dimensão, formato, peso máximo e o prompt completo**.

Três regras valem para todas, e vêm da operação, não de gosto:

1. **Nada de marca ou símbolo de governo.** Sem brasão, selo, carimbo, bandeira, logo do INSS
   ou de órgão público. A página afirma no rodapé que não tem vínculo com o governo — a imagem
   não pode desmentir isso.
2. **Nada de WhatsApp.** Sem logo, sem balão de conversa, sem verde de aplicativo de mensagem.
   O verde da marca é o teal `#007C85`, que é outra coisa.
   **A paleta da marca é teal `#007C85` + rosa `#FC9FA7`** — extraída do arquivo do logo,
   onde "previ" é teal e "mater" é rosa. Nada de amarelo em peça nenhuma.
3. **Brasileiro e real.** Pele parda ou preta em pelo menos metade das peças com pessoas,
   casa modesta e cuidada, luz de janela, grão real. Sem brilho de banco de imagens,
   sem sorriso de propaganda, sem pena. Mãos corretas.

## Orçamento de peso

A página é destino de tráfego pago. Cada 100 KB a mais custa conversão em 4G.
**Teto total de imagens: 420 KB.** Se estourar, o primeiro corte é a IMG-08.

| Peça | Teto |
|---|---|
| IMG-01 hero (as duas versões somadas) | 190 KB |
| IMG-03 carta | 70 KB |
| IMG-04 como funciona | 60 KB |
| IMG-08 gestante | 60 KB |
| IMG-05 equipe | 40 KB |

A IMG-02 não conta: ela nunca é baixada pelo navegador, só pelo robô do compartilhamento.

---

# IMG-01 — Fundo do hero

**Onde entra:** atrás de todo o cabeçalho, sob um véu teal de 86% de opacidade.
**Dimensões:** duas versões — **1080 × 1600** (celular, 27:40) e **2400 × 1100** (desktop, 24:11).
**Formato:** AVIF principal, WebP alternativo, JPG de último recurso. Qualidade 78.
**Nome:** `hero-mobile.avif`, `hero-mobile.webp`, `hero-desktop.avif`, `hero-desktop.webp`.

> **O que decide esta peça:** ela vive sob um véu que apaga 86% da informação. Foto delicada
> vira mancha cinza. Precisa de contraste alto, formas grandes e o rosto no terço superior,
> onde o título ainda não passou por cima.

```
Photograph, portrait 1080x1600. Documentary, not advertising.

A Brazilian mother, 26 to 34, parda or Black skin, hair tied back, no make-up, wearing a
plain worn t-shirt. She holds a baby of about eight months against her chest, the baby's head
resting on her shoulder, facing away from camera. She is looking slightly off-lens, calm,
composed, thinking. Not smiling at the camera. Not sad. She looks like someone who handles
things.

She sits near a window in a modest but cared-for Brazilian home: painted plaster wall in faded
mint or pale ochre, a little uneven, one framed photo, a plant in a repurposed tin. Late
afternoon window light from the left, strong enough to separate her shoulder from the wall.
Deep shadow on the right third of the frame.

Composition: she occupies the left two thirds, positioned so her face sits in the UPPER THIRD
of the frame. The right third is quiet wall and shadow — that area must stay simple, because
text will sit over it. No object crosses the top 120 pixels.

Shot on a 50mm at f/2.8, shallow but not blurred to mush, real sensor grain, slightly
imperfect framing, unedited colour. Warm skin tones. High tonal separation between subject
and background so the image survives being darkened heavily.

Correct hands, five fingers, natural grip on the baby.

Do NOT include: any text, letters, numbers or watermark; any logo or brand mark; any
government crest, seal, stamp, flag or official document; any WhatsApp icon, chat bubble,
phone screen or app interface; messaging-app green; stock-photo gloss, teeth-out smiling,
white studio backdrop; pity, tears, poverty clichés such as bare concrete or exposed brick.
```

**Versão desktop:** mesmo prompt, trocando a primeira linha por
`Photograph, landscape 2400x1100.` e o parágrafo de composição por:
`Composition: she occupies the left third; the centre and right two thirds are quiet wall,
window and shadow, kept simple for text. Her face sits at the vertical centre.`

---

# IMG-02 — Cartão de compartilhamento

**Onde entra:** `og:image`. É o que aparece quando o link é colado no WhatsApp, no Instagram
ou mandado por e-mail. Hoje está referenciado no `<head>` e não existe — o link sai sem imagem.
**Dimensões:** **1200 × 630** exatos.
**Formato:** JPG, qualidade 82. WebP não é lido por todos os previsualizadores.
**Nome:** `og.jpg`

```
Landscape 1200x630 share card. Flat graphic composition, no photographic depth of field.

Left 45%: a photographic panel, full-bleed to the left, top and bottom edges — the same
Brazilian mother described for the hero, parda or Black, holding a baby, warm window light,
modest home. Cropped tight to head and shoulders.

Right 55%: solid deep teal field, hex #007C85, completely flat, no gradient, no texture.
Inside it, left-aligned with generous margin, in a geometric sans (Montserrat or close),
three elements stacked with air between them:

1  A short line in brand rose #FC9FA7, semi-bold, about 34px: "SALÁRIO MATERNIDADE"
   in capitals with wide letter spacing.
2  Below it, in white, extra-bold, about 62px, on two lines:
   "Veja onde o seu"  /  "caso se encaixa"
3  Below that, a solid rose #FC9FA7 rounded rectangle, about 70px tall, with dark
   charcoal #212529 bold text inside, about 30px: "Consulta gratuita"

The dividing line between photo and teal field is straight and vertical, no feathering.

Keep 60px of empty margin inside every edge so nothing is clipped by preview cropping.

Render every accent exactly. Add no other text.

Do NOT include: any logo, monogram, watermark or QR code; any government crest, seal or
flag; any WhatsApp mark, chat bubble or messaging green; emoji; drop shadows; gradients;
photographic elements inside the teal field.
```

---

# IMG-03 — A carta de negativa

**Onde entra:** seção "Recebeu uma carta dizendo que foi negado?", em fundo teal.
**Dimensões:** **1400 × 1000** (7:5).
**Formato:** AVIF + WebP. Qualidade 76.
**Nome:** `carta-negativa.avif` / `.webp`

> **Cuidado de conformidade:** o texto da carta precisa ser **ilegível de propósito**.
> Carta legível com cara de documento oficial é exatamente o que a Meta reprova e o que
> desmente o aviso do rodapé. Borrão de tinta, não palavras.

```
Photograph, landscape 1400x1000. Still life, documentary, top-down at a slight angle.

A single sheet of white office paper lying on a worn wooden kitchen table, one crease across
the middle where it was folded in three. The printed text on the sheet is rendered as
ILLEGIBLE grey type — the texture and rhythm of paragraphs, never actual readable words,
never headings, never numbers. No signature, no stamp, no seal, no crest, no letterhead,
no coloured header bar.

Beside the sheet, slightly out of frame at the bottom edge, a woman's hand resting flat on
the table — parda or Black skin, short unpainted nails, a simple thin ring. The hand is
still, not clenched. It reads as someone who has just finished reading and is thinking.

Morning window light from the upper left, long soft shadow of the sheet falling right.
Warm wood tone, a faint ring stain on the table, a little dust in the light.

Shot on 35mm, f/4, real grain, unedited, slightly off-level.

Correct hand, five fingers, natural anatomy.

Do NOT include: any readable text, letters, numbers, dates or signature; any government
crest, seal, stamp, flag, coat of arms or official letterhead; any logo or brand mark;
any WhatsApp or messaging icon; a laptop, phone or screen; tears, crying, hands on face,
or any gesture of despair; stock-photo gloss.
```

---

# IMG-04 — Ilustração: as duas datas

**Onde entra:** seção "Como funciona", acima dos quatro passos.
**Dimensões:** **1200 × 900** (4:3).
**Formato:** SVG se o ilustrador entregar vetor; senão AVIF + WebP com fundo transparente (PNG de recurso).
**Nome:** `duas-datas.svg` ou `duas-datas.webp`

> Esta é a única peça conceitual da página, e explica a mecânica central: **duas datas decidem
> o caso**. Vale ilustração chapada, não foto.

```
Flat vector illustration, landscape 1200x900, on a transparent background.
Editorial infographic style — think a quality newspaper explainer, not a startup landing page.
No 3D, no gradients, no drop shadows, no glow, no isometric perspective.

A single horizontal timeline running across the middle of the frame, drawn as a solid
2px charcoal #212529 line with a subtle hand-drawn wobble, not machine-straight.

On the line, two large markers, evenly spaced, each a filled circle about 60px across:

- The LEFT marker is deep teal #007C85. Above it, a small flat icon of a punched time card
  or a folded work document, drawn in the same 2px charcoal line weight.
- The RIGHT marker is brand rose #FC9FA7 with a 2px charcoal outline. Above it, a small
  flat icon of a baby's rattle or a simple crib, same line weight.

Between the two markers, spanning the gap, a soft teal band at about 15% opacity with
rounded ends, suggesting a covered period of time.

At the far right end of the line, past the second marker, the line changes to a dashed
stroke and fades out — suggesting time continuing.

Everything sits flat on the transparent background with generous empty space. No frame,
no border, no background shape.

Render NO text of any kind — the page supplies its own labels.

Do NOT include: text, letters, numbers or dates; calendars, clocks or hourglasses;
any government crest or official document; any WhatsApp, chat bubble or app icon;
people, faces or hands; gradients, shadows, glows, 3D or isometric shapes; emoji;
arrows other than the fading dashed line.
```

---

# IMG-05 — A equipe em Curitiba

**Onde entra:** seção "Quem somos", entre os números e o parágrafo.
**Dimensões:** **1600 × 900** (16:9).
**Formato:** AVIF + WebP, qualidade 74.
**Nome:** `equipe-curitiba.avif` / `.webp`

> **Esta peça não pode ser gerada.** A página afirma doze anos de empresa, sede em Curitiba
> e mais de seiscentas mães atendidas. Ilustrar isso com um escritório inventado transforma
> uma credencial verdadeira em prova falsa — e é o tipo de coisa que derruba a conta se alguém
> reclamar. **Precisa ser foto real da equipe.**

**Briefing para quem for fotografar:**

- Equipe real no escritório real, em horário de trabalho, não posada em fila.
- Luz natural, sem flash direto. Fim de manhã costuma ser o melhor.
- Enquadramento horizontal com folga em cima — a foto vai ser recortada em 16:9.
- Nada de terno e gravata: a página fala com mãe, não com investidor.
- Se aparecer tela de computador, que não mostre dado de cliente.
- Duas ou três opções: uma da equipe, uma da fachada ou recepção, uma de detalhe de mesa.
- Entregar em JPG na maior resolução possível. Eu trato e comprimo.

**Se não houver foto por enquanto:** a seção sai sem imagem. É melhor um bloco só com números
do que uma foto genérica que qualquer visitante reconhece como banco de imagens.

---

# IMG-06 — Depoimentos

**Onde entram:** três cartões na seção "O que as mães dizem".
**Dimensões:** **200 × 200** cada, recorte quadrado.
**Formato:** WebP, qualidade 80, círculo aplicado por CSS.

> **Também não pode ser gerado.** Rosto inventado ao lado de um depoimento é retrato falso
> de cliente. Três saídas, em ordem de preferência:
>
> 1. **Foto real com autorização por escrito** da mãe — a mais forte de todas.
> 2. **Print do WhatsApp** com o nome parcialmente coberto. É o formato que essa audiência
>    reconhece como verdadeiro, e ainda é o mais fácil de conseguir.
> 3. **Iniciais em círculo teal** — já implementado na página, funciona sem imagem nenhuma.
>
> O que está no ar agora é texto de exemplo marcado como `DEPOIMENTO REAL`. Precisa ser
> trocado por depoimento verdadeiro antes de qualquer verba entrar.

---

# IMG-07 — Retrato da gestante

**Onde entra:** painel "Estou grávida" do garfo, e a dobra de saída.
**Dimensões:** **1200 × 1200** (quadrado).
**Formato:** AVIF + WebP, qualidade 76.
**Nome:** `gestante.avif` / `.webp`

```
Photograph, square 1200x1200. Documentary, not advertising.

A pregnant Brazilian woman, 24 to 32, parda or Black skin, roughly seven months along,
standing at a kitchen counter in a modest, cared-for home. She wears everyday clothes —
a plain stretched t-shirt over the bump, not a maternity gown, not white linen, not a
photoshoot dress. One hand rests low on the bump, the other on the counter.

She is looking down at something on the counter, mid-thought. Not posed toward camera,
not radiant, not serene — occupied. The expression of someone working out what to do next.

Soft daylight from a window on the right. Faded mint or pale ochre wall behind, a little
uneven. A kettle, a tea towel, a plant in a tin on the counter.

Framed at mid-thigh, with air above her head. She sits slightly left of centre so the right
side of the square stays quiet.

Shot on 35mm, f/2.8, real grain, unedited colour, slightly imperfect framing.

Correct hands, five fingers, natural anatomy of the resting hand.

Do NOT include: text, letters or numbers; any logo or watermark; any government crest or
document; any WhatsApp icon, chat bubble, phone or screen; messaging green; the classic
maternity-shoot look — flowing dress, field at golden hour, heart shape made with hands,
partner embracing from behind, bare belly; stock-photo gloss; nudity.
```

---

# IMG-08 — Textura de fundo

**Onde entra:** separação entre seções claras.
**Não precisa ser gerada.** Já está implementada como SVG inline no CSS: um padrão de
pontos teal a 4% de opacidade, com menos de 1 KB e nítido em qualquer densidade de tela.
Imagem gerada aqui só adicionaria peso.

---

## Depois de gerar: o tratamento

Nenhuma dessas peças vai crua para o repositório.

1. **Recorte** na proporção exata da tabela. O `<picture>` da página já reserva o espaço
   com `aspect-ratio`, então recorte errado desloca o layout.
2. **Converta** para AVIF e WebP mantendo o JPG só onde a tabela pede.
3. **Comprima** até o teto de peso. Se não couber, reduza a qualidade antes de reduzir a
   dimensão — foto de fundo aguenta qualidade 70 sem ninguém perceber, sob o véu teal.
4. **Nomeie** exatamente como está na especificação. Os `<picture>` já apontam para esses nomes.
5. Coloque tudo em `/imagens/` na raiz do repositório.
