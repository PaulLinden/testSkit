// Array to store the high scores
const highScoreNames = [];
const highScoreScores = [];

// Get the ordered list element from the HTML
const orderdList = document.querySelector('ol');

// Function to fetch high-score data from Firebase
async function fetchHighScoreData() {
    try {
        const url = 'https://r-p-s-2c0f0-default-rtdb.europe-west1.firebasedatabase.app/high-score.json';
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch high score data');
    }
}

// Function to update the high-score list on Firebase
async function putToFirebase(name, score) {
    try {
        const data = await fetchHighScoreData();

        // Iterate through the top 5 high scores
        for (let i = 1; i <= 5; i++) {
            if (score > data[i].score) {
                updateHighscoreList(name, score, i);
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to create the high-score list on the page
function createHighScoreListandDisplay(data) {
    try {
        // Iterate through the top 5 high scores
        for (let i = 1; i <= 5; i++) {
            // Add the name and score to their respective arrays
            highScoreNames.push(data[i].name);
            highScoreScores.push(data[i].score);
        }

        // Clear the ordered list element
        orderdList.replaceChildren();

        // Iterate through the names and scores arrays to create the list items
        for (let i = 0; i < 5; i++) {   
            const listItem = document.createElement('li');
            listItem.textContent = `${highScoreNames[i]} : ${highScoreScores[i]}`;
            orderdList.appendChild(listItem);
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to update the high score list on Firebase and the page
async function updateHighscoreList(name, score, i) {
    try {
        // Set the URL for the high score to update
        const url = `https://r-p-s-2c0f0-default-rtdb.europe-west1.firebasedatabase.app/high-score/${i}.json`;

        // Create the new high score object to be sent to Firebase
        const newHighScore = {
            "name": name,
            "score": score
        };

        // Set the options for the fetch request
        const options = {
            method: 'PUT',
            body: JSON.stringify(newHighScore),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        // Send the fetch request to Firebase to update the high score
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        // Update the local names and scores arrays
        highScoreNames.splice(i - 1, 0, name);
        highScoreScores.splice(i - 1, 0, score);

        // Remove the last element from the arrays
        highScoreNames.pop();
        highScoreScores.pop();

        const newListItem = document.createElement('li');
        newListItem.textContent = `${name}: ${score}`;

        // Insert the new list item into the correct position
        const listItems = orderdList.querySelectorAll('li');
        if (listItems.length >= i) {
            orderdList.insertBefore(newListItem, listItems[i - 1]);
        } else {
            orderdList.appendChild(newListItem);
        }

        // Remove any additional list items if there are more than 5
        if (listItems.length > 4) {
            orderdList.removeChild(listItems[listItems.length - 1]);
        }
    } catch (error) {
        console.log(error);
    }
}

export { fetchHighScoreData, putToFirebase, createHighScoreListandDisplay }

