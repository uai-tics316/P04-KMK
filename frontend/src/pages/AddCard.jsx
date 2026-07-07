import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCards, createCard } from "../services/api";

function AddCard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Escribe el nombre de una carta");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const data = await searchCards(name);
      setResults(data);
    } catch (error) {
      console.error("Error buscando carta:", error);
      alert("No se pudo buscar la carta");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (card) => {
    const cardToSave = {
      card_id: card.card_id,
      name: card.name,
      rarity: card.rarity,
      card_type: card.card_type,
      set_name: card.set_name,
      image_url: card.image_url,
      quantity: 1,
      for_trade: false
    };

    await createCard(cardToSave);

    alert("Carta agregada al inventario");
    navigate("/inventory");
  };

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Búsqueda manual</p>
        <h1>Buscar cartas Pokémon</h1>
        <p>
          Escribe el nombre de una carta y agrégala directamente a tu inventario.
        </p>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ejemplo: Pikachu, Charizard, Mewtwo"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <button type="submit">
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {searched && !loading && results.length === 0 && (
        <div className="empty-state">
          No se encontraron cartas con ese nombre.
        </div>
      )}

      {results.length > 0 && (
        <div className="card-grid">
          {results.map((card) => (
            <div className="card-item" key={card.card_id}>
              {card.image_url && (
                <img src={card.image_url} alt={card.name} />
              )}

              <h3>{card.name}</h3>

              <p><strong>Rareza:</strong> {card.rarity}</p>
              <p><strong>Tipo:</strong> {card.card_type}</p>
              <p><strong>Set:</strong> {card.set_name}</p>

              <button onClick={() => handleAddCard(card)}>
                Agregar al inventario
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddCard;