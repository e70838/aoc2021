//$(npm bin)/esbuild --bundle --platform=node prog09b.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input09.txt');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});

let a: number[][] = [];

interface Position {
    x : number;
    y : number;
}

function size_of_basin(x: number, y: number) {
    const reached = new Set<string>();
    const remain = new Set<Position>();
    remain.add ({x: x, y:y});
    for (const p of remain) {
        reached.add(p.x + '-' + p.y);
        const v = a[y][x];
        function check(x, y) {
            return v < a[y][x] && a[y][x] !== 9 && !reached.has(x + '-' + y);
        }
        if (p.x > 0 && check(p.x-1, p.y)) {
            remain.add ({x: p.x-1, y:p.y});
        }
        if (p.y > 0 && check(p.x, p.y-1)) {
            remain.add ({x: p.x, y:p.y-1});
        }
        if (p.x+1 < a[y].length && check(p.x+1, p.y)) {
            remain.add ({x: p.x+1, y:p.y});
        }
        if (p.y+1 < a.length && check(p.x, p.y+1)) {
            remain.add ({x: p.x, y:p.y+1});
        }
    }
    return reached.size;
}

rl.on('line', (line) => {
    a.push(line.split('').map(x => parseInt(x)));
});
rl.on("close", () => {
    let basin:number[] = [];
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
                basin.push(size_of_basin(x, y));
            }
        }
    }
    const sorted = basin.sort((a, b) => b-a);
    console.log(sorted, sorted[0] * sorted[1] * sorted[2]);
});
