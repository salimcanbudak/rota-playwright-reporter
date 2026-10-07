const fs = require('node:fs');
const path = require('node:path');
const { render } = require('../src/render.cjs');
const folder = path.resolve('demo-report');fs.mkdirSync(folder,{recursive:true});
const projects = [['Chromium',13600],['Firefox',10600],['WebKit',20900]];
const data = { title:'Test Raporu · Tasarım demosu', status:'failed', startTime:'2026-10-07T07:22:54Z', duration:21800, globalErrors:[], warnings:['Bu demo örnek hata ve adım verileri içerir.'], tests:projects.map(([project,duration],i)=>({id:String(i),key:'service:3',title:'Servisler Sayfası',file:'service.spec.ts',line:3,project,tags:['@smoke'],outcome:'unexpected',expectedStatus:'passed',annotations:[],attempts:[{retry:0,status:'failed',duration,errors:[{message:'Başlık beklenen sürede görünmedi\nexpect(locator).toBeVisible()\nTimeout: 5000ms',snippet:"await expect(page.getByRole('heading', { name: 'Servisler' })).toBeVisible();",stack:''}],steps:[{title:'Sayfa açılır',duration:1200,steps:[]},{title:'Servisler menüsüne tıklanır',duration:400,steps:[]},{title:'Servisler başlığı doğrulanır',duration:5000,error:{message:'Başlık bulunamadı'},steps:[]}],attachments:[],stdout:'',stderr:''}]}))};
fs.writeFileSync(path.join(folder,'index.html'),render(data));console.log(folder);
