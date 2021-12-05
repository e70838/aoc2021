//$(npm bin)/esbuild --bundle --platform=node prog05a.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input05.txt');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});

const map: number[][] = new Array(1000);
for(let i = 0; i < map.length; i++) {
    map[i] = new Array(1000).fill(0);
}

const a : string[] = new Array();
rl.on('line', (line) => a.push(line));
rl.on("close", () => {
    for (const v of a) {
        //console.log(v);
        const [, x1, y1, x2, y2] = v.match(/(\d+),(\d+) -> (\d+),(\d+)/)
            .map(x => parseInt(x));
        if (x1 === x2) {
            if (y1 < y2) {
                for (let y = y1; y <= y2; y++) {
                    map[x1][y]++;
                }
            } else {
                for (let y = y2; y <= y1; y++) {
                    map[x1][y]++;
                }
            }
        } else if (y1 === y2) {
            if (x1 < x2) {
                for (let x = x1; x <= x2; x++) {
                    map[x][y1]++;
                }
            } else {
                for (let x = x2; x <= x1; x++) {
                    map[x][y1]++;
                }
            }
        }
    }
    let res = 0;
    for (const row of map) {
        //console.log(row.map(x => '.123456789'.charAt(x)).join(''));
        row.forEach(x => {if (x>1) {res++;}})
    }
    console.log(res);
});
