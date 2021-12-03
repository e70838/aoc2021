//$(npm bin)/esbuild --bundle --platform=node prog02.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input02.txt');

const readInterface = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});
const regex = /^(forward|down|up) (\d+)$/;
var position = 0;
var depth = 0;
readInterface.on('line', function(line) {
    const [, direction, counts] = line.match(regex);
    const count = parseInt(counts);
    switch (direction) {
        case 'forward' :
            position += count;
            break;
        case 'down' :
            depth += count;
            break;
        case 'up' :
            depth -= count;
            break;
        default: console.log ('bug ' + direction);
    }
    console.log(position + ' -> ' + depth + ' ' + line);
    //console.log(j + ' -> ' + nb);
});
readInterface.on("close", () => {
    console.log(position * depth);
});