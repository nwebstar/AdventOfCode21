const fs = require('fs');
let path = "Day2_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var findPos = function (steps) {
    let depth = 0;
    let horizontal = 0;
    
    for (i=0; i < steps.length; i++)
    {
        let step = steps[i].split(" ");
        let magnitude = parseInt(step[1]);

        switch (step[0]) {
            case "forward":
                horizontal += magnitude;
                break;
            case "down":
                depth += magnitude;
                break;
            case "up":
                depth -= magnitude;
                break;
            default:
                break;

        }
    }
    return [depth, horizontal]
}

var findPos2 = function (steps) {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;

    for (i=0; i < steps.length; i++)
    {
        let step = steps[i].split(" ");
        let magnitude = parseInt(step[1]);

        switch (step[0]) {
            case "forward":
                horizontal += magnitude;
                depth += aim*magnitude;
                break;
            case "down":
                aim += magnitude;
                break;
            case "up":
                aim -= magnitude;
                break;
            default:
                break;

        }
    }
    return [depth, horizontal]
}
let position = findPos2(input);

console.log(position);
console.log(position[0] * position[1]);