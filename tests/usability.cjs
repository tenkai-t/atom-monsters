const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(__dirname+'/../index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
function engine(initial){const elements=new Map(),store=new Map(initial||[]);function el(id){if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',value:'',dataset:{},open:false,style:{setProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false}},querySelector(){return el(id+' child')},querySelectorAll(){return []},insertAdjacentHTML(){},prepend(){},appendChild(){},after(){},remove(){},setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},clientWidth:390,clientHeight:430,firstChild:{style:{}},getBoundingClientRect(){return {left:0,top:0}},setPointerCapture(){}});return elements.get(id);}
 const context={console,Blob,Response,CompressionStream,DecompressionStream,Uint8Array,btoa,atob,escape,unescape,performance:{now:()=>10},document:{getElementById:el,querySelector:el,querySelectorAll:()=>[],createElement:()=>el('new'),body:el('body'),addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},location:{hash:''},navigator:{},addEventListener(){},setInterval(){},setTimeout:fn=>{fn();return 1},requestAnimationFrame:()=>1,cancelAnimationFrame(){}};context.window=context;vm.createContext(context);const run=s=>vm.runInContext(s,context);run(source);run("say=async()=>{};sfx=()=>{};flash=()=>{};fx=()=>{};tsfx=()=>{};anim=async()=>{};ex=()=>{};pop=()=>{};Math.random=()=>.5;");return {run,store,el};}
const pass=name=>console.log('PASS',name);
(async()=>{
const a=engine(),r=a.run;
r("newG();G.r.forEach(m=>{m.hp=mx(m);m.mp=mpmax(m)});fight({id:'C',lv:1,x:100,y:500});tac('c');var originalHP=G.r.map(m=>m.hp).join();");
assert(r("battleUnit(B3.P[0],'p',0).includes('指示中')"));
r("push('df');push('df');push('df')");assert.equal(r('B3.ph'),'review');assert.equal(r('G.r.map(m=>m.hp).join()'),r('originalHP'));assert.equal(r('B3.cmds.length'),3);pass('three commands wait for explicit start; selection does not run the turn');
const saved=a.store.get('am1');const b=engine([['am1',saved]]);assert.equal(b.run('B3.ph'),'review');assert.equal(b.run('B3.cmds.length'),3);pass('review phase and commands survive validated reload');
r("HD.bback();");assert.equal(r('B3.ph'),'cmd');assert.equal(r('B3.ci'),2);assert.equal(r('B3.cmds.length'),2);
r("B3.pend='atk';HD.bback()");assert.equal(r('B3.pend'),null);assert.equal(r('B3.cmds.length'),2);pass('back clears pending target before undoing prior command');
r("B3.ph='tac';B3.cmds=[];HD.bond()");assert(r("B3.ph==='review'||B3.pend==='sc'"));assert(r("MVH(B3,B3.P[0]).includes('固有技')"));pass('bond is a party operation and innate/learned skills share one menu');
console.log('ALL USABILITY CHECKS PASSED');
})().catch(e=>{console.error(e);process.exitCode=1});
