import CardItem from "./CardItem";

function CardGrid({ cards, onDelete }) {
  if (cards.length === 0) {
    return <p>No hay cartas guardadas todavía.</p>;
  }

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CardGrid;