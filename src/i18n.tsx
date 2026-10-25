import {createContext,useContext,useEffect,useState,ReactNode} from 'react';
import en from './locales/en.json';import hi from './locales/hi.json';
const D:Record<string,Record<string,string>>={en,hi};
export type VL='sa'|'hi'|'en';
const ls=(k:string,d:string)=>{try{return localStorage.getItem(k)||d}catch{return d}};
const Ctx=createContext<any>(null);
export function I18n({children}:{children:ReactNode}){
 const [lang,setLang]=useState(ls('lang','en'));const [vlang,setVlang]=useState<VL>(ls('vlang','sa') as VL);
 useEffect(()=>{document.documentElement.lang=lang;try{localStorage.setItem('lang',lang)}catch{}},[lang]);
 useEffect(()=>{try{localStorage.setItem('vlang',vlang)}catch{}},[vlang]);
 const t=(k:string)=>D[lang][k]??D.en[k]??k;
 return <Ctx.Provider value={{lang,setLang,vlang,setVlang,t}}>{children}</Ctx.Provider>}
export const useI=():{lang:string;setLang:(l:string)=>void;vlang:VL;setVlang:(v:VL)=>void;t:(k:string)=>string}=>useContext(Ctx);
