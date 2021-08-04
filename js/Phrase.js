/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

    // This file defines the Phrase class


// The <div> that contains the <ul> containing the letter boxes
const phraseDiv = document.getElementById('phrase');

class Phrase {
    constructor(phrase) {
        // the string specifying the phrase
        this.phrase = phrase.toLowerCase();
    }
    addPhraseToDisplay() {
        // remove previous phrase
        phraseDiv.innerHTML = "";
        const ul = document.createElement('ul');
        phraseDiv.appendChild(ul);
        this.phrase.split('').forEach(letter => {
            const li = document.createElement('li');
            if (letter.match(/[a-z]/)) {
                li.className = `hide letter ${letter}`;
                li.textContent = letter;
            // The project only requires phrases to be letters
            // and spaces, so convert anything not a letter to
            // a space, just in case some other punctuation slips through
            } else {
                li.className = 'space';
                li.textContent = " ";
            }
            ul.appendChild(li);
        });
    }
    // returns true if character is a letter in the phrase, false otherwise
    checkLetter(character) {
        const phrase = this.phrase;
        for (let i = 0; i < phrase.length; i++) {
            if (phrase.charAt(i) === character) {
                return true;
            }
        }
        return false;
    }
    // reveals all letters in the game for the character
    showMatchedLetter(character) {
        const charLiList = document.querySelectorAll(`li.${character}`);
        for (let i = 0; i < charLiList.length; i++) {
            charLiList[i].classList.remove("hide");
            charLiList[i].classList.add("show");
        }
    }
 }
