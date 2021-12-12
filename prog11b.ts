//$(npm bin)/esbuild --bundle --platform=node prog11b.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('input11.txt'),
    crlfDelay: Infinity
});

let a: number[][] = [];

interface Position {
    x :number;
    y: number;
};

function neighbours(p: Position) {
    const res : Position[] = [];
    if (p.x > 0) {res.push({x: p.x-1, y: p.y});}
    if (p.x > 0 && p.y > 0) {res.push({x: p.x-1, y: p.y-1});}

    if (p.y > 0) {res.push({x: p.x, y: p.y-1});}
    if (p.x + 1 < a.length && p.y > 0) {res.push({x: p.x+1, y: p.y-1});}

    if (p.x + 1 < a.length) {res.push({x: p.x+1, y: p.y});}
    if (p.y + 1 < a.length && p.x + 1 < a.length) {res.push({x: p.x+1, y: p.y+1});}

    if (p.y + 1 < a.length) {res.push({x: p.x, y: p.y+1});}
    if (p.y + 1 < a.length && p.x > 0) {res.push({x: p.x-1, y: p.y+1});}
    return res;
}

rl.on('line', (line) => {
    a.push(line.split('').map(x => parseInt(x)));
});
rl.on("close", () => {
    let nbFlash = 0;
    for (let step = 0; step < 100000; step++) {
        if (step < 10 || (step % 10 === 0)) {
            //console.log ('After step ', step);
            for (const l of a) {
                //console.log(l.map(x => x.toString()).join(''));
            }
        }
        for (let y = 0; y < a.length; y++) {
            for (let x = 0; x < a[y].length; x++) {
                a[y][x]++;
            }
        }
        const prevFlash = nbFlash;
        let toBeContinued = true;
        while (toBeContinued) {
            toBeContinued = false;
            for (let y = 0; y < a.length; y++) {
                for (let x = 0; x < a[y].length; x++) {
                    if (a[y][x]>9) {
                        a[y][x] = 0;
                        nbFlash++;
                        for (const p of neighbours({x:x, y:y})) {
                            if (a[p.y][p.x] !== 0) {
                                a[p.y][p.x]++;
                                toBeContinued = true;
                            }
                        }
                    }
                }
            }
        }
        if (prevFlash+100 === nbFlash) {
            console.log('all flash', step + 1);
        }
    }
    console.log(nbFlash);
});
//323
