import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div>
          <p className="eyebrow">Pokemon card manager</p>

          <h1>Escanea, organiza y gestiona tus cartas Pokémon</h1>

          <p className="hero-text">
            PokéScan te ayuda a registrar cartas, mantener tu inventario,
            preparar intercambios y revisar estadísticas de tu colección.
          </p>

          <div className="hero-actions">
            <Link to="/scanner" className="primary-button">
              Escanear carta
            </Link>

            <Link to="/inventory" className="secondary-button">
              Ver inventario
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="fake-card">
            <div className="fake-card-header">
              <span>Pikachu</span>
              <span>⚡</span>
            </div>

            <div className="fake-card-image">
              <img
                src="https://images.pokemontcg.io/base1/58.png"
                alt="Pikachu"
              />
            </div>

            <p>Base Set · Common</p>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <span>📷</span>
          <h3>Escáner asistido</h3>
          <p>Sube una imagen y busca la carta correcta en la API Pokémon.</p>
        </div>

        <div className="feature-card">
          <span>📚</span>
          <h3>Inventario</h3>
          <p>Guarda tus cartas con imagen, rareza, tipo, set y cantidad.</p>
        </div>

        <div className="feature-card">
          <span>🤝</span>
          <h3>Intercambios</h3>
          <p>Marca cartas disponibles para intercambio y organízalas aparte.</p>
        </div>

        <div className="feature-card">
          <span>📊</span>
          <h3>Estadísticas</h3>
          <p>Analiza tu colección por tipo, rareza y cantidad total.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;