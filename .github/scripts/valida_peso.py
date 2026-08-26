"""A página é destino de tráfego pago. Cada 100 KB a mais custa conversa em 4G.
Conta só o que o navegador baixa: AVIF de cada peça, mais o logo."""
import os, sys

TETO_KB = 420
SERVIDOS = ["hero-mobile.avif","carta-negativa.avif","gestante.avif",
            "duas-datas.avif","logo-branco.png"]

total = 0
for nome in SERVIDOS:
    caminho = os.path.join("imagens", nome)
    if not os.path.exists(caminho):
        print(f"FALHOU {nome} não existe"); sys.exit(1)
    kb = os.path.getsize(caminho) / 1024
    total += kb
    print(f"       {nome:26} {kb:7.1f} KB")
print(f"       {'TOTAL':26} {total:7.1f} KB  (teto {TETO_KB})")
if total > TETO_KB:
    print(f"FALHOU estourou o orçamento em {total - TETO_KB:.0f} KB")
    sys.exit(1)
print("ok     dentro do orçamento")
