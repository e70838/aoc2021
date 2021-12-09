//$(npm bin)/esbuild --bundle --platform=node prog08a.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input08.txt');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});
interface Entry {
    lhs: string[];
    rhs: string[];
}

let a: Entry[] = [];

rl.on('line', (line) => {
    const [lhs, rhs] = line.split('|');
    a.push({lhs: lhs.split(' '),
    rhs: rhs.split(' ')});
} );
rl.on("close", () => {
    let nb = 0;
    for (const line of a) {
        for (const seg of line.rhs) {
            switch(seg.length) {
                case 2:
                case 4:
                case 3:
                case 7:
                    nb++;
            }
        }
    }
    console.log(nb);
});
