import {useEffect,useState} from 'react';
export type Verse={c:number;v:number;sa:string;tr:string;en:string;hi:string};
export type Chap={n:number;sa:string;count:number};
const B=import.meta.env.BASE_URL+'data/';
const cache:Record<string,Promise<any>>={};
const get=(f:string)=>cache[f]??(cache[f]=fetch(B+f).then(r=>{if(!r.ok)throw 0;return r.json()}));
export function useData<T>(f:string){const [d,s]=useState<T|null>(null);const [e,se]=useState(false);useEffect(()=>{get(f).then(s,()=>se(true))},[f]);return {d,e}}
export const useVerses=()=>useData<Verse[]>('verses.json');
export const useChapters=()=>useData<Chap[]>('chapters.json');
export const CH_EN=["Arjuna's Grief","The Path of Knowledge","The Path of Action","Knowledge and Renouncing Action","The Path of Renunciation","The Path of Meditation","Knowledge and Wisdom","The Imperishable Absolute","The Royal Secret","Divine Glories","The Vision of the Universal Form","The Path of Devotion","The Field and Its Knower","The Three Qualities of Nature","The Supreme Person","Divine and Demonic Natures","The Three Kinds of Faith","Freedom Through Renunciation"];
export const TOPICS:{slug:string;k:string;refs:string[];kw:string[]}[]=[
{slug:'anxiety',k:'t.anxiety',refs:['6.35','6.26','2.14','6.19','18.66'],kw:['anxiety','anxious','worry','overthink','calm','restless','mind','चिंता']},
{slug:'stress',k:'t.stress',refs:['2.47','2.48','3.8','5.12'],kw:['stress','exam','result','work','pressure','target','तनाव','परिणाम']},
{slug:'anger',k:'t.anger',refs:['2.62','5.23','17.15','16.3'],kw:['anger','angry','rage','क्रोध','गुस्सा']},
{slug:'grief',k:'t.grief',refs:['2.11','2.13','2.22','2.27','18.66'],kw:['grief','loss','death','sad','sorrow','pain','शोक','दुख']},
{slug:'fear',k:'t.fear',refs:['2.40','4.10','16.1','12.15','18.58'],kw:['fear','afraid','scared','future','भय','डर']},
{slug:'self-doubt',k:'t.doubt',refs:['6.5','2.3','6.40','14.24'],kw:['doubt','fail','failure','confidence','worthless','stuck','असफल']},
{slug:'purpose',k:'t.purpose',refs:['2.7','3.35','18.47','18.63'],kw:['purpose','dharma','duty','choice','decision','career','confused','कर्तव्य','धर्म']},
{slug:'peace-of-mind',k:'t.peace',refs:['2.66','6.7','4.39','5.29'],kw:['peace','calm','happiness','shanti','शांति']},
{slug:'detachment',k:'t.detach',refs:['2.47','3.19','5.10','2.56'],kw:['detach','attachment','letting','release','अनासक्ति']},
{slug:'relationships',k:'t.family',refs:['12.13','17.15','6.9','3.21'],kw:['family','parent','partner','friend','relationship','love','परिवार','रिश्ते']}];
export const vid=(c:number,v:number)=>`${c}.${v}`;
