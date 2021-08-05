# Phrase Hunter

Project 4 for Treehouse JavaScript Techdegree

## Description

This project implements a phrase guessing game, which is essentially hangman with multiple words.  Letters can be selected either by typing the appropriate letter on the keyboard or by clicking a button for the corresponding letter on screen.

## Remarks

This project is intended as a JavaScript project, so the HTML and CSS files were provided.  However, changes were made to the provided CSS file to implement the following customizations:

1.  Hovering the mouse cursor over a disabled letter button turns the button read, and hides the letter (by turning it red as well).
2.  Hovering the mouse cursor over an available letter button turns the button green.
2.  Disabled buttons (for letters already guessed) show the 'not-allowed' cursor.
3.  Disabled highlighting of hidden phrase letters so the player can't simply reveal the phrase by highlighting it.

Additionally, JavaScript was used to change the background to green or red for 1 second based on whether a guess was correct or incorrect.  The background returns to white immediately if another key is pressed, or the cursor hovers over another button.
