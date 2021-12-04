//$(npm bin)/esbuild --bundle --platform=node prog04.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rs = fs.createReadStream('input04.txt');

const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
});

class Board {
    row: number[][];
    col: number[][];
    finished: boolean;

    constructor(lines: string[]) {
        this.finished = false;
        this.row = new Array(lines.length);
        this.col = new Array(lines.length);
        for(let i = 0; i < lines.length; i++) {
            this.row[i] = [];
            this.col[i] = [];
        }
        for(let y = 0; y < lines.length; y++) {
            const nums = lines[y].trim().split(/\s+/);
            for (let x = 0; x < nums.length; x++) {
                const val = parseInt(nums[x]);
                // console.log('x ', x, ', y', y, ', val ', val);
                this.row[y].push(val);
                this.col[x].push(val);
            }
        }
    }
    removeVal(v : number) : number {
        if (this.finished) {
            return -1;
        }
        let finished = false;
        for(let y = 0; y < this.row.length; y++) {
            const indexY = this.row[y].indexOf(v);
            if (indexY > -1) {
                this.row[y].splice(indexY, 1);
                for (let x = 0; x < this.col.length; x++) {
                    const indexX = this.col[x].indexOf(v);
                    if (indexX > -1) {
                        this.col[x].splice(indexX, 1);
                        finished = (this.row[y].length === 0) || (this.col[x].length === 0);
                    }
                }
            }
        }
        if (finished) {
            this.finished = true;
            return this.row.reduce((acc, theRow) => acc+theRow.reduce((acc2, cur2) => acc2+cur2, 0), 0);
        } else {
            return -1;
        }
    }
}

const a : string[] = new Array();
rl.on('line', (line) => a.push(line));
rl.on("close", () => {
    const tirage = a.shift().split(',').map(n => parseInt(n));
    const boards : Board[] = [];
    for (let i = 1; i < a.length; i += 6) {
        boards.push(new Board(a.slice(i, i+5)));
    }

    const boardOrder = [];

    for (const v of tirage) {
        console.log('Number ', v);
        for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
            const score = boards[boardIndex].removeVal(v);
            if (score > -1) {
                console.log('found ', score, ', last num is ', v, ', prod ', score * v);
                boardOrder.push(score*v);
            }
        }
    }
    console.log(boardOrder);//.pop());
});
