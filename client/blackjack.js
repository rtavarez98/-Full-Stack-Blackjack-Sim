class Card {
    constructor(rank, suit, val){
        this.rank = rank;
        this.suit = suit;
        this.val = val;
    }

    setVal(newVal){ this.val = newVal; }
}

document.getElementById('start-game-btn').onclick = function() {
    gameSection.hidden = false;
    document.getElementById('start-game-btn').style.visibility = 'hidden';
    game();
 };

document.getElementById('retry-btn').onclick = function() {
    location.reload();
};

const retryBtn = document.querySelector('#retry-btn');
var handD = [];//Dealer's hand
var handP = [];//Player's hand

function game(){
    const deck = makeDeck();
    shuffle(deck);
    hit(deck, handD);
    hit(deck, handD);
    console.log("Dealer's face up card is " + handD[0].rank);//display 2nd card  as facedown then faceup
    handPrint(handD, 2, "handDealer");

    hit(deck, handP);
    hit(deck, handP);
    handPrint(handP, 2, "handPlayer");
    //if( ( (handP[0].val == 1) && (handP[1].val == 10) ) || ( (handP[0].val == 10) && (handP[1].val == 1) ) ) console.log("You have blackjack"); //output text on html pg


    playerTurn(deck, handP);


     //if(handVal(handP) > 21) { console.log("Player Busts"); }

    //while( (handVal(handP) < 21) && (!stand) ){
        //stand = true;//testing

}

function playerTurn(deck, hand){
     document.getElementById('hit-btn').onclick = function() {
        hit(deck, hand);
        handPrint(hand, 1, "handPlayer");
     };

     document.getElementById('stand-btn').onclick = function() {
        gameOptions.hidden = true;
        setTimeout(function() {
            dealerTurn(deck, handD);
        }, 1000); //delay by 1 second
     };
}

function dealerTurn(deck, hand){
    var stand = false;
    console.log(handVal(hand) );//testing
    while( (handVal(hand) < 21) && (!stand) ){
        if (handVal(hand) < 17) {
            hit(deck, hand);
            handPrint(hand, 1, "handDealer");
        }
        else stand = true;
    }
    gameOutcome();
    retryBtn.hidden = false;
}

function gameOutcome(){
    if(handVal(handD) > 21) {
        document.getElementById('gameResult').innerHTML = "Player Wins";
        fetch('http://localhost:5000/updateWin', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH'
        })
    }
    else if(handVal(handP) > 21) {
        document.getElementById('gameResult').innerHTML = "Dealer Wins";
        fetch('http://localhost:5000/updateWin', {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH'
        })
    }
    else{
        if(handVal(handP) > handVal(handD) ) {
            document.getElementById('gameResult').innerHTML = "Player Wins";
            fetch('http://localhost:5000/updateWin', {
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'PATCH'
            })
        }
        else if(handVal(handP) < handVal(handD) ) {
            document.getElementById('gameResult').innerHTML = "Dealer Wins";
            fetch('http://localhost:5000/updateLoss', {
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'PATCH'
            })
        }
        else {
            document.getElementById('gameResult').innerHTML = "Draw";
            fetch('http://localhost:5000/updateTie', {
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'PATCH'
            })
        }
    }
}

function makeDeck(){
    const deck = []
    const suits = ["heart", "diamond", "club", "spade"];
    const rank = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 13; j++){
            if(j >= 10) { deck.push(new Card( rank[j], suits[i], 10) ); }
            else{ deck.push(new Card( rank[j], suits[i], j + 1) ); }
        }
    }

    return deck;
}

function shuffle(deck){
    var temp;

    for(var i = 0; i < 52; i++){
        var r = Math.floor(Math.random() * 51);;
        temp = deck[r];
        deck[r] = deck[i];
        deck[i] = temp;
    }
}

function hit(deck, hand){
    hand.push(deck[deck.length - 1]);
    deck.length--;
}

function handVal(hand){
    var totVal = 0;
    var a1 = -1; //first ace in hand

    for(var i = 0; hand[i] != null; i++){
        if ( (a1 < 0) && (hand[i].rank === "ace") ){
            a1 =  i;
            hand[a1].setVal(11);
        }
        totVal = totVal + hand[i].val;
    }

    if ( (a1 > -1) && (totVal > 21) ) {
        hand[a1].setVal(1);
        totVal = totVal - 10;
    }

    return totVal;
}

function handPrint(hand, cardNum, tableId){
    for(var i = hand.length - cardNum; hand[i] != null; i++){
        var img = document.createElement("img");
        img.src = String("../images/" + hand[i].rank + "_of_" + hand[i].suit + "s.png");
        img.width = 125;
        img.length = 182;
        document.getElementById(tableId).appendChild(img);
    }
}



