import { createPlayerCard } from './utils.js';

const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2109-UNF-HY-WEB-PT"; // Updated cohort name
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

// Fetch all players
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    const playersData = await response.json();
    return playersData.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const playerData = await response.json();
    return playerData.data.player; // Accessing the player data correctly
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

// Add new player
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });
    const result = await response.json();
    return result.data.player;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

// Remove player
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Player deleted successfully.");
    }
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

// Render all players
const renderAllPlayers = async () => {
  try {
    playerContainer.innerHTML = "";

    const playerList = await fetchAllPlayers();

    playerList.forEach((player) => {
      const playerElement = createPlayerCard(player);
      playerContainer.appendChild(playerElement);

      // See details
      const detailsButton = playerElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async () => {
        await renderSinglePlayerById(player.id); // Pass the player ID instead of the player object
      });

      // Delete player
      const deleteButton = playerElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async () => {
        await removePlayer(player.id);
        await renderAllPlayers();
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};




// Render single player by ID
const renderSinglePlayerById = async (playerId) => {
  try {
    const player = await fetchSinglePlayer(playerId); // Fetch the player details by ID

    // Render single player details to the DOM
    const playerDetailsElement = document.getElementById("player-details");
    playerDetailsElement.style.display = "block";
    playerDetailsElement.innerHTML = `
      <h2>Player Details</h2>
      <p>Name: ${player.name}</p>
      <p>Breed: ${player.breed}</p>
      <p>Status: ${player.status}</p>
      <p>Team: ${player.team ? player.team.name : 'N/A'}</p>
      <button class="close-button">Close</button>
    `;

    // Add event listener to the close button
    const closeButton = playerDetailsElement.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      playerDetailsElement.style.display = "none";
    });
  } catch (err) {
    console.error(`Oh no, trouble rendering player #${playerId}!`, err);
  }
};


// Render new player form
const renderNewPlayerForm = async () => {
  try {
    newPlayerFormContainer.innerHTML = "";
    const newPlayersForm = document.createElement("div");
    newPlayersForm.innerHTML = `
      <form id="myForm" action="/submit" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        
        <label for="breed">Breed:</label>
        <input type="text" id="breed" name="breed" required><br><br>
        
        <input type="submit" value="Submit">
      </form>
    `;
    newPlayerFormContainer.appendChild(newPlayersForm);

    document.getElementById("myForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      let newName = document.getElementById("name").value;
      let newBreed = document.getElementById("breed").value;
      let newPlayer = {
        name: newName,
        breed: newBreed,
      };
      await addNewPlayer(newPlayer);
      await renderAllPlayers();
      // Reset the form fields
      document.getElementById("myForm").reset();
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

// Initialize
const init = async () => {
  await renderAllPlayers();
  await renderNewPlayerForm();
};

init();
