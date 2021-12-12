//$(npm bin)/esbuild --bundle --platform=node prog12b.ts | node
import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
    input: fs.createReadStream('input12.txt'),
    crlfDelay: Infinity
});

let a = new Map();

rl.on('line', (line) => {
    let [from, to] = line.split('-');
    function link(from, to) : void {
        if (to !== 'start') {
            if (a.has(from)) {
                a.get(from).push(to);
            } else {
                a.set(from, [to]);
            }
        }
    }
    link(from, to);
    link(to, from);
});
rl.on("close", () => {
    // param secondVisit indicates we have right to a second visit of a cave
    function explore (cave: string, currPath : string, prohibited : string, secondVisit : boolean) : string[] {
        let res: string[] = [];
        if (a.has(cave)) {
            const issues: string[] = a.get(cave);
            for (const s of issues) {
                if (s === 'end') {
                    res.push(currPath + ',end');
                } else if (s.toLowerCase() === s) {
                    if (prohibited.includes(s)) {
                        if (secondVisit) {
                            res.push (...explore(s, currPath+','+s, prohibited, false));
                        }
                    } else {
                        res.push (...explore(s, currPath+','+s, prohibited+' '+s, secondVisit));
                    }
                } else {
                    res.push (...explore(s, currPath+','+s, prohibited, secondVisit));
                }
            }
        }
        return res;
    }
    let allPath = explore('start', 'start', 'start', true);
    
    console.log(allPath, allPath.length);
});
