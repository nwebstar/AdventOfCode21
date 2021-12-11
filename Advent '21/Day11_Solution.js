const fs = require('fs');
let path = "Day11_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var makeGrid = function (input) {
    const grid = [];
    for (let i = 0; i < input.length; i++) {
        grid.push(input[i].split(""));
    }
    grid["count"] = 0;

    return grid;
}

var flash = function (i, j, grid) {
    grid["count"]++;
    grid[i][j] = -100;
    
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            if (grid[i+x] && grid[i+x][j+y])
            {
                grid[i+x][j+y]++;
            }
        }
    }
    return grid;
}

var startRound = function (grid) {

    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++) {
            grid[i][j]++;
        }
    }

    return grid;
}

var findFlasher = function (grid) {

    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++) {
            if (grid[i][j] > 9) return [i,j];
        }
    }

    return [-1,-1];
}

var takeStep = function (grid) {
    grid = startRound(grid);

    let [x, y] = [0, 0]

    while (x >= 0) {
        [x,y] = findFlasher(grid);

        if (x >= 0) {
            grid = flash(x,y,grid);
        }
    }

    grid = resetFlashed(grid);

    return grid;
}

var resetFlashed = function (grid) {
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++) {
            grid[i][j] = Math.max(grid[i][j], 0);
        }
    }
    return grid;
}

var takeSteps = function (grid, numSteps) {
    for (let i = 0; i < numSteps; i++) {
        grid = takeStep(grid);
    }
    return grid;
}

var isSynced = function (grid) {
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++) {
            if (grid[i][j] > 0) return false;
        }
    }
    return true;
}

var findSync = function (grid) {
    let steps = 0;
    while (!isSynced(grid)) {
        grid = takeStep(grid);
        steps++
    }

    return steps;
}

let grid = makeGrid(input);

console.log(findSync(grid));