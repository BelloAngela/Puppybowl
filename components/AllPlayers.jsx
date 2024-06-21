import { useEffect, useState } from "react";
import { Fetchplayers } from "../API";
import Playercard from "./playercard";

export default function Allplayers() {
  const [players, setPlayers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await Fetchplayers();
        setPlayers(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlayers();
  }, []);

  useEffect(() => {
    const filteredPlayers = players.filter((player) =>
      player.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResults(filteredPlayers);
  }, [searchValue, players]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div>
        <div className="flex flex-col justify-center bg-gray-100">
          <div className="flex justify-between items-center px-20 py-5">
            <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
              Puppy Bowl
            </h1>
          </div>
        </div>
        {}
        <div className="px-10 mb-4">
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Search players by name..."
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        {}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
          {searchResults.map((player) => (
            <Playercard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </>
  );
}