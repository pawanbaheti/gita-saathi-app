import {useEffect,useMemo,useRef,useState,FormEvent} from 'react';
import {Link,Route,Routes,useNavigate,useParams,useLocation} from 'react-router-dom';
import {Flower2,Menu,X,Send,Search,ChevronLeft,ChevronRight,Copy} from 'lucide-react';
import {useI,VL} from './i18n';
import {useVerses,useChapters,CH_EN,TOPICS,Verse,vid} from './data';
import {LESSONS,TQ,TQ_Q,TOPIC_DESC} from './content';
import {Festivals,Festival,Lesson,Terms} from './pages2';

const LangSel=()=>{const {lang,setLang,t}=useI();return <select aria-label={t('lang')} value={lang} onChange={e=>setLang(e.target.value)}><option value="en">English</option><option value="hi">हिन्दी</option></select>};
export function VerseLang(){const {vlang,setVlang,t}=useI();const o:[VL,string][]=[['sa','Sanskrit'],['hi','हिन्दी'],['en','English']];
 return <div className="vsel" role="group" aria-label={t('vlang')}>{o.map(([k,l])=><button key={k} aria-pressed={vlang===k} onClick={()=>setVlang(k)}>{l}</button>)}</div>}
export function VText({v,big}:{v:Verse;big?:boolean}){const {vlang}=useI();const txt=v[vlang];return <div className={'vtext '+(vlang!=='en'?'sa ':'')+(vlang==='sa'&&big?'':'')} lang={vlang==='sa'?'sa':vlang}>{txt}</div>}
function Header(){const {t}=useI();const [o,setO]=useState(false);const loc=useLocation();useEffect(()=>setO(false),[loc]);
 return <header><div className="hw nav"><Link to="/" className="brand"><Flower2 size={24}/>{t('brand')}</Link>
 <nav className={'links'+(o?' open':'')} aria-label="Main">{[['verses','/verses'],['topics','/topics'],['festivals','/festivals'],['lookup','/lookup'],['contact','/contact']].map(([k,p])=><Link key={k} to={p}>{t('nav.'+k)}</Link>)}<Link className="chatbtn" to="/chat">{t('nav.chat')}</Link><LangSel/></nav>
 <button className="burger" aria-label="Menu" onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button></div></header>}
function Footer(){const {t,lang}=useI();const L=lang==='hi'?'hi':'en';return <footer><div className="hw"><div className="top"><div style={{maxWidth:380}}><div className="brand"><Flower2 size={22}/>{t('brand')}</div><p>{t('foot.tag')}</p><p className="small">{t('foot.help')}</p></div><div><LangSel/></div></div>
 <div className="cols"><div><h4>{t('foot.verses')}</h4>{[['p.karma','chapter-3'],['p.bhakti','chapter-12'],['p.jnana','chapter-4'],['p.divine','chapter-10'],['p.duty','chapter-2-verse-47'],['p.detach','chapter-2-verse-56']].map(([k,s])=><Link key={k} to={'/verses/'+s}>{t(k)}</Link>)}</div>
 <div><h4>{t('foot.lessons')}</h4>{LESSONS.map(l=><Link key={l.slug} to={'/lessons/'+l.slug}>{l[L].t}</Link>)}</div>
 <div><h4>{t('foot.top')}</h4>{TQ.map((q,i)=><Link key={i} to={'/chat?q='+encodeURIComponent(TQ_Q[i][L])}>{q[L]}</Link>)}</div>
 <div><h4>{t('foot.explore')}</h4><Link to="/topics">{t('nav.topics')}</Link><Link to="/festivals">{t('nav.festivals')}</Link><Link to="/chat">{t('nav.chat')}</Link><Link to="/lookup">{t('nav.lookup')}</Link><Link to="/verses">{t('nav.verses')}</Link><Link to="/contact">{t('nav.contact')}</Link></div></div>
 <div className="legal"><span>© 2026 {t('brand')}. {t('foot.rights')}</span><span style={{display:'flex',gap:16}}><Link to="/terms">{t('nav.terms')}</Link><Link to="/about">{t('nav.about')}</Link></span></div></div></footer>}

