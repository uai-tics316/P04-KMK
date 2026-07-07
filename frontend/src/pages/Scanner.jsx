import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCards, createCard } from "../services/api";

function Scanner() {
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");
  const [cardName, setCardName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResults([]);
  };

  const handleSearch = async () => {
    if (!cardName.trim()) {
      alert("Escribe el nombre que aparece en la carta");
      return;
    }

    setLoading(true);

    try {
      const data = await searchCards(cardName);
      setResults(data);
    } catch (error) {
      console.error(error);
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
      <h1>Escanear carta</h1>

      <p>
        Sube una imagen de tu carta y escribe el nombre que aparece en ella.
      </p>

      <div className="scanner-box">
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleImageChange}
        />

        {preview && (
          <img
            className="preview-image"
            src={preview}
            alt="Carta subida"
          />
        )}

        <input
          type="text"
          placeholder="Ejemplo: Pikachu, Charizard, Mewtwo"
          value={cardName}
          onChange={(event) => setCardName(event.target.value)}
        />

        <button onClick={handleSearch}>
          {loading ? "Buscando..." : "Buscar carta"}
        </button>
      </div>

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
              Confirmar y agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scanner;