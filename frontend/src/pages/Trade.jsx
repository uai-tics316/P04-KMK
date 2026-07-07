import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getCards, deleteCard } from "../services/api";

function Trade() {
  const [tradeCards, setTradeCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTradeCards = async () => {
    try {
      const data = await getCards();
      const filteredCards = data.filter((card) => card.for_trade);
      setTradeCards(filteredCards);
    } catch (error) {
      console.error("Error cargando intercambios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar esta carta?");

    if (!confirmDelete) return;

    await deleteCard(id);
    loadTradeCards();
  };

  useEffect(() => {
    loadTradeCards();
  }, []);

  if (loading) {
    return <div className="page">Cargando cartas para intercambio...</div>;
  }

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Intercambios</p>
        <h1>Cartas disponibles para intercambio</h1>
        <p>
          Aquí aparecen solamente las cartas que marcaste como disponibles
          para intercambiar.
        </p>
      </div>

      <CardGrid
        cards={tradeCards}
        onDelete={handleDelete}
        onRefresh={loadTradeCards}
      />
    </div>
  );
}

export default Trade;