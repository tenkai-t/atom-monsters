const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(__dirname+'/../index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
function engine(initial){const elements=new Map(),store=new Map(initial||[]);function el(id){if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',value:'',dataset:{},open:false,style:{setProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false}},querySelector(){return el(id+' child')},querySelectorAll(){return []},insertAdjacentHTML(){},prepend(){},appendChild(){},after(){},remove(){},setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},clientWidth:390,clientHeight:430,firstChild:{style:{}},getBoundingClientRect(){return {left:0,top:0}},setPointerCapture(){}});return elements.get(id);}
 const context={console,Blob,Response,CompressionStream,DecompressionStream,Uint8Array,btoa,atob,escape,unescape,performance:{now:()=>10},document:{getElementById:el,querySelector:el,querySelectorAll:()=>[],createElement:()=>el('new'),body:el('body'),addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},location:{hash:''},navigator:{},addEventListener(){},setInterval(){},setTimeout:fn=>{fn();return 1},requestAnimationFrame:()=>1,cancelAnimationFrame(){}};context.window=context;context.innerWidth=390;vm.createContext(context);const run=s=>vm.runInContext(s,context);run(source);run("say=async()=>{};sfx=()=>{};flash=()=>{};fx=()=>{};tsfx=()=>{};anim=async()=>{};ex=()=>{};pop=()=>{};Math.random=()=>.5;");return {run,store,el};}

(async()=>{
const a=engine(),r=a.run;
r('newG();S="field";');assert.equal(r('rematchPanel()'),'');r('HD.rematch("start.b.0")');assert.equal(r('B3'),null);
for(let region=0;region<8;region++)for(const k of ['m','b']){
 r(`newG();G.rg=${region};G.bk={'${region}:${k}':1};S='field';G.r[0].lv=99;G.r[0].hp=mx(G.r[0]);`);
 assert(r(`rematchPanel().includes('ask.${k}.0')`));
 for(let tier=0;tier<3;tier++){
  r(`S='field';HD.rematch('ask.${k}.${tier}')`);assert(a.el('rematchDialog').open);assert.equal(r('B3'),null);
  const px=r('G.px');r('loop(50)');assert.equal(r('G.px'),px);
  r(`HD.rematch('start.${k}.${tier}')`);assert.equal(r('B3.Ep.length'),3);assert.equal(r('B3.ref.lv'),r(`rematchLevel('${k}',${tier})`));assert(r('B3.Ep.every(e=>e.lv<=99)'));
  r('var restored=normalizeSave(JSON.parse(JSON.stringify(saveEnvelope())));installSave(restored)');assert.equal(r('B3.ref.rematch'),true);
  const sp=r('G.r[0].s'),gold=r('G.g');r('B3.Ep.forEach(e=>e.hp=0)');await r('win3()');assert.equal(r('G.r[0].s'),sp);assert(r('G.g')>gold);assert.equal(r(`G.bk['${region}:${k}']`),1);assert(r("msg.includes('強化版を撃破')"));assert.equal(r('bossHTML().includes("id=\'bs'+k+'\'")'),false);
 }
}
r("newG();S='field';G.r[0].lv=99;G.r[0].hp=mx(G.r[0]);fight({id:BOSS[0][1],lv:5,boss:'b'});var before=G.r[0].s;B3.Ep.forEach(e=>e.hp=0)");await r('win3()');assert.equal(r('G.r[0].s'),r('before+3'));
r("HD.rematch('start.b.0')");await r('lose3()');assert.equal(r("G.bk['0:b']"),1);assert(r("rematchPanel().includes('ask.b.0')"));
console.log('PASS 48 regional rematches: unlock, confirmation, pause, levels, save/resume, rewards, no repeated SP; first clear and defeat retry');
})().catch(e=>{console.error(e);process.exitCode=1});
