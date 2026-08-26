"""Cada tag aberta precisa fechar. Erro de aninhamento passa despercebido
no navegador e quebra em leitor de tela."""
import glob, sys
from html.parser import HTMLParser

VAZIAS = {"area","base","br","col","embed","hr","img","input","link","meta",
          "param","source","track","wbr","use","circle","path","rect","stop"}

class Checa(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.pilha=[]; self.erros=[]
    def handle_starttag(self, t, a):
        if t not in VAZIAS: self.pilha.append((t, self.getpos()))
    def handle_endtag(self, t):
        if t in VAZIAS: return
        if not self.pilha:
            self.erros.append(f"</{t}> sem abertura, linha {self.getpos()[0]}"); return
        topo, pos = self.pilha.pop()
        if topo != t:
            self.erros.append(f"esperava </{topo}> (aberta na linha {pos[0]}), veio </{t}> na linha {self.getpos()[0]}")

falhou = False
for arquivo in sorted(glob.glob("*.html")):
    c = Checa(); c.feed(open(arquivo, encoding="utf-8").read())
    problemas = c.erros + [f"<{t}> nunca fechada, linha {p[0]}" for t, p in c.pilha]
    if problemas:
        falhou = True
        print(f"FALHOU {arquivo}")
        for p in problemas[:6]: print(f"   {p}")
    else:
        print(f"ok     {arquivo}")
sys.exit(1 if falhou else 0)
