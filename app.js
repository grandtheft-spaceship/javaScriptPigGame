/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// document.querySelector( "#current-" + activePlayer ).textContent = dice;
// document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";
// var x = document.querySelector( "#score-0" ).textContent;
// console.log(x)

var scores, roundScore, activePlayer, dice, gamePlaying, previousRolls = [];

init();

document.querySelector( ".btn-roll" ).addEventListener( "click", function() {
  if ( gamePlaying ) {
    // 1. Generate a random number
    dice = Math.floor( ( Math.random() * 6 ) + 1 );
    console.log(dice);
    storeRolls(dice);
    // 2. Diplay the result
    var diceDOM = document.querySelector( ".dice" );
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. Update the round score IF the rolled number was NOT a 1
    if ( dice !== 1 ) {
      if ( dice === 6 ) {
        doubleSixes();
      };
      roundScore += dice;
      document.querySelector( "#current-" + activePlayer ).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }

  }

});

document.querySelector( ".btn-hold" ).addEventListener( "click", function() {
  if ( gamePlaying ) {
    // 1. Add current round score to global score
    scores[activePlayer] += roundScore;
    // 2. Update the UI
    document.querySelector( "#score-" + activePlayer ).textContent = scores[activePlayer];
    // 3. Check if player won the game

    if ( scores[activePlayer] >= 100 ) {
      document.querySelector( "#name-" + activePlayer ).textContent = "Winner!";
      document.querySelector( ".dice" ).style.display = "none";
      document.querySelector( ".player-" + activePlayer + "-panel" ).classList.add( "winner" );
      document.querySelector( ".player-" + activePlayer + "-panel" ).classList.remove( "active" );

      gamePlaying = false;
    } else {
      nextPlayer();
    }

  }

});

document.querySelector( ".btn-new" ).addEventListener( "click", init );

function init() {
  gamePlaying = true
  scores = [ 0, 0 ];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector( ".dice" ).style.display = "none";

  document.getElementById( "score-0" ).textContent = "0";
  document.getElementById( "score-1" ).textContent = "0";
  document.getElementById( "current-0" ).textContent = "0";
  document.getElementById( "current-1" ).textContent = "0";

  document.getElementById( "name-0" ).textContent = "Player 1";
  document.getElementById( "name-1" ).textContent = "Player 2";

  document.querySelector( ".player-0-panel" ).classList.remove( "winner" );
  document.querySelector( ".player-1-panel" ).classList.remove( "winner" );

  document.querySelector( ".player-0-panel" ).classList.remove( "active" );
  document.querySelector( ".player-1-panel" ).classList.remove( "active" );
  document.querySelector( ".player-0-panel" ).classList.add( "active" );

};

function nextPlayer() {
  // Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById( "current-0" ).textContent = "0";
  document.getElementById( "current-1" ).textContent = "0";

  // document.querySelector( ".player-0-panel" ).classList.remove( "active" );
  // document.querySelector( ".player-1-panel" ).classList.add( "active" );

  document.querySelector( ".player-0-panel" ).classList.toggle( "active" );
  document.querySelector( ".player-1-panel" ).classList.toggle( "active" );

  document.querySelector( ".dice" ).style.display = "none";
}

function storeRolls(currentRoll) {
  previousRolls.length <= 2 ? previousRolls.push(currentRoll) : previousRolls = new Array;
}

function doubleSixes() {
  // If player rolls two 6's back-to-back, GLOBAL score is returned to 0 and it is the next player's turn
  // 1. Create an variable to store previous roll
  // 2. After next roll, verify that two 6's have not been rolled
  // 3. If two 6's have been rolled, erase GLOBAL score
  // 4. End player's turn
  if ( previousRolls[0] === previousRolls[1] ) {
    console.log("DOUBLE 6's!")
    scores[activePlayer] = 0;
    document.querySelector( "#score-" + activePlayer ).textContent = "0";
    previousRolls = new Array;
    nextPlayer();
  }
}
