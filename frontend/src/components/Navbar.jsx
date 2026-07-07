import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">⚡</span>
        PokéScan
      </Link>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/scanner">Escáner</Link>
        <Link to="/inventory">Inventario</Link>
        <Link to="/trade">Intercambios</Link>
        <Link to="/stats">Estadísticas</Link>
        <Link to="/add-card">Buscar</Link>
      </div>
    </nav>
  );
}

export default Navbar;