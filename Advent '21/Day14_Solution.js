const fs = require('fs');
let path = "Day14_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");


var makeMap = function (input) {
    let map = [];
    for (let i = 0; i < input.length; i++) {
        const [key, out] = input[i].split(" -> ");

        map[key] = out;
    }

    return map;
}

var polymerize = function (seed, map) {
    let newSeed = [];

    for (let i = 0; i < seed.length; i++) {
        if (!seed[i+1]) {
            newSeed.push(seed[i]) 
            continue;
        }
        let key = seed[i]+seed[i+1];
        let insertion = map[key];

        newSeed.push(seed[i]);
        if (insertion) newSeed.push(insertion);
    }

    return newSeed;
}

var findTotals = function (seed) {
    let totals = [];

    for (let i = 0; i < seed.length; i++) {
        totals = incrementTotal(totals, seed[i], 1);
    }

    return totals;
}

var combineTotals = function (totalA, totalB) {

    
    let result = [];

    for (const letter in totalA) {
        const mag = totalA[letter];
        result = incrementTotal(result, letter, mag)
    }

    for (const letter in totalB) {
        const mag = totalB[letter];
        result = incrementTotal(result, letter, mag)
    }

    return result;
}

var incrementTotal = function (totals, letter, mag) {
    totals[letter] = totals[letter] ? totals[letter] + mag : mag;
    
    return totals;
}

var writeMemo = function (memos, key, count, memo) {
    if (!memos[key]) memos[key] = [];
    let copy = [];

    for (const letter in memo) {
        const mag = memo[letter];
        copy = incrementTotal(copy, letter, mag)
    }
    memos[key][count] = copy;

    return memos;
}

var findMinMax = function (totals) {

    let min = Infinity;
    let max = 0

    for (const key in totals) {
        let val = totals[key];
        min = Math.min(val, min);
        max = Math.max(val, max);
    }

    return [min, max];
}

var compound = function (seed, map, x) {
    for (let i = 0; i < x; i++) {
        seed = polymerize(seed, map);
    }
    return seed;
}

var saferPolymerize = function (seed, map, x) {
    let totals = [];

    let shortCutMap = makeMapShortCut(map, x)

    for (let i = 0; i < seed.length; i++) {
        let a = seed[i];
        let b = seed[i+1];
        totals = incrementTotal(totals, a, 1);

        if (!b) continue; //No next letter to grow from

        totals = combineTotals(totals, shortCutMap[a+b]);
    }
    return totals;
}

var growRecursive = function (a, b, map, memos, count) {

    let results = [];

    let key = a+b;
    if (memos[key] && memos[key][count]) {
        results = combineTotals(results, memos[key][count]);
        return results;
    }

    let insertion = map[key];

    if (insertion) {
        count--;
        if (count > 0) {
            let totalA = growRecursive(a, insertion, map, memos, count);
            let totalB = growRecursive(insertion, b, map, memos, count);
            results = combineTotals(totalA, totalB);
        }
        count++;
        results = incrementTotal(results, insertion, 1);
    }

    memos = writeMemo(memos, key, count, results);

    return results;
}

var makeMapShortCut = function (map, deepnessCount) {
    let shortCutMap = [];
    let memos = [];;

    for (const key in map) {
        shortCutMap[key] = growRecursive(key[0], key[1], map, memos, deepnessCount);
    }

    return shortCutMap;
}

let seed = input.shift().split("");
input.shift();
let map = makeMap(input);

totals = saferPolymerize(seed, map, 40);
console.log(totals)

let [min, max] = findMinMax(totals);

console.log(max-min);
