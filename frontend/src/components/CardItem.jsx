function CardItem({ card, onDelete }) {
  return (
    <div className="card-item">
      {card.image_url && (
        <img src={card.image_url} alt={card.name} />
      )}

      <h3>{card.name}</h3>

      <p><strong>Rareza:</strong> {card.rarity}</p>
      <p><strong>Tipo:</strong> {card.type}</p>
      <p><strong>Set:</strong> {card.set_name}</p>
      <p><strong>Cantidad:</strong> {card.quantity}</p>
      <p>
        <strong>Intercambio:</strong>{" "}
        {card.for_trade ? "Sí" : "No"}
      </p>

      <button onClick={() => onDelete(card.id)}>
        Eliminar
      </button>
    </div>
  );
}

export default CardItem;