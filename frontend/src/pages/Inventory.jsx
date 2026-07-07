import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getCards, deleteCard } from "../services/api";

function Inventory() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCards = async () => {
    try {
      const data = await getCards();
      setCards(data);
    } catch (error) {
      console.error("Error cargando cartas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar esta carta?");

    if (!confirmDelete) return;

    await deleteCard(id);
    loadCards();
  };

  useEffect(() => {
    loadCards();
  }, []);

  const totalCards = cards.reduce((total, card) => total + card.quantity, 0);
  const tradeCards = cards.filter((card) => card.for_trade).length;

  if (loading) {
    return <div className="page">Cargando inventario...</div>;
  }

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Inventario</p>
        <h1>Tu colección Pokémon</h1>
        <p>
          Revisa tus cartas guardadas, elimina cartas duplicadas o marca cuáles
          quieres dejar disponibles para intercambio.
        </p>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total cartas</span>
          <strong>{totalCards}</strong>
        </div>

        <div className="summary-card">
          <span>Cartas únicas</span>
          <strong>{cards.length}</strong>
        </div>

        <div className="summary-card">
          <span>Para intercambio</span>
          <strong>{tradeCards}</strong>
        </div>
      </div>

      <CardGrid
        cards={cards}
        onDelete={handleDelete}
        onRefresh={loadCards}
      />
    </div>
  );
}

export default Inventory;