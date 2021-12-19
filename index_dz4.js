const fs = require('fs');
const yargs = require('yargs');
const readline = require('readline');
const inquirer = require('inquirer');
const path = require('path')

/*const [path] = process.argv.slice(2);
const data= fs.readFileSync(path, 'utf-8');
console.log(data)
const options = yargs.usage('Usage; -p <path to the file>')
.option('p', {
    alias: 'path',
    discribe:'Path to the file',
    type: 'string',
    demandOption: true,
}).argv;

const data= fs.readFileSync(options.p, 'utf-8');
console.log(data);*/

/*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});*/

/*rl.question('Введите путь до файла', filePath=>{
    console.log(filePath);
    rl.question('Введите кодировку файла', encoding=>{
        console.log(encoding);
        rl.close();
    })
})*/
/*const question = async(question) => new Promise(resolve => rl.question(question, resolve));
 
(async()=>{
    const filePath = await question('введите путь');
    const encoding = await question('введите кодировку');
    const date = fs.readFileSync(filePath, encoding);
    console.log(date);
    rl.close();
})();*/

let hendlePath = process.argv.slice(2)[0];
//const data= fs.readFileSync(path, 'utf-8');
//hendlePath = 'C:\\Users\\zik-e\\Desktop\\Проги';
console.log(hendlePath);

let executionDir = process.cwd();
console.log(executionDir);

if(hendlePath){
    executionDir= hendlePath;
}
const isFile = (path)=> fs.lstatSync(path).isFile();

const run =()=>{       
    const list = fs.readdirSync(executionDir)
    // console.log(list);
    inquirer.prompt([
        {
            name:'name',
            type: 'list', // input,number, list, confirm, checkbox, password
            message: 'Выбирите файл: ',
            // choices: ['q','w','e','r','t'],
            choices: list
        }
    ]).then(({name})=> {
        executionDir = path.join(executionDir, name);
        //const data = fs.readFileSync(fullPath, 'utf-8');
        console.log(isFile(executionDir));
        if(!isFile(executionDir)){
            run();
        }else{
            const data = fs.readFileSync(executionDir, 'utf-8');
            //console.log(data);
            search(data);
        }
});}

const search =(data)=>{
    /**
     * функция поиска совпадений в файле
    */
    inquirer.prompt([
        {
            name:'find',
            type: 'input', // input,number, list, confirm, checkbox, password
            message: 'Введите строку для поиска в файле: ',
            // choices: ['q','w','e','r','t'],
            //choices: list
        }
    ]).then(({find})=>{
        if(find){
            let pos = 0;
            let overlap = 0;
            while(true){
                let foundPos = data.indexOf(find, pos);
                if(foundPos == -1){break};
                overlap++;
                pos = foundPos + 1;
            }
            console.log('Найдено совпадений: ' + overlap)
        }else{
            console.log(data);
        }
    })
}

run();