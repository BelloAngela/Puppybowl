
const cohortName = "2109-UNF-HY-WEB-PT";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;
export async function Fetchplayers() {
  try {
    const response = await fetch(`${APIURL}/players`);
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result.data.players;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchsinglePlayer(playerId) {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const result = await response.json();
    return result.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
}

export async function newplayer(playerObj) {
  try {
    const response = await fetch(`${APIURL}/players`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(playerObj),
    });
    return await response.json();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
}

export async function deleteplayer(playerId) {
  fetch(`${APIURL},${cohortName}/players/${playerId}`, {
    method: "Delete",
  });
  try {
    const response = await fetch(APIURL, {
      method: "Delete",
    });
    return await response.json();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
}
