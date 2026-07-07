import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCards, createCard } from "../services/api";

function AddCard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (name.trim() === "") {
      alert("Escribe el nombre de una carta");
      return;
    }

    setLoading(true);

    try {
      const data = await searchCards(name);
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Error al buscar cartas");
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

    try {
      await createCard(cardToSave);
      alert("Carta agregada correctamente");
      navigate("/inventory");
    } catch (error) {
      console.error(error);
      alert("Error al agregar carta");
    }
  };

  return (
    <div className="page">
      <h1>Buscar y agregar carta</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ejemplo: Pikachu"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <button type="submit">
          Buscar
        </button>
      </form>

      {loading && <p>Buscando cartas...</p>}

      {results.length === 0 && !loading && (
        <p>Busca una carta para agregarla a tu inventario.</p>
      )}

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

            <button
              type="button"
              onClick={() => handleAddCard(card)}
            >
              Agregar al inventario
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCard;