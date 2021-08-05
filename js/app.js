/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

    // Creates a specific instance of the game,
    // contains the event listeners to control the game


// Phrases must be in lower case and have no punctuation
const phraseList = [
   new Phrase("to be or not to be"),
   new Phrase("what fools these mortals be"),
   new Phrase("all that glitters is not gold"),
   new Phrase("brevity is the soul of wit"),
   new Phrase("what is done cannot be undone"),
];

const game = new Game(phraseList);

// Start Game button
document.getElementById("btn__reset").addEventListener("click", e => game.startGame());

// letter buttons
buttonList.forEach(button => {
    button.addEventListener("click", e => {
        game.handleInteraction(button.textContent);
        });
    // If there is a background color indicating the correctness
    // of the last guess, remove it when the mouse 
    // hovers over a new button (would have preferred to activate
    // when the mouse leaves the chosen button, but 'mouseleave'
    // and 'mouseout' apparently don't trigger for disabled buttons
    // https://github.com/facebook/react/issues/4251
    // and this is consistent with my testing also)
    button.addEventListener("mouseenter",e => {
        clearBackground();
        });
    });
    
// keyboard interactions
document.addEventListener('keyup', e => {
    // if the overlayDiv has a parent, the game hasn't started
    // So, start the game if enter is pressed, and do nothing
    // for any other key
    if (overlayDiv.parentElement) {
        if (e.key === "Enter") {
            game.startGame();
        }
        return;
    }
    // if there is background for the last guess, clear it
    clearBackground();
    if (e.key.match(/^[A-Za-z]$/)) {
        const key = e.key.toLowerCase();
        const correspondingButton = getButton(key);
        if (!correspondingButton.disabled) {
            game.handleInteraction(key);
        }
    }
});
