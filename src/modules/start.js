import { Player } from './player.js';

const player = new Player('Player', 0);

function setupGameStart() {
    addFormListener();
}

function addFormListener() {
  
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = document.querySelector('#playerName');
        
        if (nameInput.value != '') { 
        player.setName(nameInput.value);
        }
        else {
            player.setName('buffoon');
        }
        
        const menu = document.querySelector("#menu");
        menu.className = 'hidden';
    });
}

export { setupGameStart }
export{ player } 