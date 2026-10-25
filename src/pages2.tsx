import {Link,useParams} from 'react-router-dom';
import {MessageCircle,BookOpen} from 'lucide-react';
import {useI} from './i18n';
import {useVerses} from './data';
import {FESTS,LESSONS,Fest} from './content';
import {VText,VerseLang} from './App';

const pd=(s:string)=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const fmt=(lang:string,s:string,o:Intl.DateTimeFormatOptions)=>new Intl.DateTimeFormat(lang==='hi'?'hi-IN':'en-IN',o).format(pd(s));
const full:Intl.DateTimeFormatOptions={weekday:'long',year:'numeric',month:'long',day:'numeric'};
function range(lang:string,f:Fest){if(!f.e)return fmt(lang,f.s,full);const o:Intl.DateTimeFormatOptions={month:'long',day:'numeric'};return `${fmt(lang,f.s,o)} - ${fmt(lang,f.e,{...o,year:'numeric'})}`}
const endOf=(f:Fest)=>pd(f.e||f.s);
const Dot=({c}:{c:string})=><span aria-hidden style={{width:14,height:14,borderRadius:'50%',background:c,display:'inline-block',marginRight:8,flex:'none'}}/>;

export function Festivals(){const {t,lang}=useI();const today=new Date();today.setHours(0,0,0,0);
 const up=FESTS.filter(f=>endOf(f)>=today).sort((a,b)=>+pd(a.s)-+pd(b.s));const nx=up[0];const L=lang==='hi'?1:0;
 const groups:Record<string,Fest[]>={};up.forEach(f=>{const k=fmt(lang,f.s,{month:'long',year:'numeric'});(groups[k]=groups[k]||[]).push(f)});
 return <div className="wrap"><h1>{t('fest.title')} 2026-2027</h1><p className="sub">{t('fest.sub')}</p>
 {nx?<>
 <section className="card" style={{borderColor:'#f9a8d4'}}><small style={{color:'var(--text)',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase'}}>{t('fest.next')}</small><h2 style={{fontSize:26,color:'var(--brown)',margin:'6px 0'}}>{(lang==='hi'?nx.hi:nx.en)[0]}</h2><div style={{color:'#4b5563',fontSize:14}}>{range(lang,nx)}</div><p>{(lang==='hi'?nx.hi:nx.en)[1]}</p><Link className="btn" to={'/festivals/'+nx.slug}>{t('fest.read')}</Link></section>
 {Object.entries(groups).map(([m,fs])=><div key={m} style={{margin:'26px 0 0 8px'}}><div style={{color:'#94a3b8',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',fontSize:14,margin:'0 0 14px 30px'}}>{m}</div>
  {fs.map(f=><Link key={f.slug} to={'/festivals/'+f.slug} style={{display:'flex',gap:6,padding:'8px 0 12px 8px',alignItems:'flex-start'}}><Dot c={f.color}/><div><b style={{color:'var(--brown)',fontSize:19}}>{(lang==='hi'?f.hi:f.en)[0]}</b>{f===nx&&<span className="chip" style={{marginLeft:8,fontSize:12,padding:'1px 10px',background:'#fef9c3'}}>{t('fest.coming')}</span>}<div style={{fontSize:13,color:'#6b7280'}}>{range(lang,f)}</div><div style={{fontSize:15,color:'#374151'}}>{(lang==='hi'?f.hi:f.en)[1]}</div></div></Link>)}</div>)}
 </>:<p>{t('fest.none')}</p>}
 <div className="note" style={{marginTop:30}}>{t('fest.src')}</div></div>}

export function Festival(){const {slug}=useParams();const {t,lang}=useI();const {d}=useVerses();const f=FESTS.find(x=>x.slug===slug);
 if(!f)return <div className="wrap"><h1>{t('fest.notfound')}</h1></div>;const x=lang==='hi'?f.hi:f.en;const [c,v]=f.verse.split('.').map(Number);const vs=d?.find(z=>z.c===c&&z.v===v);
 return <div className="wrap"><p className="crumb"><Link to="/">{t('home')}</Link> › <Link to="/festivals">{t('fest.title')} 2026-2027</Link> › {x[0]}</p>
 <h1 style={{textAlign:'left',color:'var(--brown)'}}><Dot c={f.color}/>{x[0]}</h1><p style={{color:'#374151',fontSize:17,margin:'0 0 16px'}}>{x[1]}</p>
 <div className="card" style={{padding:'14px 18px',background:'transparent'}}><b style={{color:'var(--text)'}}>{t('fest.date')}:</b> {range(lang,f)}</div>
 <h2 style={{fontSize:22}}>{t('fest.story')}</h2><p style={{fontSize:17}}>{x[2]}</p>
 <h2 style={{fontSize:22}}>{t('fest.observed')}</h2><ul style={{fontSize:16}}><li>{x[3]}</li><li>{x[4]}</li></ul>
 <h2 style={{fontSize:22}}>{t('fest.sig')}</h2><ul style={{fontSize:16}}><li>{x[5]}</li></ul>
 <section className="card" style={{marginTop:24}}><h2 style={{fontSize:20,color:'#000'}}>{t('fest.gita')}</h2><div className="bar"><span/><VerseLang/></div>
 {vs&&<div style={{borderLeft:'4px solid #fdba74',paddingLeft:14}}><VText v={vs}/><small style={{color:'#6b7280'}}>Bhagavad Gita {f.verse}</small></div>}
 <p style={{display:'flex',gap:10,flexWrap:'wrap'}}><Link className="btn" to={'/chat?q='+encodeURIComponent(x[0])}><MessageCircle size={14}/> {t('fest.ask')} {x[0]}</Link><Link className="btn o" to={`/verses/chapter-${c}-verse-${v}`}><BookOpen size={14}/> {t('fest.readv')} {f.verse}</Link></p></section>
 <div className="note">{t('fest.src')}</div></div>}

export function Lesson(){const {slug}=useParams();const {t,lang}=useI();const {d}=useVerses();const l=LESSONS.find(x=>x.slug===slug);
 if(!l)return <div className="wrap"><h1>{t('notfound')}</h1></div>;const x=lang==='hi'?l.hi:l.en;
 return <div className="wrap"><p className="crumb"><Link to="/">{t('home')}</Link> › {t('foot.lessons')}</p><h1>{x.t}</h1><p className="sub">{x.intro}</p>
 <section className="card"><h2>{t('lesson.points')}</h2><ul>{x.pts.map(p=><li key={p}>{p}</li>)}</ul></section>
 <div className="bar"><b>{t('lesson.verses')}</b><VerseLang/></div><section className="card">{!d?<p>{t('loading')}</p>:l.verses.map(r=>{const [c,v]=r.split('.').map(Number);const vs=d.find(z=>z.c===c&&z.v===v);return vs&&<div className="row" key={r}><Link className="n" to={`/verses/chapter-${c}-verse-${v}`}>{r}</Link><VText v={vs}/></div>})}</section>
 <p style={{display:'flex',gap:10,flexWrap:'wrap'}}><Link className="btn" to={'/verses/chapter-'+l.ch}>{t('lesson.chapter')}</Link><Link className="btn o" to={'/chat?q='+encodeURIComponent(x.t)}>{t('lesson.ask')}</Link></p></div>}

export function Terms(){const {t}=useI();return <div className="wrap"><h1>{t('terms.title')}</h1><section className="card"><ol style={{paddingLeft:20}}>{[1,2,3,4,5].map(i=><li key={i} style={{margin:'10px 0'}}>{t('terms.'+i)}</li>)}</ol></section></div>}
