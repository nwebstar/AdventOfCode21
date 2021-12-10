const fs = require('fs');
let path = "Day10_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var parseValue = function (char) {

    switch (char) {
        case ")":
            return 3;
        case "]":
            return 57;
        case "}":
            return 1197;
        case ">": 
            return 25137;
        default:
            return 0;
    }
}

var parsePair = function (char) {

    switch (char) {
        case "(":
            return ")";
        case "[":
            return "]";
        case "{":
            return "}";
        case "<": 
            return ">";
        default:
            return;
    }
}

var isOpener = function (char) {
    return "([{<".includes(char);
}

var scoreLine = function (line) {
    const lineArr = line.split("");
    const stack = [];

    for (let i =0; i < lineArr.length; i++)
    {
        let char = lineArr[i];
        if (isOpener(char)) {
            stack.push(char);
        } else {
            if (stack.length == 0) return 0; //Pre-mature close
            let closerMatch = parsePair(stack.pop());

            if (closerMatch != char) return parseValue(char); //Illegal match

        }
    }
    return 0; //Incomplete
}

var sum = function (arr) {
    return arr.reduce((a, b) => a + b, 0)
}

var scoreInput = function (input) {
    const scores = [];
    for (let i =0; i < input.length; i++) {
        scores.push(scoreLine(input[i]));
    }

    return sum(scores);
}

var scoreLine2 = function (line) {
    const lineArr = line.split("");
    const stack = [];

    for (let i =0; i < lineArr.length; i++)
    {
        let char = lineArr[i];
        if (isOpener(char)) {
            stack.push(char);
        } else {
            if (stack.length == 0) return 0; //Pre-mature close
            let closerMatch = parsePair(stack.pop());

            if (closerMatch != char) return 0; //Illegal match

        }
    }
    const compliment = makeCompliment(stack);

    return scoreCompliment(compliment); 
}

var makeCompliment = function (stack) {
    const compliment = [];
    for (let i = 0; i < stack.length; i++) {
        compliment.unshift(parsePair(stack[i]));
    }
    return compliment;
}

var scoreCompliment = function (stack) {
    let score = 0;
    while (stack.length > 0) {
        
        score *=5;
        score += parseValue2(stack.shift());
    }

    return score;
}

var parseValue2 = function (char) {

    switch (char) {
        case ")":
            return 1;
        case "]":
            return 2;
        case "}":
            return 3;
        case ">": 
            return 4;
        default:
            return 0;
    }
}

var scoreInput2 = function (input) {
    const scores = [];
    for (let i =0; i < input.length; i++) {
        let score = scoreLine2(input[i]);
        if (score > 0) scores.push(score);
    }

    return median(scores);
}

var median = function (scores) {
    scores.sort(function(a, b){return b-a});

    const medIndex = Math.floor(scores.length/2);

    return scores[medIndex];
}

console.log(scoreInput2(input));