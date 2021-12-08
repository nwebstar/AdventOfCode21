const fs = require('fs');
let path = "Day4_Input.txt";
const input = fs.readFileSync(path, "utf8").split("\n");

const numStream = input.shift().split(",");
let _ = input.shift();

var normalizeCards = function (input) {
    const cards = [];
    let curCard = [];
    for (let i=0; i < input.length; i++)
    {
        let row = input[i];
        if (row == "" ) {
            cards.push(curCard);
            curCard = [];
        }
        else {
            curCard.push(row.trim().split(/\ +/));
        };
    }

    return cards;
}

var sumCard = function (card) {
    let sum = 0;

    for (i= 0; i < card.length; i++)
    {
        let row = card[i];
        for (j=0; j < row.length; j++ ) 
        {
            if (parseInt(row[j])) {
                sum += parseInt(row[j]);
            }
            
        }
    }

    return sum;
} 

var markNumber = function (card, number) {

    for (i= 0; i < card.length; i++)
    {
        let row = card[i];
        for (j=0; j < row.length; j++ ) 
        {
            if (row[j] == number) {
                row[j] = "";
            }
        }
    } 

    return card;
}

var checkWin = function (card) {
    let rows = new Array(5).fill(1);
    let columns = new Array(5).fill(1);

    for (i=0; i < card.length; i++)
    {
        let row = card[i];
        for (j=0; j < row.length; j++) 
        {
            if (row[j] != '') {
                rows[i] = "";
                columns[j] = "";
            }
        }
    } 

    if (rows.join("") !== "") return true;
    if (columns.join("") !== "") return true;

    return false;
}

var playCard = function (card, numStream) {

    for (let i = 0; i < numStream.length; i++)
    {
        let number = numStream[i];
        card = markNumber(card, number);
        if (checkWin(card)) return [number * sumCard(card), i];
    }

    return [0, 1000];

}

var findBestCardScore = function (cards, numStream) {
    let curBestCardScore = [0, 1000];

    for (let i = 0; i < cards.length; i++)
    {
        let cardScore = playCard(cards[i], numStream);
        if (cardScore[1] < curBestCardScore[1])
        {
            curBestCardScore = cardScore;
        }
    }
    return curBestCardScore;
}

var findWorstCardScore = function (cards, numStream) {
    let curWorstCardScore = [0, 0];

    for (let i = 0; i < cards.length; i++)
    {
        let cardScore = playCard(cards[i], numStream);
        if (cardScore[1] > curWorstCardScore[1])
        {
            curWorstCardScore = cardScore;
        }
    }
    return curWorstCardScore;
}

let cards = normalizeCards(input);

console.log(findWorstCardScore(cards, numStream))