const fs = require('fs');
let path = "Day3_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var calculateDec = function (binArr) {

    
    let magnitude = 1;
    let val = 0;
    while (binArr.length > 0) 
    {
        if (binArr.pop() > 0) 
        {
            val += magnitude;
        }
        magnitude *= 2;
    }

    return val;
}

var calcConsumption = function (gammaArr) {

    const epsilonArr = calcEpsilon(gammaArr);

    return (calculateDec(gammaArr)*calculateDec(epsilonArr));
}

var calcEpsilon = function (gammaArr) {
    const epsilon = [];

    for (i=0; i < gammaArr.length; i++)
    {
        if (gammaArr[i] == "0")
        {
            epsilon.push("1");
        }
        else
        {
            epsilon.push("0");
        }
    }

    return epsilon;
}

var calcZeros = function (readout) {

    let zeros = new Array(readout[0].length).fill(0);

    for (i=0; i < readout.length; i++)
    {
        let entry = readout[i].split("");

        for (j=0; j < entry.length; j++)
        {
            
            if (entry[j] == "0") 
            {
                zeros[j]++;
            }
        }
    }
    return zeros;
}

var calculateGamma = function (readout) {

    const zeros = calcZeros(readout);
    const halfway = readout.length/2;
    const gamma = [];

    for (i=0; i < zeros.length; i++)
    {
        gamma[i] = (zeros[i] > halfway) ? "0" : "1";
    }

    return gamma;
}

var filterIndex = function (readout, position, matchVal)
{
    let result = [];
    for (i=0; i < readout.length; i++)
    {
        let entry = readout[i].split("");

        if (entry[position] == matchVal) {
            result.push(entry.join(""));
        }
    }

    return result;
}

var calculateOxy = function (readout) {
    let copy = [...readout];

    
    var i = 0;

    while (copy.length > 1) {
        var gammaArr = calculateGamma(copy);
        copy = filterIndex(copy, i, gammaArr[i]);
        i++;
    }

    return copy[0];
}

var calculateCo2 = function (readout) {
    let copy = [...readout];

    
    var i = 0;

    while (copy.length > 1) {
        var gammaArr = calculateGamma(copy);
        var epsilonArr = calcEpsilon(gammaArr);
        copy = filterIndex(copy, i, epsilonArr[i]);
        i++;
        console.log(copy);
    }

    return copy[0];

}

const oxy = calculateOxy(input);
const co2 = calculateCo2(input);

console.log(calculateDec(oxy.split(""))*calculateDec(co2.split("")));