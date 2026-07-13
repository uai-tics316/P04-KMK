import { useCallback, useEffect, useMemo, useState } from "react";

import CardGrid from "../components/CardGrid";
import { deleteCard, getCards } from "../services/api";


function Inventory() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");

  const loadCards = useCallback(async () => {
    try {
      setErrorMessage("");

      const data = await getCards();
      setCards(data);
    } catch (error) {
      console.error("Error cargando cartas:", error);
      setErrorMessage("No se pudo cargar el inventario.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    getCards()
      .then((data) => {
        if (active) {
          setCards(data);
        }
      })
      .catch((error) => {
        console.error("Error cargando cartas:", error);

        if (active) {
          setErrorMessage("No se pudo cargar el inventario.");
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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar esta carta?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCard(id);
      await loadCards();
    } catch (error) {
      console.error("Error eliminando carta:", error);
      setErrorMessage("No se pudo eliminar la carta.");
    }
  };

  const totalCards = cards.reduce(
    (total, card) => total + card.quantity,
    0
  );

  const tradeCards = cards.filter(
    (card) => card.for_trade
  ).length;

  const types = useMemo(
    () => [
      ...new Set(
        cards
          .map((card) => card.type)
          .filter(Boolean)
      ),
    ].sort(),
    [cards]
  );

  const rarities = useMemo(
    () => [
      ...new Set(
        cards
          .map((card) => card.rarity)
          .filter(Boolean)
      ),
    ].sort(),
    [cards]
  );

  const filteredCards = useMemo(
    () => cards.filter((card) => {
      const matchesSearch = card.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" ||
        card.type === typeFilter;

      const matchesRarity =
        rarityFilter === "all" ||
        card.rarity === rarityFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesRarity
      );
    }),
    [cards, search, typeFilter, rarityFilter]
  );

  if (loading) {
    return (
      <div className="page">
        Cargando inventario...
      </div>
    );
  }

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Inventario</p>
        <h1>Tu colección Pokémon</h1>
        <p>
          Filtra tus cartas por nombre, tipo o rareza
          para encontrar rápidamente lo que tienes guardado.
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
          type="search"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(event.target.value)
          }
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
          onChange={(event) =>
            setRarityFilter(event.target.value)
          }
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