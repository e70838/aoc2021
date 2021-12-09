//$(npm bin)/esbuild --bundle --platform=node prog08b.ts | node
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

// sort the letters alphabetically
function reorder(s:string) {
    return s.split('').sort().join('');
}

rl.on('line', (line) => {
    const [lhs, rhs] = line.split('|').map(x => x.trim());
    a.push({lhs: lhs.split(' ').map(reorder).sort((a, b) => a.length - b.length),
    rhs: rhs.split(' ').map(reorder)});
} );
rl.on("close", () => {
    let nb = 0;
    for (const line of a) {
        //console.log(line.lhs);
        let decodeur = {};
        let res = 0;
        decodeur[line.lhs[0]] = 1; // 2 led
        decodeur[line.lhs[1]] = 7; // 3 led
        decodeur[line.lhs[2]] = 4; // 4 led
        decodeur[line.lhs[9]] = 8; // 7 led
        let segB, segA;
        // digit 6 is the only 6 led that does not have the leds of 1
        // digit 9 contains the led of 4, but not digit 0
        for (let i = 6; i <= 8; i++) {
            const s = line.lhs[i];
            if (s.includes(line.lhs[0].charAt(0))
                    !== s.includes(line.lhs[0].charAt(1))) {
                decodeur[s] = 6; // 6 led
                line.lhs[i] = line.lhs[8];
                if (s.includes(line.lhs[0].charAt(0))) {
                    segA = line.lhs[0].charAt(1);
                    segB = line.lhs[0].charAt(0);
                } else {
                    segA = line.lhs[0].charAt(0);
                    segB = line.lhs[0].charAt(1);
                }
            } else {
                if ([...line.lhs[2]].every(x => s.includes(x))) {
                    decodeur[s] = 9; // 6 led
                } else {
                    decodeur[s] = 0; // 6 led
                }
            }
        }
        // digit 2 is the only 5 led that does not have the led B
        // digit 5 is the only 5 led that does not have the led A
        // digit 3 is the only 5 led that has both
        for (let i = 3; i <= 5; i++) {
            const s = line.lhs[i];
            if (s.includes(segA)) {
                if (s.includes(segB)) {
                    decodeur[s] = 3; // 5 led
                } else {
                    decodeur[s] = 2; // 5 led
                }
            } else {
                decodeur[s] = 5; // 5 led
            }
        }
        //console.log(line.rhs, decodeur, segA, segB);
        let n = parseInt(line.rhs.map(x => decodeur[x]).join(''));
        console.log(n);
        nb += n;
    }
    console.log(nb);
});