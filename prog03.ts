//$(npm bin)/esbuild --bundle --platform=node prog03.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input03.txt');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});
const a : number[] = new Array();
rl.on('line', (line) => a.push(parseInt(line, 2)));
rl.on("close", () => {
    let b = Array(12).fill(0);
    for (let i = 0; i < a.length; i++) {
        for (let j = 0 ; j < 12; j++) {
            if (a[i] & (1<<j)) {b[j]++};
        }
    }
    console.log(b);
    const seuil = a.length / 2;
    let gamma = 0;
    for (let j = 0 ; j < 12; j++) {
        if (b[j] > seuil) {gamma += 1<<j};
    }
    console.log(gamma, gamma * ((1<<12)-1-gamma));
});
// 647936
// 230144
// 754432
// 3605504