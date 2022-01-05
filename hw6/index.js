const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');
const console = require('console');


const server = http.createServer((_req, res)=>{
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);



io.on('connection', client => {
    let clientName = '';
    client.on('client-connect', ()=>{
        const newName = 'Ivan'+ Math.floor(Math.random()*100000);
        clientName = newName;
        const payload = {
            name: newName
        };
        //console.log(payload);
        client.broadcast.emit('server-connect-newuser',payload);
        client.emit('server-connect', payload);
    });
        //console.log('connetion');
        client.on('client-msg', (data)=>{
            const payload = {
                name: data.name,
                message: data.message.split('').reverse().join(''),
            };
            //console.log(payload);
            client.broadcast.emit('server-msg-other',payload);
            client.emit('server-msg', payload);
        });

        client.on('disconnect', ()=>{
            //console.log('disc ',clientName);
            client.broadcast.emit('server-disconnect', clientName);
            client.emit('server-disconnect', clientName);
        })

});

server.listen(5555);