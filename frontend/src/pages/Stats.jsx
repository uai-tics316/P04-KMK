import { useEffect, useState } from "react";
import { getCards } from "../services/api";

function Stats() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCards = async () => {
    try {
      const data = await getCards();
      setCards(data);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const totalQuantity = cards.reduce((total, card) => total + card.quantity, 0);
  const uniqueCards = cards.length;
  const tradeCards = cards.filter((card) => card.for_trade).length;

  const typeCount = {};
  const rarityCount = {};

  cards.forEach((card) => {
    typeCount[card.type] = (typeCount[card.type] || 0) + 1;
    rarityCount[card.rarity] = (rarityCount[card.rarity] || 0) + 1;
  });

  if (loading) {
    return <div className="page">Cargando estadísticas...</div>;
  }

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Estadísticas</p>
        <h1>Resumen de tu colección</h1>
        <p>
          Analiza cuántas cartas tienes, cuántas son únicas y cómo se
          distribuyen por tipo y rareza.
        </p>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total cartas</span>
          <strong>{totalQuantity}</strong>
        </div>

        <div className="summary-card">
          <span>Cartas únicas</span>
          <strong>{uniqueCards}</strong>
        </div>

        <div className="summary-card">
          <span>Intercambios</span>
          <strong>{tradeCards}</strong>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-panel">
          <h2>Cartas por tipo</h2>

          {Object.keys(typeCount).length === 0 ? (
            <p>No hay datos todavía.</p>
          ) : (
            Object.entries(typeCount).map(([type, count]) => (
              <div className="stat-row" key={type}>
                <span>{type}</span>
                <strong>{count}</strong>
              </div>
            ))
          )}
        </div>

        <div className="stats-panel">
          <h2>Cartas por rareza</h2>

          {Object.keys(rarityCount).length === 0 ? (
            <p>No hay datos todavía.</p>
          ) : (
            Object.entries(rarityCount).map(([rarity, count]) => (
              <div className="stat-row" key={rarity}>
                <span>{rarity}</span>
                <strong>{count}</strong>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Stats;