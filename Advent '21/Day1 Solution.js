const fs = require('fs');
let path = "Day1_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

var countIncreases = function (depths) {
    let count = 0;
    let prev,curr;

    for (let i = 0; i < depths.length; i++) 
    {
        if (i == 0) continue;

        prev = depths[i-1];
        curr = depths[i];

        if (!curr || !prev) console.log(i);

        if (prev <= curr) count++;

    }

    return count;
}

var countWindowIncreases = function (depths) {
    let count = 0;
    let a,b,c,d;
    let prev,curr;

    for (let i = 0; i < depths.length+1; i++)
    {
        
        //console.log(i);

        d = parseInt(depths[i]);
        c = parseInt(depths[i-1]);
        b = parseInt(depths[i-2]);
        a = parseInt(depths[i-3]);

        if (!(a && b && c && d)) {

            console.log("a: " + a + " b: " + b + " c: " + c + " d: " + d);
            continue;
        }

        prev = (a + b + c);
        curr = (b + c + d); 

        if (prev < curr) {
            count++;
        }
        console.log(prev);
    }


    return count;
}

console.log(countWindowIncreases(input));