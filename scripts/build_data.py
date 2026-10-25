import json,re,sys
src=sys.argv[1] if len(sys.argv)>1 else '../gita-json'
b=json.load(open(f'{src}/base.json'));e=json.load(open(f'{src}/en.json'));h=json.load(open(f'{src}/hi.json'))
V=[];C={}
for k,x in b.items():
    c,v=map(int,k.split('-'))
    V.append({'c':c,'v':v,'sa':x['sanskrit'],'tr':x['transliteration'],'en':e[k]['translation'],'hi':re.sub(r'^।।[\d.]+।।','',h[k]['translation']).strip()})
    C[c]={'n':c,'sa':x['chapterName'],'count':x['chapterVerseCount']}
json.dump(V,open('public/data/verses.json','w'),ensure_ascii=False,separators=(',',':'))
json.dump(list(C.values()),open('public/data/chapters.json','w'),ensure_ascii=False)
