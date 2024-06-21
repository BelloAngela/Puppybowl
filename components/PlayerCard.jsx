/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
export default function Playercard({ player }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/players/${player.id}`);
  }
  return (
    <>
      <div className="bg-white shadow-md rounded-lg px-10 py-10">
        <img
          src={player.imageUrl}
          alt={player.name}
          className="rounded-md h-48"
        />
        <div className="mt-4">
          <h1 className="text-lg uppercase font-bold">{player.name}</h1>
        </div>
        <button
          className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={handleClick}
        >
          details
        </button>
      </div>
    </>
  );
}