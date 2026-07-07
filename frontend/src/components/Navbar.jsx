import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>PokéScan</h2>

      <div>
        <Link to="/">Inicio</Link>
        <Link to="/scanner">Escáner</Link>
        <Link to="/inventory">Inventario</Link>
        <Link to="/add-card">Buscar carta</Link>
      </div>
    </nav>
  );
}

export default Navbar;