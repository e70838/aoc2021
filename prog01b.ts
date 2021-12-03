//$(npm bin)/esbuild --bundle --platform=node prog01b.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input01.txt');
//const rs = fs.createReadStream('x');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});
const a = new Array();
rl.on('line', (line) => a.push(parseInt(line)));
rl.on("close", () => {
    let totalIncreases = 0;
    for (let i = 0; i < a.length-3; i++) {
        if (a[i] < a[i+3]) {
            totalIncreases++;
        }
    }
    console.log(totalIncreases)
});
