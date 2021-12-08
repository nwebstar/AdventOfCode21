const fs = require('fs');
let path = "Day6_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");


var initArray = function (input) {
    let counterArray = new Array(9).fill(0);
    let timers = input[0].split(",");
    
    for (let i = 0; i < timers.length; i++) {
        let val = parseInt(timers[i]);
        counterArray[val]++; 
    }

    return counterArray;
}

var passDay = function (oldArray) {
    let newArray = [];

    for (let i = 0; i < 8; i++) {
        newArray[i] = oldArray[i+1];
    }

    newArray[6] += oldArray[0];
    newArray[8] = oldArray[0];    

    return newArray;
}

var passDays = function (arr, numDays) {
    for (let i = 0; i < numDays; i++) {
        arr = passDay(arr);
    }

    return arr;
}

resultArr = passDays(initArray(input), 256);



console.log(resultArr);
console.log(resultArr.reduce((a, b) => a + b, 0));

