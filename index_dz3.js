const fsPromises = require('fs/promises');
const fs = require('fs');
const ACCESS_LOG = './logs/access-test.log';
const LOG_WRITE1 = './logs/access-test2.log';
const LOG_WRITE2 = './logs/access-test3.log';
const {Transform} = require('stream');

/*fsPromises.readFile(ACCESS_LOG, {encoding: 'utf-8'}).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
});*/

/*fs.writeFile(
    LOG_WRITE,
    '89.123.1.41 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0" '+'\n',
    {encoding:'utf-8',
    flag:'a'
    },
    (err)=> {
        if(err){console.log(err)}

    }
);*/
/*const requests = [
    '89.123.1.41 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0" ',
    '89.123.1.41 - - [30/Jan/2021:11:11:20 -0300] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0" '
]
//fs.createReadStream
const readStream = fs.createReadStream(ACCESS_LOG, {
    flags: 'r',
    encoding: 'utf-8',
    //autoClose
    //start
    //end
    highWaterMark:64,
});

readStream.on('data', chunk=>console.log('chunk',chunk));

const writeStream = fs.createWriteStream(LOG_WRITE,
    {encoding: 'utf-8',
flags: 'a'});

requests.forEach(logSting => {
    writeStream.write(logSting + '\n');
})*/

const ipSearch1 = '89.123.1.41';
const ipSearch2 = '34.48.240.111';

const writeStream1 = fs.createWriteStream(`./logs/${ipSearch1}_requests.log`,
    {encoding: 'utf-8',
flags: 'a'});

const writeStream2 = fs.createWriteStream(`./logs/${ipSearch2}_requests.log`,
    {encoding: 'utf-8',
flags: 'a'});

const readStream = fs.createReadStream(ACCESS_LOG);
const tStream = new Transform({
    transform(chunk){
        const search = chunk
        .toString().split('\n')
        search.forEach(string=>{
            if(string.includes(ipSearch1)){
                //console.log(string);
                writeStream1.write(string);
            }
            if(string.includes(ipSearch2)){
                writeStream2.write(string);
            }
        })
    }
});



readStream.pipe(tStream).pipe(process.stdout);