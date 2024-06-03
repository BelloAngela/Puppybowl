// utils.js
export const createPlayerCard = (player) => {
    const playerElement = document.createElement("div");
    playerElement.classList.add("player-card");
    playerElement.innerHTML = `
      <h2>${player.name}</h2>
      <p>${player.breed}</p>
      <p>${player.status}</p>
      <img width="200" height="200" src=${player.imageUrl}>
      <br>
      <button class="details-button" data-id="${player.id}">See Details</button>
      <button class="delete-button" data-id="${player.id}">Delete</button>
    `;
    return playerElement;
  };
   