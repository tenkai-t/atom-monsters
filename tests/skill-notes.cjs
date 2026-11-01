const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements=new Map(),store=new Map();function el(id){if(!elements.has(id)){const e={innerHTML:'',textContent:'',value:'',dataset:{},open:false,style:{setProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false}},querySelector(){return el(id+' child')},querySelectorAll(){return[]},insertAdjacentHTML(){},appendChild(){},after(){},remove(){},setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},clientWidth:390,clientHeight:430,firstChild:{style:{}},getBoundingClientRect(){return{left:0,top:0}},setPointerCapture(){}};elements.set(id,e)}return elements.get(id)}
const ctx={console,Blob,Response,CompressionStream,DecompressionStream,Uint8Array,btoa,atob,escape,unescape,performance:{now:()=>10},document:{getElementById:el,querySelector:el,querySelectorAll:()=>[],createElement:()=>el('new'),body:el('body'),addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},location:{hash:''},navigator:{},addEventListener(){},setInterval(){},setTimeout:fn=>{fn();return 1},requestAnimationFrame:()=>1,cancelAnimationFrame(){}};ctx.window=ctx;vm.createContext(ctx);const run=s=>vm.runInContext(s,ctx);run(fs.readFileSync(__dirname+'/../index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1]);const test=(name,fn)=>{fn();console.log('PASS',name)};


run("newG();S='train';var subject=G.r[0];gsk(subject);subject.sk=Object.keys(SKL);subject.pt={speed:8,def:3};");
const before=run('JSON.stringify(G)');
for(const key of run('Object.keys(SKL)')){
 run(`HD.sd(subject.u+'.${key}')`);
 const html=el('skillDetailDialog').innerHTML;
 assert(html.includes(run(`SKL['${key}'].n`)));
 for(const move of run(`SKL['${key}'].mv`)){assert(html.includes(move.n));assert(html.includes('習得 '+move.at+' SP'));assert(html.includes('消費MP '+move.mp));}
 assert(!html.includes('効果の説明は未登録'));
 run("HD.sd('close')");assert.equal(el('skillDetailDialog').open,false);
}
assert.equal(run('JSON.stringify(G)'),before);console.log('PASS every skill opens with all moves, SP, MP and effects without changing player data');
const speed=run("skillDetailHTML(subject,'speed')");assert(speed.includes('0.8倍で2回攻撃'));assert(speed.includes('✓ 習得済み'));
const defense=run("skillDetailHTML(subject,'def')");assert(defense.includes('50％軽減'));assert(defense.includes('75％軽減'));assert(defense.includes('あと5SP'));
assert(run("skillDetailHTML(subject,'heal').includes('味方全員')"));assert(run("skillDetailHTML(subject,'revive').includes('50％の確率')"));assert(run("skillDetailHTML(subject,'elec').includes('物理扱い')"));assert(run("skillDetailHTML(subject,'phase').includes('金・プラチナには無効')"));console.log('PASS descriptions reflect actual double strike, guards, group healing, revival and electric calculation');
const ui=run('skUI(subject)');assert(ui.includes("data-a='sd:"));assert(ui.includes("data-a='sp:"));assert(ui.includes("data-a='cr:"));console.log('PASS skill details, point allocation and crystals remain distinct buttons');
const manifest=JSON.parse(fs.readFileSync(__dirname+'/../manifest.webmanifest','utf8'));assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./');for(const icon of manifest.icons){assert(fs.existsSync(__dirname+'/../'+icon.src));}const html=fs.readFileSync(__dirname+'/../index.html','utf8');assert(html.includes('rel="apple-touch-icon"'));console.log('PASS home-screen PNG icons and manifest use repository-relative paths');