function Home(){const {t}=useI();const nav=useNavigate();const [q,setQ]=useState('');const go=(s:string)=>nav('/chat?q='+encodeURIComponent(s));
 return <div className="wrap hero"><div className="om" aria-hidden>ॐ</div><h1>{t('home.title')}</h1><p className="sub">{t('home.sub')}</p>
 <form className="ask" onSubmit={(e:FormEvent)=>{e.preventDefault();if(q.trim())go(q)}}><textarea rows={2} aria-label={t('home.ph')} placeholder={t('home.ph')} value={q} onChange={e=>setQ(e.target.value)}/><button className="send" aria-label={t('chat.send')}><Send size={18}/></button></form>
 <div className="try"><p>{t('home.try')}</p><div className="qs">{[1,2,3,4].map(i=><button key={i} className="q" onClick={()=>go(t('home.q'+i))}>{t('home.q'+i)}</button>)}</div></div>
 <div style={{textAlign:'left'}}><section className="card"><h2>{t('home.topics')}</h2><div className="chips">{TOPICS.map(x=><Link key={x.slug} className="chip" to={'/topics/'+x.slug}>{t(x.k)}</Link>)}</div></section>
 <section className="card"><h2>{t('home.popular')}</h2><div className="chips">{[['p.karma','chapter-3'],['p.bhakti','chapter-12'],['p.jnana','chapter-4'],['p.divine','chapter-10'],['p.detach','chapter-2-verse-56'],['p.duty','chapter-2-verse-47']].map(([k,s])=><Link key={k} className="chip g" to={'/verses/'+s}>{t(k)}</Link>)}</div></section>
 <section className="card"><h2>{t('home.faq')}</h2>{[1,2,3,4,5].map(i=><details key={i}><summary>{t(`faq${i}.q`)}</summary><p>{t(`faq${i}.a`)}</p></details>)}</section></div></div>}

const chName=(lang:string,c:{n:number;sa:string})=>lang==='hi'?c.sa:CH_EN[c.n-1];
function Verses(){const {t,lang}=useI();const {d,e}=useChapters();
 return <div className="wrap"><p className="crumb"><Link to="/">{t('home')}</Link> › {t('verses.title')}</p><h1>{t('verses.title')}</h1><p className="sub">{t('verses.sub')}</p><h3>{t('verses.chapters')}</h3>
 {e&&<p>{t('err')}</p>}{!d&&!e&&<p>{t('loading')}</p>}<div className="grid">{d?.map(c=><Link key={c.n} className="tile" to={'/verses/chapter-'+c.n}><span className="k">{t('chapter')} {c.n}</span><b className={lang==='hi'?'sa':''}>{chName(lang,c)}</b><small>{c.count} {t('versesN')}</small></Link>)}</div>
 <div className="cta"><h2>{t('cta.title')}</h2><p>{t('cta.sub')}</p><Link className="btn" to="/chat">{t('cta.btn')}</Link></div></div>}
function Chapter({n}:{n:number}){const {t,lang}=useI();const {d}=useVerses();const {d:cs}=useChapters();const c=cs?.find(x=>x.n===n);
 return <div className="wrap"><p className="crumb"><Link to="/">{t('home')}</Link> › <Link to="/verses">{t('verses.title')}</Link> › {t('chapter')} {n}</p><h1>{c?chName(lang,c):''}</h1>
 <div className="bar"><span>{t('chapter')} {n}</span><VerseLang/></div><section className="card">{!d&&<p>{t('loading')}</p>}{d?.filter(v=>v.c===n).map(v=><div className="row" key={v.v}><Link className="n" to={`/verses/chapter-${n}-verse-${v.v}`}>{n}.{v.v}</Link><VText v={v}/></div>)}</section>
 <div className="pager">{n>1?<Link className="btn o" to={'/verses/chapter-'+(n-1)}>‹ {t('prev')}</Link>:<span/>}{n<18&&<Link className="btn o" to={'/verses/chapter-'+(n+1)}>{t('next')} ›</Link>}</div></div>}
function VersePage({c,v}:{c:number;v:number}){const {t,vlang}=useI();const {d}=useVerses();const [cp,setCp]=useState(false);
 const i=d?d.findIndex(x=>x.c===c&&x.v===v):-1;const cur=d&&i>=0?d[i]:null;const p=i>0?d![i-1]:null;const n=d&&i>=0&&i<d.length-1?d[i+1]:null;
 const link=(x:Verse)=>`/verses/chapter-${x.c}-verse-${x.v}`;
 const copy=()=>{if(cur)navigator.clipboard?.writeText(`${cur.sa}\n\n${cur.en}\n\n— Bhagavad Gita ${c}.${v}`).then(()=>{setCp(true);setTimeout(()=>setCp(false),1500)},()=>{})};
 if(d&&!cur)return <div className="wrap"><h1>{t('notfound')}</h1></div>;
 return <div className="wrap"><p className="crumb"><Link to="/">{t('home')}</Link> › <Link to="/verses">{t('verses.title')}</Link> › <Link to={'/verses/chapter-'+c}>{t('chapter')} {c}</Link> › {c}.{v}</p><h1>{t('chapter')} {c}, {t('verse')} {v}</h1>
 <div className="bar"><VerseLang/><button className="btn o" onClick={copy}><Copy size={14}/> {cp?t('copied'):t('copy')}</button></div>
 <section className="card">{!cur?<p>{t('loading')}</p>:<><VText v={cur} big/>{vlang==='sa'&&<div className="tr"><b style={{fontStyle:'normal'}}>{t('translit')}</b><br/>{cur.tr}</div>}</>}</section>
 <div className="pager">{p?<Link className="btn o" to={link(p)}>‹ {t('prev')} ({p.c}.{p.v})</Link>:<span/>}{n&&<Link className="btn o" to={link(n)}>{t('next')} ({n.c}.{n.v}) ›</Link>}</div></div>}
