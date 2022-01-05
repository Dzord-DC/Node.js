const worker_threads = require('worker_threads');

const generatePassword = (size)=>{
    return new Promise((res, rej) => {
        const worker = new worker_threads.Worker('./worker.js', {
            workerData: size,
        } );
        worker.on('message', res);
        worker.on('error', rej);
    });
};

(async ()=> {
    const passwordBytesSize = 4;
    const password = await generatePassword(passwordBytesSize);

    console.log(password);
})();