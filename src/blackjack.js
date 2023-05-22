import React, {useState, useEffect} from 'react'; //do i need useEffect?
import {Link} from "react-router-dom";

class Card {
    constructor(rank, suit, val){
        this.rank = rank;
        this.suit = suit;
        this.val = val;
    }

    setVal(newVal){ this.val = newVal; }
}

function Blackjack() {
    const [startButton, setStartButton] = useState(true);
    const [gameSection, setGameSection] = useState(false);
    const [afterGameOptions, setAfterGameOptions] = useState(false);

    var handD = []; //Dealer's hand
    var handP = []; //Player's hand

    function game(){
        setStartButton(!startButton);
        setGameSection(!gameSection);
        setTimeout(function() { //wait
            const deck = makeDeck();
            shuffle(deck);
            hit(deck, handD);
            hit(deck, handD);
            console.log("Dealer's face up card is " + handD[0].rank); //display 2nd card  as facedown then faceup
            handPrint(handD, 2, "handDealer");

            hit(deck, handP);
            hit(deck, handP);
            handPrint(handP, 2, "handPlayer");
            //if( ( (handP[0].val == 1) && (handP[1].val == 10) ) || ( (handP[0].val == 10) && (handP[1].val == 1) ) ) console.log("You have blackjack"); //output text on html pg

            playerTurn(deck, handP);

             //if(handVal(handP) > 21) { console.log("Player Busts"); }

            //while( (handVal(handP) < 21) && (!stand) ){
                //stand = true;//testing
        }, 100);
    }

    function playerTurn(deck, hand){
         document.getElementById('hit-btn').onclick = function() {
            hit(deck, hand);
            handPrint(hand, 1, "handPlayer");
         };

         document.getElementById('stand-btn').onclick = function() {
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
        //afterGameOptions.hidden = false;
    }

    function gameOutcome(){
        setAfterGameOptions(!afterGameOptions);
        if(handVal(handD) > 21)  {
            document.getElementById('gameResult').innerHTML = "Player Wins";
            //fetch('http://localhost:5000/updateWin', { //replace
                //headers:{
                    //'Content-type': 'application/json'
                //},
                //method: 'PATCH'
            //})
        }
        else if(handVal(handP) > 21) {
            document.getElementById('gameResult').innerHTML = "Dealer Wins";
            //fetch('http://localhost:5000/updateWin', { //replace
                //headers:{
                    //'Content-type': 'application/json'
                //},
                //method: 'PATCH'
            //})
        }
        else{
            if(handVal(handP) > handVal(handD) ) {
                document.getElementById('gameResult').innerHTML = "Player Wins";
                //fetch('http://localhost:5000/updateWin', { //replace
                    //headers:{
                        //'Content-type': 'application/json'
                    //},
                    //method: 'PATCH'
                //})
            }
            else if(handVal(handP) < handVal(handD) ) {
                document.getElementById('gameResult').innerHTML = "Dealer Wins";
                //fetch('http://localhost:5000/updateLoss', { //replace
                    //headers:{
                        //'Content-type': 'application/json'
                    //},
                    //method: 'PATCH'
                //})
            }
            else {
                document.getElementById('gameResult').innerHTML = "Draw";
                //fetch('http://localhost:5000/updateTie', { //replace
                    //headers:{
                       // 'Content-type': 'application/json'
                    //},
                    //method: 'PATCH'
                //})
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
            img.src = String(process.env.PUBLIC_URL + "/images/" + hand[i].rank + "_of_" + hand[i].suit + "s.png");
            img.width = 125;
            img.length = 182;
            document.getElementById(tableId).appendChild(img);
        }
    }
//hide gameSection
    return( // document.getElementById('start-game-btn').style.visibility = 'hidden'; on start the game button
        <div>
            {startButton && <button onClick={ () => game() }> Start the Game </button>}
            {gameSection && <main id="gameSection">
                <br></br>
                <table id="handDealer">
                    <tr>
                        <th>Dealer's Hand</th>
                    </tr>
                </table>
                <br></br>
                <br></br>
                <table id="handPlayer">
                    <tr>
                        <th>Your Hand</th>
                    </tr>
                </table>

                <section id="gameOptions">
                    <button id="hit-btn"> Hit </button>
                    <button id="stand-btn"> Stand </button>
                </section>

                <p id="gameResult"></p>

                {afterGameOptions && <section id="afterGameOptions">
                    <button onClick={ () => window.location.reload(false) }> Play Again </button>
                    <Link to="/Account">
                        <button>
                            Exit
                        </button>
                    </Link>
                </section>}
            </main>}
        </div>
    );
}

export default Blackjack;