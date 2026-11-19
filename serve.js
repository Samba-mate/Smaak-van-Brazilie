// Lokale server die net als Netlify "/verhaal" naar "verhaal.html" vertaalt.
const http=require('http'),fs=require('fs'),path=require('path');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'};
const port=process.env.PORT||8080;
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]).replace(/\/+$/,'')||'/index';
  let f=path.join(__dirname,p);
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory()) f+='.html';
  if(!f.startsWith(__dirname)||!fs.existsSync(f)){res.writeHead(404);return res.end('Not found');}
  res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});
  fs.createReadStream(f).pipe(res);
}).listen(port,()=>console.log('http://localhost:'+port));
