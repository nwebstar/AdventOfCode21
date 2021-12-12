const fs = require('fs');
let path = "Day12_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var isSmallCave = function (name) {
    return (name == name.toLowerCase())
}

var makeMapping = function (input) {
    let mapping = [];

    for (let i = 0; i < input.length; i++) {
        const pieces = input[i].split("-");

        mapping = makeConnection(mapping, pieces[0], pieces[1]);
    }

    return mapping;
}

var makeConnection = function (mapping, a, b) {

    if (!mapping[a]) mapping[a] = [];
    if (!mapping[b]) mapping[b] = [];    

    mapping[a].push(b);
    mapping[b].push(a);

    return mapping;
}

var travel = function (path, nextNode, mapping, completed) {

    if (nextNode != "start" && isSmallCave(nextNode)) {
        if (path.includes(nextNode)) return; //Can't go back to small cave again
    }

    let nextPath;
    if (path == "") {
        nextPath = nextNode;
    } else {
        if (nextNode == "start") {
            return;
        }
        nextPath = path + "," + nextNode;
    }
    
    if (nextNode == "end") {
        completed.push(nextPath); 
        return;
    }

    mapping[nextNode].forEach(node => {
        travel(nextPath, node, mapping, completed);
    });

    return;
}

var travel2 = function (path, nextNode, mapping, completed, doubleDipped) {

    if (nextNode != "start" && isSmallCave(nextNode)) {

        if (path.includes(nextNode)) {

            if (doubleDipped) {
                return; //Can't go back to small cave again after double dipping
            }        
            doubleDipped = true;   
        }
    }

    let nextPath;
    if (path == "") {
        nextPath = nextNode;
    } else {
        if (nextNode == "start") {
            return;
        }
        nextPath = path + "," + nextNode;
    }
    
    if (nextNode == "end") {
        completed.push(nextPath); 
        return;
    }

    mapping[nextNode].forEach(node => {
        travel2(nextPath, node, mapping, completed, doubleDipped);
    });

    return;
}

let completed = [];
let mapping = makeMapping(input);

travel2("", "start", mapping, completed, false)

console.log(completed.length);