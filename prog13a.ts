//$(npm bin)/esbuild --bundle --platform=node prog13a.ts | node
import * as readline from 'readline';
import * as fs from 'fs';
import { listenerCount } from 'process';

const rl = readline.createInterface({
    input: fs.createReadStream('input13.txt'),
    crlfDelay: Infinity
});

let a = new Set<string>();
let op = [];

rl.on('line', (line) => {
    if (line.startsWith('fold along')) {
        op.push(line);
    } else if (line !== '') {
        a.add(line);
    }
});
rl.on("close", () => {
    const firstOp = op.shift();
    const [, kind, numtext] = firstOp.match(/(x|y)=(\d+)/);
    const num = parseInt(numtext);
    console.log(kind, num);
    for (let item of a) {
        const [x, y] = item.split(',').map(x => parseInt(x));
        let flipped = false;
        let [newX, newY] = [x, y];
        if (kind === 'x') {
            if (x === num) {
                console.log('error x = ', num, ' ', y);
            }
            if (x > num) {
                newX = num * 2 - x;
                flipped = true;
            }
        } else {
            if (y === num) {
                console.log(x, ' error y = ', num);
            }
            if (y > num) {
                newY = num * 2 - y;
                flipped = true;
            }
        }
        if (flipped) {
            a.delete(item);
            a.add(`${newX},${newY}`);
        }
    }
    console.log(a.size);
});
//8427
