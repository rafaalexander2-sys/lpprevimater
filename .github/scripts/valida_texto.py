"""Travessão em toda frase é a marca mais reconhecível de texto gerado.
Foi removido de propósito; esta checagem impede que volte."""
import glob, re, sys

falhou = False
for arquivo in sorted(glob.glob("*.html")):
    html = open(arquivo, encoding="utf-8").read()
    corpo = re.search(r"<body.*?</body>", html, re.S)
    if not corpo: continue
    texto = corpo.group(0)
    texto = re.sub(r"<script.*?</script>", "", texto, flags=re.S)
    texto = re.sub(r"<style.*?</style>", "", texto, flags=re.S)
    texto = re.sub(r"<[^>]+>", " ", texto)
    n = texto.count("—") + texto.count("–")
    if n:
        falhou = True
        print(f"FALHOU {arquivo}: {n} travessão(ões) no texto visível")
    else:
        print(f"ok     {arquivo}")
sys.exit(1 if falhou else 0)
