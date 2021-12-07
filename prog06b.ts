//$(npm bin)/esbuild --bundle --platform=node prog06b.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input06.txt');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});

let a: number[] = new Array(9).fill(0);

rl.on('line', (line) => line.split(',').forEach(x => a[parseInt(x)]++));
rl.on("close", () => {
    for (let day = 1; day <= 256; day++) {
        a = [a[1], a[2], a[3], a[4], a[5], a[6], a[7]+a[0], a[8], a[0]];
    }
    console.log(a.reduce((acc, v) => acc+v));
});
