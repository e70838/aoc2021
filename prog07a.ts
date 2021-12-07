//$(npm bin)/esbuild --bundle --platform=node prog07a.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input07.txt');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});

let a: number[];

rl.on('line', (line) => { a = line.split(',').map(x => parseInt(x)); } );
rl.on("close", () => {
    const sum = a.reduce((acc, v) => acc+v);
    //const avg = Math.round(sum / a.length); TIL
    let best_cost = sum;
    for (let avg = 0; avg < 2000; avg++) {
        const cost = a.reduce((acc, v) => acc+Math.abs(v-avg), 0);
        if (cost < best_cost) {
            console.log (avg, cost);
            best_cost = cost;
        }
    }
    console.log(sum, a.length, best_cost);
});
// 360453
// 344297