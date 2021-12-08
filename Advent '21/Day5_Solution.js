const fs = require('fs');
let path = "Day5_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");


var makeGrid = function () {
    const grid = [];

    for (let i = 0; i < 1000; i++)
    {
        let row = [];
        for (let j = 0; j < 1000; j++) {
            row.push(0);
        }
        grid.push(row);
    }

    return grid;
}

var scoreGrid = function (grid) {

    let score = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > 1 ) score++;
        }
    }
    return score;
}

var makeCoords = function (row) {
    let pieces = row.split("->");
    let a = pieces[0].trim().split(",");
    let b = pieces[1].trim().split(",");

    a = [parseInt(a[0]), parseInt(a[1])];
    b = [parseInt(b[0]), parseInt(b[1])];    

    return [a , b]
}

var isNotDiagonal = function (a, b) {
    if (a[0] == b[0]) return true;
    if (a[1] == b[1]) return true;
    
    return false;
}

var incrementPath = function (a, b, grid) {

    if (a[0] == b[0]) {
        grid = moveVertical(a, b, grid);

    } else if (a[1] == b[1]) {
        grid = moveHorizontal(a,b, grid);
    }
    else {
        grid = moveDiagonal(a, b, grid);
    }

    return grid;
}

var moveVertical = function (a, b, grid) {
    if (a[1] < b[1]) {
        for (let i = a[1]; i <= b[1] ; i++)
        {
            grid[a[0]][i] += 1;
        }
    } else {
        for (let i = b[1]; i <= a[1] ; i++)
        {
            grid[a[0]][i] += 1;
        }
    }

    return grid;
}

var moveHorizontal = function (a, b, grid) {

    if (a[0] < b[0]) {
        for (let i = a[0]; i <= b[0]; i++)
        {
            grid[i][a[1]] += 1;
        }
    } else {
        for (let i = b[0]; i <= a[0]; i++)
        {
            grid[i][a[1]] += 1;
        }
    }

    return grid;
}

var moveDiagonal = function (a, b, grid) {
    const dx = (a[0] < b[0]) ? 1 : -1;
    const dy = (a[1] < b[1]) ? 1 : -1;

    const maxX = Math.max(a[0], b[0]);
    const minX = Math.min(a[0], b[0]);
    const maxY = Math.max(a[1], b[1]);
    const minY = Math.min(a[1], b[1]);

    if (dx * dy == 1)
    {
        let j = minY;
        let steps = maxX - minX + 1;
        for (let i = 0; i < steps; i++)
        {
            grid[minX+i][minY+i] +=1;
        }
    }
    else 
    {
        let j = maxY;
        let steps = maxX - minX + 1;
        for (let i = 0; i < steps; i++)
        {
            grid[minX+i][maxY-i] +=1;
        }
    }
    return grid;
}


var runSim = function (input) {

    grid = makeGrid();

    for (let i = 0; i < input.length; i++) {
        let [a,b] = makeCoords(input[i]);
    
        grid = incrementPath(a, b, grid);
    }   

    return scoreGrid(grid);
}



console.log(runSim(input));