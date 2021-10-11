"use strict";

var numCardsPulled = 0;

var player = {
    cards: [],
    score: 0,
    money: 100
};
var dealer = {
    cards: [],
    score: 0
};
var deck = {
    deckArray: [],
    initialize: function () {
        var suitArray, rankArray, s, r;
        suitArray = ["clubs", "diamonds", "hearts", "spades"];
        rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
        for (s = 0; s < suitArray.length; s += 1) {
            for (r = 0; r < rankArray.length; r += 1) {
                this.deckArray[s * 13 + r] = {
                    rank: rankArray[r],
                    suit: suitArray[s]
                };
            }
        }
    },
    shuffle: function () {
        var temp, i, randomCard;
        for (i = 0; i < this.deckArray.length; i += 1) {
            randomCard = Math.floor(Math.random() * this.deckArray.length);
            temp = this.deckArray[i];
            this.deckArray[i] = this.deckArray[randomCard];
            this.deckArray[randomCard] = temp;
        }
    }
};

document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
deck.initialize();
deck.shuffle();
// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\Get card value according to random card drawn/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
function getCardsValue(a) {
    var cardArray = [],
        sum = 0,
        i = 0,
        aceCount = 0;
    cardArray = a;
    for (i; i < cardArray.length; i += 1) {
        if (cardArray[i].rank === "J" || cardArray[i].rank === "Q" || cardArray[i].rank === "K") {
            sum += 10;
        } else if (cardArray[i].rank === "A") {
            sum += 11;
            aceCount += 1;
        } else {
            sum += cardArray[i].rank;
        }
    }
    while (aceCount > 0 && sum > 21) {
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}
    // module.exports =  getCardsValue; //for testing
// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\Bet Game initially player has 100$/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
function bet(outcome) {
    var playerBet = document.getElementById("bet").valueAsNumber;
    if (outcome === "win") {
        player.money += playerBet;
    }
    if (outcome === "lose") {
        player.money -= playerBet;
    }
}

// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\Reset Game make game as starting when out of money /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
function resetGame() {
    numCardsPulled = 0;
    player.cards = [];
    dealer.cards = [];
    player.score = 0;
    dealer.score = 0;
    deck.initialize();
    deck.shuffle();
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("bet").disabled = false;
    document.getElementById("bet").max = player.money;
    document.getElementById("new-game-button").disabled = false;
}
// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\End Game once player got result/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
function endGame() {
    if (player.score === 21) {
        document.getElementById("message-board").innerHTML = "You win! You got blackjack." + "<br>" + "Click Deal to keep playing";
        bet("win");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    if (player.score > 21) {
        document.getElementById("message-board").innerHTML = "You went over 21! The dealer wins" + "<br>" + "Click Deal to keep playing";
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    if (dealer.score === 21) {
        document.getElementById("message-board").innerHTML = "You lost. Dealer got blackjack" + "<br>" + "Click Deal to keep playing";
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    if (dealer.score > 21) {
        document.getElementById("message-board").innerHTML = "Dealer went over 21! You win!" + "<br>" + "Click Deal to keep playing";
        bet("win");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
        document.getElementById("message-board").innerHTML = "You win! You beat the dealer." + "<br>" + "Click Deal to keep playing";
        bet("win");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
        document.getElementById("message-board").innerHTML = "You lost. Dealer had the higher score." + "<br>" + "Click Deal to keep playing";
        bet("lose");
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        resetGame();
    }
    if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
        document.getElementById("message-board").innerHTML = "You tied! " + "<br>" + "Click Deal to keep playing";
        resetGame();
    }
    if (player.money <= 0) {
        document.getElementById("new-game-button").disabled = true;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById("message-board").innerHTML = "You lost!" + "<br>" + "You are out of money" + "<br>" + "<input type='button' value='New Game' onclick='location.reload();'/>";
    }
}
// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\Get random card for Dealer and adding score/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
var dealerDrawCoumt = -1;
function dealerDraw() {
    dealer.cards.push(deck.deckArray[numCardsPulled]);
    dealer.score = getCardsValue(dealer.cards);
    // console.log()
    dealerDrawCoumt++;
    let cardImage = document.createElement('img');
    cardImage.src = `./images/${dealer.cards[dealerDrawCoumt]['rank']}.png`;
    document.getElementById("dealer-cards").appendChild(cardImage).classList.add("cardImg");
    // document.getElementById("dealer-cards").innerHTML = "Dealer Cards: " + JSON.stringify(dealer.cards);
    document.getElementById("dealer-score").innerHTML = "Dealer Score: " + dealer.score;
    numCardsPulled += 1;
}

// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\New Game/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
function newGame() {
    document.getElementById("new-game-button").disabled = true;
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    document.getElementById("bet").disabled = true;
    document.getElementById("message-board").innerHTML = "";
    hit();
    hit();
    dealerDraw();
    endGame();
}


// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\Get random cards for player/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
var hitCount = -1;
function hit() {
    hitCount++;
    player.cards.push(deck.deckArray[numCardsPulled]);
    player.score = getCardsValue(player.cards);
    let cardImage = document.createElement('img');
    cardImage.src = `./images/${player.cards[hitCount]['rank']}.png`;
    document.getElementById("player-cards").appendChild(cardImage).classList.add("cardImg");
    document.getElementById("player-score").innerHTML = "Player Score: " + player.score;
    numCardsPulled += 1;
    if (numCardsPulled >= 2) {
        endGame();
    }
}
// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\Stand is used when player want to stop game and get result/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
function stand() {
    while (dealer.score < 17) {
        dealerDraw();
    }
    endGame();  
}