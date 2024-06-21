import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchsinglePlayer } from "../API";
import { deleteplayer } from "../API";
export default function Singleplayer() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [oneplayer, setoneplayer] = useState(null);
  useEffect(() => {
    async function fetchplayer() {
      try {
        const response = await fetchsinglePlayer(id);
        setoneplayer(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchplayer();
  }, [id]);

  async function handleDelete() {
    try {
      const response = await deleteplayer(id);
      console.log("Player deleted:", response);
      navigate("/");
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center bg-gray-100">
        <div className="flex justify-between items-center px-20 py-5">
          <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
            Single Player
          </h1>
        </div>
      </div>
      <p className="text-lg uppercase font-bold">{id}</p>
      {oneplayer && (
        <div className="text-lg uppercase font-bold">
          <ul>
            <img src={oneplayer.imageUrl} />
            <li>Name: {oneplayer.name}</li>
            <li>Breed: {oneplayer.breed}</li>
          </ul>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={handleDelete}
          >
            Delete Player
          </button>
        </div>
      )}
    </>
  );
}