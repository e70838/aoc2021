//$(npm bin)/esbuild --bundle --platform=node prog15a.ts | node
import * as readline from 'readline';
import * as fs from 'fs';
import { listenerCount } from 'process';

const rl = readline.createInterface({
    input: fs.createReadStream('input15.txt'),
    crlfDelay: Infinity
});

class Node {
    neighboor: Node[];
    val: number;
    cost: number;
    label: string;
    constructor(cost: number, label : string) {
        this.neighboor = [];
        this.val = Infinity;
        this.cost = cost;
        this.label = label;
    }
}
const map : Node[] = [];
function addLink(n1: Node, n2: Node) {
    n1.neighboor.push(n2);
    n2.neighboor.push(n1);
}

let y = 1;
rl.on('line', (line) => {
    const a = line.split('').map(x => parseInt(x));
    for (let x = 0; x < a.length; x++) {
        const n = new Node(a[x], `${x+1}-${y}`);
        if (x > 0) {
            addLink(n, map[map.length-1]);
        }
        if (map.length >= a.length) {
            addLink(n, map[map.length-a.length]);
        }
        map.push(n);
    }
    y++;
});
rl.on("close", () => {
    // algo, on retire le moins cher des points explorés.
    // On met à jour tous ses voisins en les ajoutant à explored et en mettant à jour le cout
    let toBeExplored = new Set<Node>();
    map[0].val = 0;
    toBeExplored.add(map[0]);
    while (toBeExplored.size > 0) {
        const min : Node = [...toBeExplored].sort((a, b) => a.val - b.val)[0];
        console.log(min);
        toBeExplored.delete(min);
        for (const n of min.neighboor) {
            console.log(`looking ${n.label} ${n.val}`);
            if (!Number.isFinite(n.val)) {
                toBeExplored.add(n);
            }
            if (min.val + n.cost < n.val) {
                n.val = min.val + n.cost;
            }
        }
    }
    console.log(map[map.length-1]);
});