function VersesRoute(){const {slug}=useParams();const m=slug?.match(/^chapter-(\d+)(?:-verse-(\d+))?$/);
 if(!m||+m[1]<1||+m[1]>18)return <NotFound/>;return m[2]?<VersePage c={+m[1]} v={+m[2]}/>:<Chapter n={+m[1]}/>}
const NotFound=()=>{const {t}=useI();return <div className="wrap"><h1>{t('notfound')}</h1></div>};

function Topics(){const {t,lang}=useI();return <div className="wrap"><h1>{t('topics.title')}</h1><p className="sub">{t('topics.sub')}</p><div className="grid">{TOPICS.map(x=><Link key={x.slug} className="tile" to={'/topics/'+x.slug}><b>{t(x.k)}</b><p style={{margin:'0 0 8px',fontSize:15,color:'#374151'}}>{TOPIC_DESC[x.slug][lang==='hi'?'hi':'en']}</p><small>{x.refs.length} {t('t.versesN')}: {x.refs.join(', ')}</small></Link>)}</div></div>}
function Topic(){const {slug}=useParams();const {t,lang}=useI();const {d}=useVerses();const x=TOPICS.find(y=>y.slug===slug);if(!x)return <NotFound/>;
 return <div className="wrap"><p className="crumb"><Link to="/">{t('home')}</Link> › <Link to="/topics">{t('nav.topics')}</Link></p><h1>{t(x.k)}</h1><p className="sub">{TOPIC_DESC[x.slug][lang==='hi'?'hi':'en']}</p><div className="bar"><span/><VerseLang/></div>
 <section className="card">{!d?<p>{t('loading')}</p>:x.refs.map(r=>{const [c,v]=r.split('.').map(Number);const vs=d.find(z=>z.c===c&&z.v===v);return vs&&<div className="row" key={r}><Link className="n" to={`/verses/chapter-${c}-verse-${v}`}>{r}</Link><VText v={vs}/></div>})}</section></div>}

function search(d:Verse[],q:string):Verse[]{const s=q.trim().toLowerCase();if(!s)return[];
 const ref=s.match(/^(\d{1,2})[.: -](\d{1,3})$/);if(ref)return d.filter(v=>v.c===+ref[1]&&v.v===+ref[2]);
 const w=s.split(/[\s,.?!।]+/).filter(x=>x.length>1);return d.map(v=>{const h=(v.en+' '+v.hi+' '+v.sa+' '+v.tr).toLowerCase();return {v,s:w.reduce((a,k)=>a+(h.includes(k)?1:0),0)}}).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,10).map(x=>x.v)}
function VList({vs}:{vs:Verse[]}){return <>{vs.map(v=><div className="row" key={vid(v.c,v.v)}><Link className="n" to={`/verses/chapter-${v.c}-verse-${v.v}`}>{v.c}.{v.v}</Link><VText v={v}/></div>)}</>}
function Lookup(){const {t}=useI();const {d,e}=useVerses();const [q,setQ]=useState('');const [sq,setSq]=useState('');const r=useMemo(()=>d?search(d,sq):[],[d,sq]);
 return <div className="wrap"><h1>{t('lookup.title')}</h1><p className="sub">{t('lookup.sub')}</p><div className="note">{t('lookup.note')}</div>
 <form className="card" onSubmit={(e:FormEvent)=>{e.preventDefault();setSq(q)}}><input className="in" aria-label={t('lookup.ph')} placeholder={t('lookup.ph')} value={q} onChange={e=>setQ(e.target.value)}/><div className="bar"><VerseLang/><button className="btn"><Search size={14}/> {t('lookup.btn')}</button></div></form>
 {e&&<p>{t('err')}</p>}{!d&&!e&&<p>{t('loading')}</p>}{d&&<section className="card"><h2>{t('lookup.results')}</h2>{!sq.trim()?<p>{t('lookup.empty')}</p>:r.length?<VList vs={r}/>:<p>{t('lookup.none')}</p>}</section>}</div>}

/* ---------- AI CHAT (calls your Cloudflare Worker) ---------- */
const WORKER_URL='https://gita-ai.pawanbaheti1000.workers.dev';

async function askAI(question:string):Promise<string>{
 try{
  const res=await fetch(WORKER_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})});
  const data=await res.json();
  return String(data.answer||'').replace(/\*\*/g,'').replace(/\*/g,'').replace(/^>\s?/gm,'').trim();
 }catch{return ''}
}

