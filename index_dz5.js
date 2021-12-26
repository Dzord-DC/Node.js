const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

//const filePath = path.join(__dirname, 'index.html');
//const readStream = fs.createReadStream(filePath);

//const server = http.createServer((req, res)=>{
    //res.end('Hello!');
    //console.log('url: ', req.url);
    //console.log('method: ', req.method);
    /*res.setHeader('some-heder', 'some-value');
    res.writeHead(200, 'ok',{
        'test-head': 'test-value'
    })
    res.end();*/
   
   /* if (req.url === '/user'){
        res.write('user found');
        res.end();
    } else {
        res.writeHead(404, ' User not found');
        res.write('User not found');
        res.end();
    }*/
     
    //Method
    /*if (req.method === 'GET'){
        res.write('hello');
        res.end();
    } else {
        res.writeHead(405, 'not allowed');
        res.write('not allowed');
        res.end();
    }*/

    /*if (req.method === 'POST') {
        let data = '';
        req.on ('data', chunk => data += chunk);
        req.on('end', () => {
            console.log(data);
            console.log(JSON.parse(data));
            res.writeHead(200, 'ok',{
                'Content-Type': 'application/json'
            })
            res.end(data);

        })
    }*/

   /* const {query} = url.parse(req.url, true);
    console.log(query);
    const {user, account} = query;

    res.end(user);*/

   /* if (req.method ==='GET'){
        res.writeHead(200, 'ok', {
            'Content-Type': 'text/html'
        });
        readStream.pipe(res);
    }*/
//});



const isFile = (path)=> fs.lstatSync(path).isFile();
let executionDir = process.cwd();
let list = fs.readdirSync(executionDir);
const trimEnd =(link)=> {
    const arrayLink = link.split("\ ");
}
let grendDir = executionDir;


const server = http.createServer((req, res)=>{
    //res.write();
    grendDir = executionDir;
    let oneTick = true;
    res.write(`<p>${executionDir}</p>`);
    const run= ()=>{
        
       
        if(!isFile(executionDir)){
            if(oneTick){
                console.log(oneTick);
                list = fs.readdirSync(executionDir);
    
        for(let i = 0; i<= list.length-1; i++){
            res.write(`<a href='/${executionDir}/${list[i]}'>${list[i]} </a></br>`);
        } }
       
         if(!(req.url==='/favicon.ico')){
                executionDir = path.join(req.url.slice(1));                    
                if(executionDir=="."){
                    executionDir=grendDir;
                }
                console.log(req.url);
                console.log(executionDir);
                if (!grendDir == executionDir){
                    run();
                }
                
        }
            }
            
        
        
        if(isFile(executionDir)) {
            const data = fs.readFileSync(executionDir, 'utf-8');
            res.end(data);
                }
        if(!isFile(executionDir) && !grendDir == executionDir || oneTick){
            
            oneTick = false;
            run();
        }
    }

        run();
   
    res.end();

});

server.listen(5555);