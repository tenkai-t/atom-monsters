const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
const files=fs.readdirSync(__dirname).filter(n=>n.endsWith('.cjs')&&n!=='run.cjs').sort();
let failures=0;for(const name of files){const result=spawnSync(process.execPath,[path.join(__dirname,name)],{encoding:'utf8'});process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');if(result.status!==0){failures++;console.error('FAIL',name)}}
console.log(`${files.length} suites, ${failures} failures`);process.exitCode=failures?1:0;
