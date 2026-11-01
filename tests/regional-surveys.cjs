const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements=new Map(),store=new Map();function el(id){if(!elements.has(id)){const e={innerHTML:'',textContent:'',value:'',dataset:{},open:false,style:{setProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false}},querySelector(){return el(id+' child')},querySelectorAll(){return[]},insertAdjacentHTML(){},appendChild(){},after(){},remove(){},setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},clientWidth:390,clientHeight:430,firstChild:{style:{}},getBoundingClientRect(){return{left:0,top:0}},setPointerCapture(){}};elements.set(id,e)}return elements.get(id)}
const ctx={console,Blob,Response,CompressionStream,DecompressionStream,Uint8Array,btoa,atob,escape,unescape,performance:{now:()=>10},document:{getElementById:el,querySelector:el,querySelectorAll:()=>[],createElement:()=>el('new'),body:el('body'),addEventListener(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},location:{hash:''},navigator:{},addEventListener(){},setInterval(){},setTimeout:fn=>{fn();return 1},requestAnimationFrame:()=>1,cancelAnimationFrame(){}};ctx.window=ctx;vm.createContext(ctx);const run=s=>vm.runInContext(s,ctx);run(fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8').split('<script>')[1].split('</script>')[0]);const test=(name,fn)=>{fn();console.log('PASS',name)};

(async()=>{
// Simulate a pre-update save with a completed, already rewarded first-region survey.
run("G.explore={alkaliV1:{found:{mineral:true,circuit:true,archive:true},claimed:true}};let preservedFirst=JSON.stringify(G.explore.alkaliV1);let baseline=G.r.map(m=>m.s)");
for(let rg=0;rg<8;rg++){
run(`G.rg=${rg};CT=terrain(${rg});S='field';G.px=360;G.py=800;G.r.forEach(m=>m.p=0);var h=G.r.find(m=>m.id==='C')||add('C',30,0);h.p=1;h.lv=30;h.hp=mx(h);fieldUI()`);
assert.equal(run('regionResearch().points.length'),3);assert(run('researchPoints().every(p=>!blk(p.x,p.y,16))'));
for(let i=0;i<3;i++){
run(`let point${rg}_${i}=regionResearch().points[${i}];G.px=point${rg}_${i}.x;G.py=point${rg}_${i}.y;inspectResearch()`);
if(run(`!!point${rg}_${i}.question`)&&rg!==0){const correct=run(`point${rg}_${i}.correct`);run(`HD.survey('answer.${(correct+1)%3}')`);assert(run(`!researchState().found[point${rg}_${i}.id]`));run(`HD.survey('answer.${correct}')`);}
assert(run(`!!researchState().found[point${rg}_${i}.id]`));run('closeResearch()');}
assert.equal(run('researchCount()'),3);run("G.px=360;G.py=850;var beforeRegionSP=party()[0].s;HD.survey('claim');closeResearch()");assert.equal(run('party()[0].s-beforeRegionSP'),rg===0?0:3);run("HD.survey('claim');closeResearch()");assert.equal(run('party()[0].s-beforeRegionSP'),rg===0?0:3);
assert(run('fieldBackdrop().includes("<svg")'));assert(run('researchMapDots().includes("research-dot")'));
// Every observation must be physically reachable from the base once its existing gate condition is met.
assert(run(`(()=>{G.r.forEach(m=>m.p=0);for(const id of ['Au','Pt',REGG[G.rg].id||'H']){let m=G.r.find(x=>x.id===id)||add(id,30,0);m.p=1;}const seen=new Set(),q=[[360,804]];for(let n=0;n<q.length;n++){const[x,y]=q[n];for(const[dx,dy]of[[12,0],[-12,0],[0,12],[0,-12]]){const nx=x+dx,ny=y+dy,key=nx+','+ny;if(nx<24||nx>696||ny<24||ny>936||seen.has(key)||blk(nx,ny,16))continue;seen.add(key);q.push([nx,ny]);}}return regionResearch().points.every(p=>q.some(([x,y])=>Math.hypot(x-p.x,y-p.y)<24));})()`));
console.log('PASS region',rg,'landmarks, puzzle, report, repeated claim, map and reachable paths');
}
assert(run('JSON.stringify(G.explore.alkaliV1)===preservedFirst'));assert.equal(run('Object.values(G.explore).filter(x=>x.claimed).length'),8);console.log('PASS independent regional flags; first-region progress preserved');
await run('codeOut()');el('sc').value=run('SCODE');await run('codeIn()');assert.equal(run('Object.values(G.explore).filter(x=>x.claimed).length'),8);console.log('PASS all region states survive AM2 export/import');
run("save();let beforeReload=JSON.stringify(G.explore);load()");assert(run('JSON.stringify(G.explore)===beforeReload'));console.log('PASS all region states survive browser save/load');
for(const s of ['field','map','fuse','party','train','shop','zukan','save'])run(`nv('${s}')`);console.log('PASS all screens after regional completion');
})().catch(e=>{console.error(e);process.exitCode=1});