type ChatMsg={id:number;q:string;r:Verse[];a:string|null};

function Chat(){const {t,lang}=useI();const {d,e}=useVerses();const loc=useLocation();const init=new URLSearchParams(loc.search).get('q')||'';
 const [msgs,setMsgs]=useState<ChatMsg[]>([]);const [q,setQ]=useState('');const started=useRef(false);
 const ask=(text:string)=>{if(!d||!text.trim())return;const s=text.toLowerCase();const tp=TOPICS.filter(x=>x.kw.some(k=>s.includes(k)));
  let r=tp.flatMap(x=>x.refs).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3).map(x=>{const [c,v]=x.split('.').map(Number);return d.find(z=>z.c===c&&z.v===v)!});
  if(!r.length)r=search(d,text).slice(0,3);
  const id=Date.now()+Math.random();
  setMsgs(m=>[...m,{id,q:text,r,a:null}]);setQ('');
  askAI(text).then(a=>setMsgs(m=>m.map(x=>x.id===id?{...x,a}:x)));};
 useEffect(()=>{if(init&&d&&!started.current){started.current=true;ask(init)}},[d]);// eslint-disable-line
 return <div className="wrap"><h1>{t('chat.title')}</h1><div className="note">{t('chat.note')}</div><div className="bar"><span/><VerseLang/></div>
 {e&&<p>{t('err')}</p>}{!d&&!e&&<p>{t('chat.loading')}</p>}
 {msgs.map(m=><section className="card" key={m.id}><p><b>{t('chat.you')}:</b> {m.q}</p>
  <p style={{whiteSpace:'pre-wrap'}}><b>{t('chat.bot')}:</b> {m.a===null?(lang==='hi'?'सोच रहा हूँ…':'Thinking…'):(m.a||(m.r.length?t('chat.found'):t('chat.none')))}</p>
  {m.r.length>0&&<VList vs={m.r}/>}</section>)}
 <form className="ask" style={{maxWidth:'none'}} onSubmit={(e:FormEvent)=>{e.preventDefault();ask(q)}}><textarea rows={2} aria-label={t('home.ph')} placeholder={t('home.ph')} value={q} onChange={e=>setQ(e.target.value)}/><button className="send" aria-label={t('chat.send')}><Send size={18}/></button></form></div>}
/* ---------- END AI CHAT ---------- */

function Contact(){const {t}=useI();const [em,setEm]=useState('');const [ms,setMs]=useState('');const [er,setEr]=useState<string[]>([]);const [done,setDone]=useState(false);
 const sub=(e:FormEvent)=>{e.preventDefault();const x:string[]=[];if(!(/^\S+@\S+\.\S+$/.test(em.trim())||/^\+?[\d\s-]{7,15}$/.test(em.trim())))x.push('contact.err1');if(!ms.trim())x.push('contact.err2');setEr(x);setDone(!x.length)};
 return <div className="wrap" style={{maxWidth:520}}><h1 style={{color:'#000'}}>{t('contact.title')}</h1><form className="card form" onSubmit={sub} noValidate><h2 style={{color:'#000'}}>{t('contact.h')}</h2><p style={{color:'#6b7280',marginTop:0}}>{t('contact.sub')}</p>
 <label htmlFor="em">{t('contact.email')}</label><input id="em" className="in" placeholder="you@example.com" value={em} onChange={e=>setEm(e.target.value)}/>{er.includes('contact.err1')&&<div className="err">{t('contact.err1')}</div>}
 <label htmlFor="ms">{t('contact.msg')}</label><textarea id="ms" className="in" rows={5} value={ms} onChange={e=>setMs(e.target.value)}/>{er.includes('contact.err2')&&<div className="err">{t('contact.err2')}</div>}
 <p/><button className="btn dark">{t('contact.send')}</button>{done&&<div className="note" role="status">{t('contact.nosvc')}</div>}</form></div>}
const Simple=({k}:{k:string[]})=>{const {t}=useI();return <div className="wrap"><h1>{t(k[0])}</h1>{k.slice(1).map(x=><p key={x} className="sub">{t(x)}</p>)}</div>};
export default function App(){return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/verses" element={<Verses/>}/><Route path="/verses/:slug" element={<VersesRoute/>}/><Route path="/topics" element={<Topics/>}/><Route path="/topics/:slug" element={<Topic/>}/><Route path="/lookup" element={<Lookup/>}/><Route path="/chat" element={<Chat/>}/><Route path="/contact" element={<Contact/>}/><Route path="/festivals" element={<Festivals/>}/><Route path="/festivals/:slug" element={<Festival/>}/><Route path="/lessons/:slug" element={<Lesson/>}/><Route path="/terms" element={<Terms/>}/><Route path="/about" element={<Simple k={['about.title','about.src','about.priv','about.aff']}/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>}