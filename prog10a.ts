//$(npm bin)/esbuild --bundle --platform=node prog10a.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('input10.txt'),
    crlfDelay: Infinity
});

let a: string[] = [];

rl.on('line', (line) => {
    a.push(line);
});
rl.on("close", () => {
    let count = {paren: 0, square: 0, curly: 0, angle: 0};
    for (const l of a) {
        const stack: string[] = []
        for (const ch of l) {
            if ('([{<'.includes(ch)) {
                stack.push(ch);
            } else {
                const top = stack.pop();
                if (ch === ')' && top !== '(' ) {
                    count.paren++;
                } else if (ch === ']' && top !== '[') {
                    count.square++;
                } else if (ch === '}' && top !== '{') {
                    count.curly++;
                } else if (ch === '>' && top !== '<') {
                    count.angle++;
                } else {
                    continue; // all is fine
                }
                console.log (l, ' -> ', ch, ' : ', stack, top);
                break;
            }
        }
    }
    console.log(count, count.paren*3+count.square*57+ count.curly*1197 + count.angle*25137);
});
//802104
