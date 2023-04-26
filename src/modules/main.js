import { setupGameStart} from './start.js';
import { playGame } from './game.js';


document.addEventListener('DOMContentLoaded', () => {
  setupGameStart();
});


const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // When player submits name game starts
    if (button.value === 'submit') {
      playGame();
    }
  
    // Returns back to menu
    if (button.value === 'quit') {
      setupGameStart();
    }
  });
});







