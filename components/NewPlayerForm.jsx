import { useState } from "react";
import { newplayer } from "../API";

export default function Newplayerform() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await newplayer({ name, breed });
      console.log("New player added:", response);
      setName("");
      setBreed("");
    } catch (error) {
      console.error("Error adding player:", error);
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-center bg-gray-100">
        <div className="flex justify-between items-center px-20 py-5">
          <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
            Create Player
          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Breed:
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <br />
        <button
          className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          type="submit"
        >
          Add Player
        </button>
      </form>
    </div>
  );
}