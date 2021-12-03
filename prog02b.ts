//$(npm bin)/esbuild --bundle --platform=node prog02b.ts | node

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
var aim = 0;
readInterface.on('line', function(line) {
    const [, direction, counts] = line.match(regex);
    const count = parseInt(counts);
    switch (direction) {
        case 'forward' :
            position += count;
	    depth += aim * count;
            break;
        case 'down' :
	    aim += count;
            break;
        case 'up' :
	    aim -= count;
            break;
        default: console.log ('bug ' + direction);
    }
});
readInterface.on("close", () => {
    console.log(position * depth);
});
