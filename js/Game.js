/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


    // This file defines the Game class

// The CSS for the overlay element covers the entire screen
// if it is anywhere in the body (though in certain places,
// it won't be centered), even if it is hidden.
// The solution is to remove the element when we don't want it, 
// and append it to the 'main container' element  when we do.  
// For this, we need these references:
const overlayDiv = document.getElementById('overlay');
const mainContainer = document.querySelector('div.main-container');
// Correct/Incorrect background display time
const backgroundColorTime = 1000;

// The element containing the game over message
const gameOverMsgEl = document.getElementById("game-over-message");

// the buttonList (array of the letter buttons) is necessary for some tasks
const buttonList = document.querySelectorAll('button.key');

// The number of hearts displayed
const maxMisses = 5;
// The <ol> element for the hearts
const heartListOl = document.getElementById("scoreboard").children[0];


 class Game {
    constructor(phraseObjectList) {
        // keep track of incorrect guesses
        this.missed = 0;
        // An array of phrase objects that can be chosen for a game
        this.phrases = phraseObjectList;
        // The phrase object being used for the current game
        this.activePhrase = null;
        // Letters already guessed in this game (lower case)
        // must initialize with space already "guessed", otherwise
        // checking code thinks the space hasn't been guessed
        this.guessedLetters = {" ":true};
    }
    // Begins a new game
    startGame() {
        // prevent error if overlayDiv has already been
        // removed, and thus has no parent
        overlayDiv.parentElement && overlayDiv.parentElement.removeChild(overlayDiv);
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        this.guessedLetters = {" ":true};
        this.missed = 0;
        for (let i = 0; i < heartListOl.children.length; i++){
            // each <li> has an <img> child
            heartListOl.children[i].children[0].src="images/liveHeart.png";
        }
        restoreButtons();
    }
    // Selects a random phrase from phrases
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random()*this.phrases.length)];
    }
    // progresses the game with letter chosen
    handleInteraction(letter) {
        const button = getButton(letter);
        button.disabled = true;
        const correct = this.activePhrase.checkLetter(letter);
        this.guessedLetters[letter]=true;
        if (correct) {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(letter);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
            mainContainer.style.background = "#AAEEAA"
            setTimeout(clearBackground,backgroundColorTime);
        } else {
            button.classList.add("wrong");
            this.removeLife();
            mainContainer.style.background = "#EEAAAA"
            setTimeout(clearBackground,backgroundColorTime);
        }
    }
    // removes a game life
    removeLife() {
        // increment here, to facilitate generating the
        // heartListOl.children index below
        this.missed = this.missed + 1;
        if (this.missed > maxMisses) {
            this.gameOver(false);
        } else {
            const li = heartListOl.children[heartListOl.children.length-this.missed];
            li.children[0].src="images/lostHeart.png";
        }
    }
    // returns true if all the letters in the active phrase have been
    // guessed, and false otherwise
    checkForWin() {
        return this.activePhrase.phrase.split("")
            // if any letter in the phrase hasn't been guessed, allLettersGuessed
            // will be false from that point on, and false will be returned.
            // if all letters of the phrase have been guessed, they'll all be in
            // this.guessedLetters, and truth will be maintained;
            .reduce((allLettersGuessed,currentLetter) => {
                return (this.guessedLetters[currentLetter] || false) && allLettersGuessed
                },true);
    }
    // Ends the game, showing the overlay
    // playerWin = true means the player won the game,
    // playerWin = false means the player lost the game
    gameOver(playerWin) {
        // Per MDN
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
        // Node.appendChild(element) moves the element to the new position if
        // it is already in the document, so we don't have to check if
        // overlayDiv is already in the document (though if everything is working
        // as expected, it shouldn't be).
        mainContainer.appendChild(overlayDiv);
        overlayDiv.classList.remove("start");
        overlayDiv.classList.remove("win");
        overlayDiv.classList.remove("lose");
        if (playerWin) {
            overlayDiv.classList.add("win");
            gameOverMsgEl.textContent = `That's Right!  The phrase was "${this.activePhrase.phrase}."`
        } else {
            overlayDiv.classList.add("lose");
            gameOverMsgEl.textContent = "You ran out of hearts.  Better luck next time."
        }
    }
 }

// Given a lower case character,
// returns the button corresponding to the letter
function getButton(letter) {
    for (let i = 0; i < buttonList.length; i++) {
        if (buttonList[i].textContent === letter) {
            return buttonList[i];
        } 
    }
    // we shouldn't get here, since all letters have buttons
    console.log(`${letter} doesn't have a button!`);
}

// makes all the letter buttons usable again
function restoreButtons() {
   buttonList.forEach(button => {
       button.className = "key";
       button.disabled = false;
       });
}

// Removes color from the mainContainer background if there is any.
// also clears special button styling
function clearBackground() {
    mainContainer.style.background = "#FFFFFF";
}

document.addEventListener("mouseleave",clearBackground());
