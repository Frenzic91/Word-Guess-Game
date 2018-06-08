// was trying to make the code nice and organized but time pressure turned it into a complete mess, sorry :P
// also didnt have time to make a decent ui

class WordGuessGame {
    constructor() {
        this.maxAttempts;
        this.wordList;
        this.curWord;
        this.curWordCopy;
        this.guess;
        this.incorrectGuesses;
        this.curAttempt;
        this.wins = 0;
    }

    setMaxAttempts(maxAttempts) {
        this.maxAttempts = maxAttempts;
    }

    setWordList(wordList) {
        this.wordList = wordList;
    }

    pickRandWord() {
        this.curWord = new String(this.wordList[Math.floor(Math.random() * this.wordList.length)]);
        this.curWordCopy = new String(this.curWord);
    }

    isLetterInWord(letter) {
        var index = this.curWordCopy.indexOf(letter);
        if (index >= 0) {
            return true;
        }
        return false;
    }

    increaseAttemptCount() {
        this.curAttempt++;
        document.querySelector("#attempts-left").innerHTML = this.maxAttempts - this.curAttempt;
    }

    updateGuess(letter) {
        var letterPos = this.curWordCopy.indexOf(letter);
        var guessAsArray = this.guess.split("");
        guessAsArray[letterPos] = letter;
        this.guess = guessAsArray.join("");

        document.querySelector("#guess-so-far").innerHTML = this.guess;

        var curWordCopyAsArray = this.curWordCopy.split("");
        curWordCopyAsArray[letterPos] = "_";
        this.curWordCopy = curWordCopyAsArray.join("");
    }

    updateWrongGuesses(letter) {
        this.incorrectGuesses.push(letter);

        document.querySelector("#guessed-letters").innerHTML = this.incorrectGuesses;
    }

    isNewGuess(letter) {
        return this.incorrectGuesses.indexOf(letter) < 0;
    }

    guessMatchesWord() {
        return this.guess == this.curWord;
    }

    isInProgress() {
        return this.curAttempt != this.maxAttempts;
    }

    updateWins() {
        this.wins++;

        document.querySelector("#wins-count").innerHTML = this.wins;
    }

    init() {
        this.curAttempt = 0;
        this.incorrectGuesses = [];

        this.pickRandWord();

        this.guess = "_".repeat(this.curWord.length);

        document.querySelector("#wins-count").innerHTML = this.wins;
        document.querySelector("#guess-so-far").innerHTML = this.guess;
        document.querySelector("#attempts-left").innerHTML = this.maxAttempts - this.curAttempt;
        document.querySelector("#guessed-letters").innerHTML = this.incorrectGuesses;

        document.getElementById("animal-image").src = "./assets/images/" + this.curWord + ".jpg";
    }
}

$(document).ready(function () {
    var game = new WordGuessGame();

    game.setMaxAttempts(15);
    game.setWordList(["ferret", "salamander", "otter", "gorilla", "hummingbird"]);
    game.init();

    console.log("Current word: ", game.curWord);

    document.onkeypress = function (e) {
        if (game.isInProgress()) {

            if (!game.isNewGuess(e.key)) {
                return;
            }

            console.log("Attempt #: ", game.curAttempt);

            if (game.isLetterInWord(e.key)) {
                game.updateGuess(e.key);
                if (game.guessMatchesWord()) {
                    game.updateWins();
                    game.init();
                }
            } else {
                game.increaseAttemptCount();
                game.updateWrongGuesses(e.key);
            }
        } else {
            game.init();
        }
    }
});
