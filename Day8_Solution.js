const fs = require('fs');
let path = "Day8_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var normalize = function (input) {
    let cyphers = [];
    let codes = [];

    for (let i = 0; i < input.length; i++) {
        let line = input[i];
        let pieces = line.split("|");
        cyphers.push(pieces[0].trim().split(" "));
        codes.push(pieces[1].trim().split(" "));

    }


    return [cyphers, codes];
}

var countEasy = function (codes) {
    let count = 0;
    for (let i = 0; i < codes.length; i++) {
        for (let j = 0; j < codes[i].length; j++) {
            switch (codes[i][j].length) {
                case 2:
                case 3:
                case 4:
                case 7: 
                    count++;
                    break;
                default:
                    break;
            }
        }
    }
    return count;
}


var translateDigit = function (digit, numKey) {
    let digitArr = digit.split("");
    digitArr.sort();

    switch (digitArr.join("")) {
        case numKey[0]:
            return 0;
        case numKey[1]:
            return 1;
        case numKey[2]:
            return 2;
        case numKey[3]:
            return 3;
        case numKey[4]:
            return 4;
        case numKey[5]:
            return 5;
        case numKey[6]:
            return 6;
        case numKey[7]:
            return 7;
        case numKey[8]:
            return 8;
        case numKey[9]:
            return 9;
        default:
            console.log("No match? " + digitArr);
            break;
            
    }
}

var makeKey = function (cypher) {
    let numKey = {};

    for (let i = 0; i < cypher.length; i++) {
        cypher[i] = alphabetize(cypher[i]);
        switch (cypher[i].length) {
            case 2:
                numKey[1] = cypher[i];
                break;
            case 3: 
                numKey[7] = cypher[i];
                break;
            case 4:
                numKey[4] = cypher[i];
                break;
            case 7: 
                numKey[8] = cypher[i];
                break;
            default:
                break;
        }
    }

    for (let i = 0; i < cypher.length; i++) {
        switch (cypher[i].length) {
            case 5:
                if (sharedLetters(cypher[i],numKey[1]) == 2)
                {
                    numKey[3] = cypher[i];
                }
                else if (sharedLetters(cypher[i],numKey[4]) == 3)
                {
                    numKey[5] = cypher[i];
                }
                else 
                {
                    numKey[2] = cypher[i];
                }
                break;
            case 6: 
            if (sharedLetters(cypher[i],numKey[1]) !== 2)
            {
                numKey[6] = cypher[i];
            }
            else if (sharedLetters(cypher[i],numKey[4]) == 4)
            {
                numKey[9] = cypher[i];
            }
            else 
            {
                numKey[0] = cypher[i];
            }
                break;
            default:
                break;
        }
    }

    return numKey;
}

var sharedLetters = function (longer, shorter) {
    let count = 0;
    let shortArr = shorter.split("");
    for (i = 0; i < shortArr.length; i++) {
        if (longer.includes(shortArr[i])) count++;
    }
    return count;
}

var alphabetize = function (val) {
    let valArr = val.split("");
    valArr.sort();
    return valArr.join("");
}

var translateCode = function (cypher, code) {
    let result = [];
    let numKey = makeKey(cypher);


    for (let i = 0; i < code.length; i++) {
        let val = translateDigit(code[i], numKey);
        result.push(val);
    }

    return parseInt(result.join(""));
}

var translateAllCodes = function (cyphers, codes) {
    let translations = [];
    for (let i = 0; i < codes.length; i++) {
        translations.push(translateCode(cyphers[i],codes[i]));
    }
    return translations;
}

var sum = function (arr) {
    return arr.reduce((a, b) => a + b, 0)
}

const [cyphers, codes] = normalize(input);


console.log(sum(translateAllCodes(cyphers, codes)));
