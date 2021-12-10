const fs = require('fs');
let path = "Day9_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var makeGrid = function (input)
{
    const grid = [];
    for (let i = 0; i < input.length; i++) {
        grid.push(input[i].split(""));
    }

    return grid;
}

var findLowpointVals = function (grid) {
    let result = [];

    for (let i = 0; i < grid.length; i++) {
         
        for (let j = 0; j < grid[0].length; j++) {
            if (isLowPoint(grid, i, j))
            {
                result.push(parseInt(grid[i][j]));
            }

        }
    }
    return result;
}

var findLowpointSizes = function (grid) {
    let result = [];

    for (let i = 0; i < grid.length; i++) {
         
        for (let j = 0; j < grid[0].length; j++) {
            if (isLowPoint(grid, i, j))
            {
                let size = findSize(grid, i, j);
                result.push(size);
            }

        }
    }
    return result;
}

var isLowPoint = function (grid, i, j) {
    const self = grid[i][j];
    const yMax = grid.length;
    const xMax = grid[0].length;

    if (i > 0) {
        if (self >= grid[i-1][j]) return false;
    }
    if (j > 0) {
        if (self >= grid[i][j-1]) return false;
    }
    if (i < yMax - 1) {
        if (self >= grid[i+1][j]) return false;
    }
    if (j < xMax - 1) {
        if (self >= grid[i][j+1]) return false;
    }

    return true;
}

var sum = function (arr) {
    return arr.reduce((a, b) => a + b, 0)
}

var sumIncluded = function (included) {
    const rowSums = [];

    included.forEach(row => rowSums.push(sum(row)));

    return sum(rowSums);
}

var findSize = function (grid, i, j) {

    let included = travel(grid, i, j, []);

    return sumIncluded(included);

}

var travel = function (grid, i, j, included) {
    const self = grid[i][j];
    const yMax = grid.length;
    const xMax = grid[0].length;

    if (self == 9) return included;
    included = markIncluded(included, i, j);


    if (i > 0) {
        if (self < grid[i-1][j]) {
            travel(grid, i-1, j, included);
        }
    }
    if (j > 0) {
        if (self < grid[i][j-1]) {
            travel(grid, i, j-1, included);
        }
    }
    if (i < yMax - 1) {
        if (self < grid[i+1][j]) {
            travel(grid, i+1, j, included);
        }
    }
    if (j < xMax - 1) {
        if (self < grid[i][j+1]) {
            travel(grid, i, j+1, included);
        }
    }

    return included;
}

var markIncluded = function (included, i, j) {

    if (!included[i]) included[i] = [];

    included[i][j] = 1;

    return included;
}

let grid = makeGrid(input);
let lowPointSizes = findLowpointSizes(grid);
lowPointSizes.sort(function(a, b){return b-a})
console.log(lowPointSizes[0]*lowPointSizes[1]*lowPointSizes[2]);