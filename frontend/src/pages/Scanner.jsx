import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCards, createCard } from "../services/api";

function Scanner() {
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");
  const [cardName, setCardName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [forTrade, setForTrade] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResults([]);
    setSearched(false);
  };

  const handleSearch = async () => {
    if (!cardName.trim()) {
      alert("Escribe el nombre de la carta");
      return;
    }

    setLoading(true);
    setSearched(true);

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
      quantity: Number(quantity),
      for_trade: forTrade
    };

    await createCard(cardToSave);

    alert("Carta agregada al inventario");
    navigate("/inventory");
  };

  const handleClear = () => {
    setPreview("");
    setCardName("");
    setQuantity(1);
    setForTrade(false);
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Escáner asistido</p>
        <h1>Identifica y registra una carta</h1>
        <p>
          Sube una imagen como referencia, escribe el nombre de la carta y
          selecciona la coincidencia correcta desde la API Pokémon.
        </p>
      </div>

      <div className="scanner-layout">
        <div className="scanner-box">
          <label className="upload-box">
            <span>📷</span>
            <strong>Subir imagen</strong>
            <small>PNG, JPG o WEBP</small>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageChange}
            />
          </label>

          {preview && (
            <img
              className="preview-image"
              src={preview}
              alt="Carta subida"
            />
          )}

          <input
            type="text"
            placeholder="Nombre de la carta, ejemplo: Pikachu"
            value={cardName}
            onChange={(event) => setCardName(event.target.value)}
          />

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={forTrade}
              onChange={(event) => setForTrade(event.target.checked)}
            />
            Marcar como disponible para intercambio
          </label>

          <div className="scanner-buttons">
            <button onClick={handleSearch}>
              {loading ? "Buscando..." : "Buscar carta"}
            </button>

            <button className="secondary-action" onClick={handleClear}>
              Limpiar
            </button>
          </div>
        </div>

        <div className="scanner-help">
          <h3>Cómo usarlo</h3>
          <p>1. Sube una imagen de la carta.</p>
          <p>2. Escribe el nombre que aparece arriba en la carta.</p>
          <p>3. Define cantidad e intercambio.</p>
          <p>4. Elige la carta correcta y guárdala.</p>
        </div>
      </div>

      {searched && !loading && results.length === 0 && (
        <div className="empty-state">
          No se encontraron cartas. Prueba con un nombre más simple, como
          “Pikachu”, “Charizard” o “Mewtwo”.
        </div>
      )}

      {results.length > 0 && (
        <>
          <h2>Coincidencias encontradas</h2>

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
                  Guardar esta carta
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Scanner;