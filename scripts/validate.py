import json
V=json.load(open('public/data/verses.json'));ch={}
for x in V: ch.setdefault(x['c'],[]).append(x['v'])
assert len(ch)==18,'chapters'
for c,vs in ch.items(): assert vs==list(range(1,len(vs)+1)),f'gap in {c}'
for x in V:
    for f in ('sa','tr','en','hi'): assert x[f].strip(),(x['c'],x['v'],f)
print('OK chapters=18 verses=',len(V),{c:len(v) for c,v in ch.items()})
