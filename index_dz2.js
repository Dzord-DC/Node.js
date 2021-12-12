//1,5,6,2,3,4
const { time } = require('console');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const datesArray = process.argv.slice(2);
let [hh, dd, mm, yy] = [];
let timerArray = [];

console.log(datesArray);

const getOneDate=(item)=>{
    const date = item.split('-', 4);
    [hh, dd, mm, yy] = date;
}

const convertToDate = (sec)=>{
    let time = [];
    let r = sec;
    time[0] = Math.floor((r / 86400) % 10000);
    r = r - time[0] * 86400;
    time[1] = Math.floor((r / 3600) % 100);
    r = r - time[1] * 3600;
    time[2] = Math.floor((r / 60));
    r = r - time[2] * 60;
    return `${time[0]}:${time[1]}:${time[2]}:${r}`
}

const appdataTimets = ()=>{
    for(let i=0; i<datesArray.length; i++){
        getOneDate(datesArray[i]);
        const date = new Date(yy, mm-1, dd, hh);
        let now = new Date();
        let seconds = Math.floor(date.getTime()/1000-now.getTime()/1000);
        if (seconds <= 0){
            timerArray[i] = 'таймер сработал'
        } else {
            timerArray[i] = convertToDate(seconds);
        }
        
    }
}

const run = async()=>{
    appdataTimets()
    const payload = timerArray
    emitter.emit('timer', payload);

    await new Promise(resolve => setTimeout(resolve, 1000));
    await run();
}


emitter.on('timer', console.log);

run();