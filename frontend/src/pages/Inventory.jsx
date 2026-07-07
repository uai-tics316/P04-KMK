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

    try {
      await deleteCard(id);
      loadCards();
    } catch (error) {
      console.error("Error eliminando carta:", error);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  if (loading) {
    return <p>Cargando inventario...</p>;
  }

  return (
    <div className="page">
      <h1>Inventario</h1>

      <CardGrid
        cards={cards}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Inventory;