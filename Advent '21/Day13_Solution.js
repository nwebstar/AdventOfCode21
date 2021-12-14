const fs = require('fs');
let path = "Day13_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var makeBlankGrid = function () {
    let grid = [];

    for (let i = 0; i < 2000; i++) {
        grid[i] = new Array(2000).fill(".");
    }

    return grid;
}

var normalize = function (input) {
    let grid = makeBlankGrid();
    let folds = [];
    let startFolds = false;

    for (let i = 0; i < input.length; i++) {
        let line = input[i];
        if (line == "") {
            startFolds = true;
            continue;
        }

        if (startFolds) {
            folds.push(line.split(" ")[2].split("="));
        } else {
            let [x,y] = line.split(",");
            grid = addPoint(grid, y, x);
        }
    }

    return [grid, folds];
}

var addPoint = function (grid, y, x) {
    grid[y][x] = "#";

    return grid;
}

var trimBottom = function (grid, y) {
    const newGrid = [];
    for (let i = 0; i < y; i++) {
        newGrid[i] = grid[i];
    }

    grid = newGrid;

    return grid;
}

var trimRight = function (grid, x) {
    
    for (let i = 0; i < grid.length; i++) {
        if (!grid[i]) continue;
        grid[i] = grid[i].slice(0, x);
    }

    return grid;
}

var mirrorVal = function (val, inflexion) {
    let diff = val - inflexion;

    return inflexion - diff;
}

var foldVert = function (grid, y) {
    for (let i = y+1; i < grid.length; i++) {
        if (!grid[i]) continue;

        let newY = mirrorVal(i, y);

        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == "#") {
                addPoint(grid, newY, j);
            }
        }
    }

    grid = trimBottom(grid, y);

    return grid;
}

var foldHorz = function (grid, x) {
    for (let i = 0; i < grid.length; i++) {
        if (!grid[i]) continue;

        for (let j = x+1; j < grid[i].length; j++) {
            let newX = mirrorVal(j, x);
            if (grid[i][j] == "#") {
                addPoint(grid, i, newX);
            }
        }
    }

    grid = trimRight(grid, x);

    return grid;
}

var countPoints = function (grid) {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        if (!grid[i]) continue;
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == "#") count++
        }
    }
    return count;
}

var doFoldInstruction = function (grid, instruction) {
    switch (instruction[0]) {
        case "x":
            grid = foldHorz(grid, parseInt(instruction[1]));
            break;
        case "y":
            grid = foldVert(grid, parseInt(instruction[1]));
            break;
        default:
            break;
    }
    return grid;
}

var fold = function (grid, folds) {
    for (let i = 0; i < folds.length; i++) {
        grid = doFoldInstruction(grid, folds[i]);
    }
    return grid;
}

var decrypt = function (grid) {
    let letterWidth = 5;
    let letters = [];
    let row = [];

    for (let i = 0; i < grid.length; i++) {

        for (let j = 0; j < grid[i].length; j++) {
            let char = grid[i][j] ?? ".";
            row.push(char);
            
            if (j % 5 == 4) {
                let index = Math.floor(j/letterWidth);
                if (!letters[index]) {
                    letters[index] = [];
                }

                letters[index].push(row);
                row = [];
                if (i == 5) console.log(letters[index]);
            }
        }
        
    }
    return letters;
}

let [grid, folds] = normalize(input);
grid = fold(grid, folds);

decrypt(grid);