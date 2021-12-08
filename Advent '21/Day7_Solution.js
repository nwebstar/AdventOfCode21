const fs = require('fs');
let path = "Day7_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var findMinMax = function (positions) {
    let max = positions[0];
    let min = positions[0];

    for (let i = 1; i < positions.length; i++) {
        max = Math.max(positions[i], max);
        min = Math.min(positions[i], min);
    }

    return [min, max];
}

var calcConsumption = function (positions, destination) {
    let result = 0;

    for (let i = 0; i < positions.length; i++) {
        result += Math.abs(destination - positions[i]);
    }

    return result;
}

var calcConsumption2 = function (positions, destination) {
    let result = 0;

    for (let i = 0; i < positions.length; i++) {
        result += triangulate(Math.abs(destination - positions[i]));
    }

    return result;
}

var findLeastConsumption = function (positions) {
    let consumptions = [];
    let [ min, max] = findMinMax(positions);

    for (let i = min; i < max+1; i++) {
        consumptions[i] = calcConsumption(positions, i);
    }

    let [result, _] = findMinMax(consumptions);

    return result;
}

var findLeastConsumption2 = function (positions) {
    let consumptions = [];
    let [ min, max] = findMinMax(positions);

    for (let i = min; i < max+1; i++) {
        consumptions[i] = calcConsumption2(positions, i);
    }

    let [result, _] = findMinMax(consumptions);

    return result;
}

var triangulate = function (n) {
    return (n*(n+1)/2);
}

arr = input[0].split(",");

console.log(findLeastConsumption2(arr));
