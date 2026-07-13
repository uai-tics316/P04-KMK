import { useEffect, useMemo, useState } from "react";

import { getCards } from "../services/api";


function Stats() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    getCards()
      .then((data) => {
        if (active) {
          setCards(data);
        }
      })
      .catch((error) => {
        console.error(
          "Error cargando estadísticas:",
          error
        );

        if (active) {
          setErrorMessage(
            "No se pudieron cargar las estadísticas."
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const statistics = useMemo(() => {
    const typeCount = {};
    const rarityCount = {};

    let totalQuantity = 0;
    let tradeQuantity = 0;

    cards.forEach((card) => {
      const quantity = Number(card.quantity) || 0;
      const type = card.type || "Unknown";
      const rarity = card.rarity || "Unknown";

      totalQuantity += quantity;

      if (card.for_trade) {
        tradeQuantity += quantity;
      }

      typeCount[type] =
        (typeCount[type] || 0) + quantity;

      rarityCount[rarity] =
        (rarityCount[rarity] || 0) + quantity;
    });

    return {
      totalQuantity,
      uniqueCards: cards.length,
      tradeQuantity,
      typeCount,
      rarityCount,
    };
  }, [cards]);

  if (loading) {
    return (
      <div className="page">
        Cargando estadísticas...
      </div>
    );
  }

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Estadísticas</p>
        <h1>Resumen de tu colección</h1>
        <p>
          Analiza la cantidad total, las cartas únicas
          y la distribución por tipo y rareza.
        </p>
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total de copias</span>
          <strong>
            {statistics.totalQuantity}
          </strong>
        </div>

        <div className="summary-card">
          <span>Cartas únicas</span>
          <strong>
            {statistics.uniqueCards}
          </strong>
        </div>

        <div className="summary-card">
          <span>Copias para intercambio</span>
          <strong>
            {statistics.tradeQuantity}
          </strong>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-panel">
          <h2>Copias por tipo</h2>

          {Object.keys(
            statistics.typeCount
          ).length === 0 ? (
            <p>No hay datos todavía.</p>
          ) : (
            Object.entries(statistics.typeCount)
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => (
                <div className="stat-row" key={type}>
                  <span>{type}</span>
                  <strong>{count}</strong>
                </div>
              ))
          )}
        </div>

        <div className="stats-panel">
          <h2>Copias por rareza</h2>

          {Object.keys(
            statistics.rarityCount
          ).length === 0 ? (
            <p>No hay datos todavía.</p>
          ) : (
            Object.entries(statistics.rarityCount)
              .sort((a, b) => b[1] - a[1])
              .map(([rarity, count]) => (
                <div
                  className="stat-row"
                  key={rarity}
                >
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