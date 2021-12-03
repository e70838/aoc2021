//$(npm bin)/esbuild --bundle --platform=node prog01.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input01.txt');

const readInterface = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});
var i = undefined;
var nb = 0;
readInterface.on('line', function(line) {
    const j = parseInt(line);
    if ((i !== undefined) && j > i) {nb++;}
    i = j;
});
readInterface.on("close", () => console.log(nb));
