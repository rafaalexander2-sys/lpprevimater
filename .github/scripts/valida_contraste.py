"""Trava de regressão de contraste.

Este projeto já reprovou 14 pares de cor em duas auditorias: uma quando a
paleta veio do servmaes, outra quando trocou para a marca real. Cada troca de
token invalida todos os cálculos anteriores.

Este script lê os tokens direto do CSS e reconfere os pares que importam.
Se alguém mexer numa cor e derrubar um deles, o PR não passa.
"""
import re, sys, io

def lum(hx):
    hx = hx.lstrip("#")
    if len(hx) == 3: hx = "".join(c*2 for c in hx)
    v = [int(hx[i:i+2], 16)/255 for i in (0, 2, 4)]
    f = lambda c: c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
    return .2126*f(v[0]) + .7152*f(v[1]) + .0722*f(v[2])

def razao(a, b):
    l1, l2 = sorted([lum(a), lum(b)], reverse=True)
    return (l1 + .05) / (l2 + .05)

def mistura(frente, fundo, alfa):
    n = lambda h: [int(h.lstrip("#")[i:i+2], 16) for i in (0, 2, 4)]
    x, y = n(frente), n(fundo)
    return "#" + "".join(f"{round(x[i]*alfa + y[i]*(1-alfa)):02X}" for i in range(3))

css = io.open("index.html", encoding="utf-8").read()
tok = dict(re.findall(r"--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{3,6});", css))
def t(nome):
    if nome not in tok:
        print(f"FALHOU token --{nome} sumiu do CSS"); sys.exit(1)
    return tok[nome]

BRANCO, PRETO_RODAPE = "#FFFFFF", "#0D1516"
teal, tinta, rosa = t("teal"), t("tinta"), t("rosa")

# (descrição, frente, fundo, mínimo)
#   4.5 para texto corrido, 3.0 para ícone, gráfico e limite de componente
PARES = [
    ("botão: texto sobre o topo do degradê",  tinta,            t("rosa-300"),      4.5),
    ("botão: texto sobre a base do degradê",  tinta,            t("rosa-500"),      4.5),
    ("botão: limite sobre teal",              t("rosa-300"),    teal,               3.0),
    ("hero: título branco sobre teal",        BRANCO,           teal,               4.5),
    ("hero: negrito do escopo",               t("rosa-200"),    mistura("#000000", teal, .34), 4.5),
    ("cartão sim: título",                    t("teal-700"),    BRANCO,             4.5),
    ("cartão nao: título",                    t("nao"),         BRANCO,             4.5),
    ("cartão talvez: título",                 t("talvez"),      BRANCO,             4.5),
    ("lista dos cartões",                     t("tinta-70"),    BRANCO,             4.5),
    ("legenda e nota de botão",               t("tinta-45"),    BRANCO,             4.5),
    ("aba inativa",                           t("tinta-45"),    t("papel-2"),       4.5),
    ("aba ativa",                             t("teal-800"),    BRANCO,             4.5),
    ("rótulo do resumo",                      t("teal-800"),    t("teal-050"),      4.5),
    ("texto do resumo",                       t("tinta-70"),    t("teal-050"),      4.5),
    ("título de situação",                    t("teal-800"),    BRANCO,             4.5),
    ("rodapé: corpo",     mistura(BRANCO, PRETO_RODAPE, .62), PRETO_RODAPE,         4.5),
    ("rodapé: link",      mistura(BRANCO, PRETO_RODAPE, .82), PRETO_RODAPE,         4.5),
    ("rodapé: aviso",     mistura(BRANCO, PRETO_RODAPE, .54), PRETO_RODAPE,         4.5),
    ("número sobre teal",                     "#FFF5F6",        teal,               4.5),
    ("rótulo do número",  mistura(BRANCO, teal, .94),           teal,               4.5),
    ("ícone do passo",                        "#7A1D2E",        rosa,               3.0),
]

falhou = 0
print(f"{'par':42} {'razão':>6} {'mín':>5}")
for nome, frente, fundo, minimo in PARES:
    r = razao(frente, fundo)
    ok = r >= minimo
    if not ok: falhou += 1
    print(f"{nome:42} {r:6.2f} {minimo:5.1f}  {'ok' if ok else 'REPROVA'}")

if falhou:
    print(f"\nFALHOU {falhou} par(es) abaixo do mínimo do WCAG AA")
    sys.exit(1)
print(f"\nok     {len(PARES)} pares conferidos, todos passam")
