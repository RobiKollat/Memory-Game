let timerValue = 0; //set the initial timer to 0
let timerInterval = null;  //stop the timer

$(function() {
  refresh();

  $('.restart').click(function() {
    refresh();
  });

});

function refresh() {

  $('.deck').empty();
  stopTimer();
  $('.timer').text(timerValue);

  let secondStar = $('.stars').children('li:nth-child(2)').children('i');
  let thirdStar = $('.stars').children('li:nth-child(3)').children('i');
  secondStar.removeClass('fa fa-star-o');
  thirdStar.removeClass('fa fa-star-o');
  secondStar.addClass('fa fa-star');
  thirdStar.addClass('fa fa-star');

/*
 * Create a list that holds all of your cards
 */
  const memoryCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
                      "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-bolt",
                      "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
                      "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb",
                      "fa fa-anchor", "fa fa-anchor", "fa fa-bomb"];
  let numOfMoves = 0;



 /*   - shuffle the list of cards using the provided "shuffle" method below*/
 
  $('.moves').text(numOfMoves);
  displayCards(memoryCards);
  addClickHandler();

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
*   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards (cards) {

  cards.forEach(function(cardImage) {
    $('.deck').append("<li class='card'> <i class='" + cardImage + "'></i>");
  });

}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - add the card to a *list* of "open" & "show" cards
 *  - call the chekcMatch() function, to see if the cards match
 */
 function addClickHandler() {
   $('.card').on('click', function() {
     if (timerValue === 0) {
       startTimer();
     }
     $(this).addClass('open show');
     checkMatch();
   });
 }

/*  function checkMatch:
*    + if the list('open' & 'show') has 2 cards, it check to see if the two cards match
*    + if the cards do match, lock the cards in the open position by adding it to 'match' class
*    + if the cards do not match, remove the cards from the ('open' & 'show') & adds it to 'noMatch' class and keeps them open for set time
*    + increment the move counter and display it on the page
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

 function checkMatch() {
   if ($('.open, .show').length == 2 ) {
     let firstCard = $('.open, .show').first().children('i').attr('class');
     let secondCard = $('.open, .show').last().children('i').attr('class');
     let numOfMoves = Number($('.moves').text());
     let numOfMatches = 0;
     numOfMoves++;
     $('.moves').text(numOfMoves);
     rankStars(numOfMoves);

     
     if(firstCard === secondCard) {
       $('.open, .show').each(function() {
         $(this).removeClass('open show');
         $(this).addClass('match');
       });
       $('.match').each(function() {
         numOfMatches++;
       });
       
       if (numOfMatches === 16) {
         displayScoreBoard(numOfMoves);
       }
     } else {
       
       $('.open, .show').each(function() {
         $(this).removeClass('open show');
         $(this).addClass('noMatch');
       });
       setTimeout(function() {
         $('.noMatch').each(function() {
           $(this).removeClass('noMatch');
         });
       }, 500);

     }
   }
}

/*  function rankStars(moveCnt):
*    + if the moveCnt is greater than 16, it displays 1 star
*    + if the moveCnt is greater than 11, but less than 17, it displays 2 stars,
*    + else nothing changes and continues to display 3 stars.
*/
function rankStars(moveCnt) {
  if (moveCnt > 16) {
    let secondStar = $('.stars').children('li:nth-child(2)').children('i');
    let thirdStar = $('.stars').children('li:nth-child(3)').children('i');
    secondStar.removeClass('fa fa-star');
    secondStar.addClass('fa fa-star-o');
    thirdStar.removeClass('fa fa-star');
    thirdStar.addClass('fa fa-star-o');
  } else if (moveCnt > 11 && moveCnt < 17) {
    let thirdStar = $('.stars').children('li:nth-child(3)').children('i');
    thirdStar.removeClass('fa fa-star');
    thirdStar.addClass('fa fa-star-o');
  }
}

/*  function displayScoreBoard(moveCnt):
*    + displays the final result of the game, ie. the number of moves it took
*    + the user to finish the game, how many stars they earned and how long.
*    + it took them.  At the end it allows the user, to replay the game.
*/
function displayScoreBoard(moveCnt) {

 let timeElapsed = timerValue;
 stopTimer();
 const popup = document.getElementById("modal_displayScoreBoard");
 let cntStars;
 if (moveCnt > 16) {
   cntStars = 1;
 } else if (moveCnt > 11 & moveCnt < 17) {
   cntStars = 2;
 } else {
   cntStars = 3;
 }
 const h4_text = "With " + moveCnt + " moves and " + cntStars + " Star(s).";
 $('#score_hdr').text(h4_text);
 $('#time_taken').text("Time taken: " + timeElapsed + " seconds");
 popup.style.display = "block";
 document.getElementById("playAgain_btn").addEventListener('click', function() {
   popup.style.display = "none";
   refresh();
 });

}

/*  function startTimer():
*    + initializes the timer and updates it every 1000milli-seconds.
*/
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

/*  function updateTimer():
*    + increments the timer and changes the timer in the header every 1000milli-seconds.
*/
function updateTimer() {
  timerValue++;
  $('.timer').text(timerValue);
}

/*  function stopTimer():
*    + stops the timer.
*/
function stopTimer() {
  timerValue = 0;
  clearInterval(timerInterval);
}