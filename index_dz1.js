//console.log(process.argv)
const args = process.argv.slice(2);
let [arg1, arg2] = args;
arg1 = +arg1;
arg2 = +arg2;
const colors = require('colors');
let primeNumber = false;
let i =0;

const colorSelection= (i,arg)=>{
    switch (i%3){
        case 0:
            return console.log(colors.green(`${arg}`));
        case 1: 
             return console.log(colors.yellow(`${arg}`));
        case 2: 
             return console.log(colors.red(`${arg}`));
     }
}
const searchPrimeNumber = (arg)=>{
    if (arg<2){
        return true;
    }
    for(let j=2;j < arg; ++j ){
        if(arg%j===0){
            return true;
        }
    }
    return false;
}

if(arg1 && arg2){
    for(let num = arg1; num <= arg2; num++){
        primeNumber=searchPrimeNumber(num);
        if(!primeNumber){
            colorSelection(i,num);
            ++i;
        }
        primeNumber=false;
    }
}else{
    console.error(colors.red('не число'));
}
if(i===0){
    console.log(colors.red(`Простых чисел нет`));
}


