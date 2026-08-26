"""Imagem referenciada e ausente vira buraco na página. A única exceção é a
foto da equipe, que some de propósito enquanto não existe."""
import glob, re, os, sys

TOLERADAS = {"imagens/equipe-curitiba.jpg"}
falhou = False
for arquivo in sorted(glob.glob("*.html")):
    html = open(arquivo, encoding="utf-8").read()
    refs = set(re.findall(r'(?:src|srcset)="(/imagens/[^"]+)"', html))
    for ref in refs:
        caminho = ref.lstrip("/")
        if not os.path.exists(caminho) and caminho not in TOLERADAS:
            falhou = True
            print(f"FALHOU {arquivo}: {ref} não existe")
if not falhou: print("ok     todas as imagens referenciadas existem")
sys.exit(1 if falhou else 0)
