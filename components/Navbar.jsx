import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <div className="text-2xl uppercase font-bold mt-10 text-center mb-10">
        <Link to="/">Home</Link>
        <Link to="/players/ :id">Singleplayer</Link>
        <Link to="/newplayerform">Newplayer</Link>
      </div>
    </div>
  );
}