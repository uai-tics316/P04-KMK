import { updateCard } from "../services/api";

function CardItem({ card, onDelete, onRefresh }) {
  const increaseQuantity = async () => {
    await updateCard(card.id, {
      quantity: card.quantity + 1
    });

    onRefresh();
  };

  const decreaseQuantity = async () => {
    if (card.quantity <= 1) {
      alert("La cantidad mínima es 1");
      return;
    }

    await updateCard(card.id, {
      quantity: card.quantity - 1
    });

    onRefresh();
  };

  const toggleTrade = async () => {
    await updateCard(card.id, {
      for_trade: !card.for_trade
    });

    onRefresh();
  };

  return (
    <div className="card-item">
      {card.image_url && (
        <img src={card.image_url} alt={card.name} />
      )}

      <h3>{card.name}</h3>

      <p><strong>Rareza:</strong> {card.rarity}</p>
      <p><strong>Tipo:</strong> {card.type}</p>
      <p><strong>Set:</strong> {card.set_name}</p>

      <div className="quantity-control">
        <button onClick={decreaseQuantity}>-</button>
        <strong>{card.quantity}</strong>
        <button onClick={increaseQuantity}>+</button>
      </div>

      <span className={card.for_trade ? "trade-badge active" : "trade-badge"}>
        {card.for_trade ? "Disponible para intercambio" : "No intercambiable"}
      </span>

      <div className="card-actions">
        <button onClick={toggleTrade}>
          {card.for_trade ? "Quitar intercambio" : "Marcar intercambio"}
        </button>

        <button className="danger-button" onClick={() => onDelete(card.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CardItem;