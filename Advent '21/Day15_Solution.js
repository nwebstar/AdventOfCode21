const fs = require('fs');
let path = "Day15_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var initMinValPath = function () {
    let minValPath = addValToGrid(0,0,0,[]);

    return minValPath;
}

var addValToGrid = function (i, j, val, grid) {
    if (!grid[i]) grid[i] = [];
    grid[i][j] = val;

    return grid;
}

var tryLookUp = function (i, j, grid) {
    if (!grid[i]) return undefined;
    return grid[i][j];
}

var findMinVal = function (i, j, input, minValPath) {
    
    let a = tryLookUp(i-1, j, minValPath);
    let b = tryLookUp(i, j-1, minValPath);
    let c = input[i][j];

    if (a == undefined) {
        return parseInt(b) + parseInt(c);
    } else if (b == undefined) {
        return parseInt(a) + parseInt(c);
    }

    return Math.min(a,b) + parseInt(c);

}

var makeMinValPath = function (input) {
    let minValPath = initMinValPath();

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (i == 0 && j == 0) continue;
            let minVal = findMinVal(i, j, input, minValPath);
            minValPath = addValToGrid(i, j, minVal, minValPath)
        }
    }

    return minValPath;
}

var makeBigInput = function (input) {
    let bigInput = growRight(input, 5);

    return growDown(bigInput, 5);

}

var growRight = function (grid, x) {

    let newGrid = []
    for (let i = 0; i < grid.length; i++) {

        newGrid[i] = grid[i].split("");
        let n = 1;
        let tempRow = grid[i];
        while (n < x) {
            tempRow = incrementRow(tempRow);
            newGrid[i] = newGrid[i].concat(tempRow);
            n++;
        }
    }
    
    return newGrid
}

var growDown = function (grid, x) {

    let newGrid = []
    let tileHeight = grid.length;

    for (let i = 0; i < tileHeight; i++) {
        newGrid[i] = grid[i];
    }


    for (let i = tileHeight; i < (tileHeight*x); i++) {
        newGrid[i] = incrementRow(newGrid[i-tileHeight]);
    }
    
    return newGrid
}

var incrementVal = function (original) {
    let temp = parseInt(original)+1;
    
    if (temp > 9) return 1;

    return temp;
}
 
var incrementRow = function (oRow) {
    let nRow = [];

    for (let i = 0; i < oRow.length; i++) {
        nRow[i] = incrementVal(oRow[i]);
    }

    return nRow;
}

var findSolution = function (grid) {
    let maxRow = grid.length - 1;
    let maxCol = grid[0].length - 1;

    return grid[maxRow][maxCol];
}

let minVal = makeMinValPath(input);
let bigMinVal = makeMinValPath(makeBigInput(input));



console.log("Solution 1: " + findSolution(minVal));   
console.log("Solution 2: " + findSolution(bigMinVal)) //My solution says 3012 but AoC says that's wrong.

