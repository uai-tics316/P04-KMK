import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getCards, deleteCard } from "../services/api";

function Inventory() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");

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

  const types = [...new Set(cards.map((card) => card.type))];
  const rarities = [...new Set(cards.map((card) => card.rarity))];

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      typeFilter === "all" || card.type === typeFilter;

    const matchesRarity =
      rarityFilter === "all" || card.rarity === rarityFilter;

    return matchesSearch && matchesType && matchesRarity;
  });

  if (loading) {
    return <div className="page">Cargando inventario...</div>;
  }

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Inventario</p>
        <h1>Tu colección Pokémon</h1>
        <p>
          Filtra tus cartas por nombre, tipo o rareza para encontrar más rápido
          lo que tienes guardado.
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

      <div className="filter-panel">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value="all">Todos los tipos</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={rarityFilter}
          onChange={(event) => setRarityFilter(event.target.value)}
        >
          <option value="all">Todas las rarezas</option>
          {rarities.map((rarity) => (
            <option key={rarity} value={rarity}>
              {rarity}
            </option>
          ))}
        </select>
      </div>

      <CardGrid
        cards={filteredCards}
        onDelete={handleDelete}
        onRefresh={loadCards}
      />
    </div>
  );
}

export default Inventory;