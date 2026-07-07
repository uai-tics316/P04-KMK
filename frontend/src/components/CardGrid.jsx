import CardItem from "./CardItem";

function CardGrid({ cards, onDelete, onRefresh }) {
  if (cards.length === 0) {
    return (
      <div className="empty-state">
        No hay cartas guardadas todavía.
      </div>
    );
  }

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          onDelete={onDelete}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}

export default CardGrid;