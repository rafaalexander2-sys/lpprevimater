"""Link interno apontando para arquivo que não existe. O Cloudflare serve
sem extensão, então /sobre precisa existir como sobre.html."""
import glob, re, os, sys

falhou = False
for arquivo in sorted(glob.glob("*.html")):
    html = open(arquivo, encoding="utf-8").read()
    for destino in set(re.findall(r'href="(/[^"#?]*)"', html)):
        if destino == "/": continue
        alvo = destino.lstrip("/")
        existe = os.path.exists(alvo) or os.path.exists(alvo + ".html")
        if not existe:
            falhou = True
            print(f"FALHOU {arquivo}: link para {destino}, que não existe")
if not falhou: print("ok     todos os links internos resolvem")
sys.exit(1 if falhou else 0)
