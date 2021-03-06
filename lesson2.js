const EventEmitter = require('events');
const emitter = new EventEmitter();


const RequestTypes = [{
    type: 'send',
    payload: 'to send a document'
},
{
    type: 'receive',
    payload: 'to receive a document'
},
{
    type: 'sign',
    payload: 'to sing a document'
}];

class Customer{
    constructor({type, payload}){
        this.type = type;
        this.payload = payload;
    }
}

const generateIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateNewCustomer = () => {
    const randomTypeIndex = generateIntInRange(0, RequestTypes.length-1);
    const randomType = RequestTypes[randomTypeIndex];

    return new Customer(randomType);
}

const run = async()=>{
    const {type, payload} = generateNewCustomer();
    //console.log(customer);

    emitter.emit(type, payload);

    const delay = generateIntInRange(1000, 5000);
    await new Promise(resolve => setTimeout(resolve, delay));
    await run();
}

class Hendler {
    static send(payload){
        console.log('Send request', payload);
    }
    static receive(payload){
        console.log('Receive request', payload);
    }
    static sign(payload){
        //console.log('Sign request', payload);
        emitter.emit('error', 'Broken pen!');
    }
}


/*emitter.on('test', ()=>{
    console.log('Test!');
});
emitter.emit('test');*/

emitter.on('send', Hendler.send);
emitter.on('receive', Hendler.receive);
emitter.on('sign', Hendler.sign);
emitter.on('error', console.log);

run();