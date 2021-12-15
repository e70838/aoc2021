//$(npm bin)/esbuild --bundle --platform=node prog14a.ts | node
import * as readline from 'readline';
import * as fs from 'fs';
import { listenerCount } from 'process';

const rl = readline.createInterface({
    input: fs.createReadStream('input14.txt'),
    crlfDelay: Infinity
});

let m : { [key:string]:{ [key:string]:string; }; } = {};
let init : string [];

rl.on('line', (line) => {
    if (line !== '') {
        if (init === undefined) {
            init = line.split('');
        } else {
            const [,before, after, insert] = line.match(/(.)(.) -> (.)/);
            if (before in m) {
                m[before][after] = insert;
            } else {
                m[before] = {[after] : insert};
            }
        }
    }
});
rl.on("close", () => {
    console.log(m);
    for (let step = 1; step <= 10; step++) {
        for (let i = 0; i < init.length - 1; i++) {
            if (init[i] in m) {
                let suite = m[init[i]];
                if (init[i+1] in suite) {
                    const v = suite[init[i+1]];
                    //console.log('step ', step, 'insert ', v, ' between ', init[i], ' and ', init[i+1]);
                    init.splice(i+1, 0, v);
                    i++;
                }
            }
        }
        console.log ('step ', step, ' : ', init.length);
    }
    let counts: { [key:string]:number } = {};
    for (const v of init) {
        if (v in counts) {
            counts[v]++;
        } else {
            counts[v] = 1;
        }
    }
    console.log(counts);
    let r = Object.keys(counts).sort((a, b) => counts[a] - counts[b]);
    console.log (r[0], counts[r[0]], r[r.length - 1], counts[r[r.length - 1]]);
    console.log(counts[r[r.length - 1]] - counts[r[0]]);
});
