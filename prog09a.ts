//$(npm bin)/esbuild --bundle --platform=node prog09a.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input09.txt');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});

let a: number[][] = [];

rl.on('line', (line) => {
    a.push(line.split('').map(x => parseInt(x)));
});
rl.on("close", () => {
    let res = 0;
    for (let y = 0; y < a.length; y++) {
        for (let x = 0; x < a[y].length; x++) {
            const v = a[y][x];
            let lowest = true;
            if (x > 0 && v >= a[y][x-1]) {
                lowest = false;
            }
            if (y > 0 && v >= a[y-1][x]) {
                lowest = false;
            }
            if (x+1 < a[y].length && v >= a[y][x+1]) {
                lowest = false;
            }
            if (y+1 < a.length && v >= a[y+1][x]) {
                lowest = false;
            }
            if (lowest) {
                console.log(v);
                res += v + 1;
            }
        }
    }
    console.log(res);
});
// 1775 > -> >=