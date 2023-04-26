import { player } from './start.js';
import { fetchHighScoreData, putToFirebase, createHighScoreListandDisplay } from './data.js';

// Define image IDs for rock, paper, and scissors
const imgIds = ['rock', 'paper', 'scissors'];

const resultDisplay = document.querySelector('#result');

// Initialize score to 0
let score = 0;

//Collects functions for easier export
function playGame() {

    // Select the game container and apply fadeIn animation
    const gameContainer = document.querySelector('#game');
    setTimeout(function () {
        displayHighscores();
        setImageUrls();
        addEventListenersToImages();
        updatePlayerName();
        gameContainer.className = 'fadeIn'
    }, 1000);

    // Call quitGame function to add event listener to quit button
    quitGame();
}

// Function to set image URLs to the rock, paper, and scissors images
function setImageUrls() {

    // Select all image elements
    const images = document.querySelectorAll('img');

    // Create an array of URLs for the rock, paper, and scissors images
    const imageUrls = [
        new URL('../media/rock.png', import.meta.url),
        new URL('../media/paper.png', import.meta.url),
        new URL('../media/scissors.png', import.meta.url)
    ];

    // Loop through each image and set its src attribute to the corresponding image URL
    images.forEach((img, index) => {
        img.src = imageUrls[index].href;
    });
}

// Function to add event listeners to the rock, paper, and scissors images
function addEventListenersToImages() {

    // Select all image elements
    const images = document.querySelectorAll('img');

    // Set timeout duration to 1.5 second
    const timeoutDuration = 1500; 
    let timerId;

    // Loop through each image and add a click event listener
    images.forEach((img, index) => {
        
        // If the timer is already running, return without executing the rest of the code
        img.addEventListener('click', () => {
            if (timerId) {
                return;
            }

             // Change the class of the clicked image to 'playerImg'
            img.className = 'playerImg';

            // Get the player's choice based on the index of the clicked image
            let playerChoice = imgIds[index];

            // Start the timer and execute the decideWinner function after the timeout duration
            timerId = setTimeout(() => {

               // Get the computer's choice
                const computerChoice = getComputerChoice();
                console.log(computerChoice);

                // Change the class of the computer's image to 'compImg'
                let computerImage = document.querySelector(`#${computerChoice}`);
                computerImage.className = 'compImg';

                // Call the decideWinner function to determine the winner and update the score
                decideWinner(playerChoice, computerChoice);

                // Reset the image styles after the timeout duration
                setTimeout(() => {
                    resetImageStyles();
                    resultDisplay.textContent = '';
                    timerId = null;
                }, timeoutDuration);

            }, timeoutDuration);
        });
    });
}

// Function to determine the computer's choice
function getComputerChoice() {
    // Generate a random number from 0 to 2
    let randomNumber = Math.round(Math.random() * 2);
    
    // Return the corresponding image ID from the array
    return imgIds[randomNumber];
}

//Function that contains logic for finding winner
function decideWinner(playerChoice, computerChoice) {

    // Check if the player wins
    if (playerChoice === imgIds[1] && computerChoice == imgIds[0] || playerChoice === imgIds[2] && computerChoice == imgIds[1] || playerChoice === imgIds[0] && computerChoice == imgIds[2]) {
        score++;
        resultDisplay.textContent = 'You win!';
    }
    else if(playerChoice === computerChoice) {// Check if it's a tie
        resultDisplay.textContent = 'Tie!';
    }
    else {// If the player loses
        // Send the player's name and score to Firebase
        putToFirebase(player.getName(), player.getScore());
        // Reset the score to 0
        score = 0;
        resultDisplay.textContent = 'You Lose!';
    }
    // Update the player's score and display it
    player.setScore(score);
    updateScoreDisplay(score);
}

// Resets styles on all images
function resetImageStyles() {
    const images = document.querySelectorAll('img');

    images.forEach(image => {
        image.className = '';
    });
}

// Updates the score display in the h3 element
function updateScoreDisplay(score) {
    const scoreDisplay = document.querySelector('h3');
    scoreDisplay.textContent = `score: ${score}`;
}

// Updates the player's name in the h1 element
function updatePlayerName() {
    const playerNameHeader = document.querySelector('#player');
    playerNameHeader.textContent = player.getName();
}

// Fetches the high-score data from Firebase and creates a list of high-scores
function displayHighscores() {
    fetchHighScoreData()
        .then(data => {
            createHighScoreListandDisplay(data);
        });
}
// Quits the game and returns to the main menu
function quitGame() {
    const quitButton = document.querySelector('#quit');
    quitButton.addEventListener('click', () => {

        // Resets score display
        updateScoreDisplay(0)

        // Hide the game container
        const gameContainer = document.querySelector("#game");
        gameContainer.className = 'hidden';

        // Show the main menu
        const menu = document.querySelector("#menu");
        menu.className = '';
    });
}

export { playGame }