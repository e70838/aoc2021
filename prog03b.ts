//$(npm bin)/esbuild --bundle --platform=node prog03b.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const nbBits = 12;
const rl = readline.createInterface({
    input: fs.createReadStream('input03.txt'),
    crlfDelay: Infinity
});
const a : number[] = new Array();
rl.on('line', (line) => a.push(parseInt(line, 2)));
rl.on("close", () => {
    let b = a.slice();
    for (let j = nbBits-1; j >= 0; j--) {
        let c1 = b.filter(x => (x&1<<j) !== 0);
        let c2 = b.filter(x => (x&1<<j) === 0);
        b = (c1.length >= c2.length) ? c1 : c2;
    }
    const oxyg = b[0];
    console.log(b.length, 'oxygen generator rating', b[0]);
    b = a.slice();
    for (let j = nbBits-1; j >= 0; j--) {
        let c1 = b.filter(x => (x&1<<j) !== 0);
        let c2 = b.filter(x => (x&1<<j) === 0);
        if (c1.length && c2.length) {
            b = (c1.length >= c2.length) ? c2 : c1;
        }
    }
    console.log(b.length, 'CO2 rating', b[0]);
    console.log('product ', oxyg * b[0]);
});
