//$(npm bin)/esbuild --bundle --platform=node prog14b.ts | node
import * as readline from 'readline';
import * as fs from 'fs';
import { listenerCount } from 'process';

const rl = readline.createInterface({
    input: fs.createReadStream('input14.txt'),
    crlfDelay: Infinity
});

// m defines the rules to transform bigrams
let m : { [key:string]:string } = {};
// init defines the numbers of each possible bigrams in the string
let init : { [key:string]:number } = {};
// count the number of each character in the string
const counts : { [key:string]:number } = {};

function inc(obj, ch, nb = 1) : void {
    if (ch in obj) {
        obj[ch] += nb;
    } else {
        obj[ch] = nb;
    }
}

rl.on('line', (line) => {
    if (line !== '') {
        if (!line.match(/ -> /)) {
            for (const ch of line) {
                inc(counts, ch);
            }
            for (let i = 0; i < line.length -1; i++) {
                inc(init, line.substring(i, i+2));
            }
        } else {
            const [,beforeafter, insert] = line.match(/(..) -> (.)/);
            m[beforeafter] = insert;
        }
    }
});
rl.on("close", () => {
    console.log(m, counts);
    console.log(init);
    for (let step = 1; step <= 40; step++) {
        let newInit = {...init};
        for (const i in init) { // loop over all bigrams
            if (i in m) {
                let suite = m[i];
                let nb = init[i];
                console.log(`i : ${i} suite : ${suite}`);
                inc(counts, suite, nb);
                newInit[i] -= nb;
                inc(newInit, i.charAt(0) + suite, nb);
                inc(newInit, suite + i.charAt(1), nb);
            }
        }
        init = newInit;
        console.log ('step ', step, ' : ', init);
    }
    console.log(counts);
    let r = Object.keys(counts).sort((a, b) => counts[a] - counts[b]);
    console.log (r[0], counts[r[0]], r[r.length - 1], counts[r[r.length - 1]]);
    console.log(counts[r[r.length - 1]] - counts[r[0]]);
});
// 4376379387057