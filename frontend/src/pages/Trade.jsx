import { useCallback, useEffect, useState } from "react";

import CardGrid from "../components/CardGrid";
import { deleteCard, getCards } from "../services/api";


function Trade() {
  const [tradeCards, setTradeCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadTradeCards = useCallback(async () => {
    try {
      setErrorMessage("");

      const data = await getCards();

      setTradeCards(
        data.filter((card) => card.for_trade)
      );
    } catch (error) {
      console.error(
        "Error cargando intercambios:",
        error
      );

      setErrorMessage(
        "No se pudieron cargar las cartas de intercambio."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    getCards()
      .then((data) => {
        if (active) {
          setTradeCards(
            data.filter((card) => card.for_trade)
          );
        }
      })
      .catch((error) => {
        console.error(
          "Error cargando intercambios:",
          error
        );

        if (active) {
          setErrorMessage(
            "No se pudieron cargar las cartas de intercambio."
          );
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
      await loadTradeCards();
    } catch (error) {
      console.error("Error eliminando carta:", error);

      setErrorMessage(
        "No se pudo eliminar la carta."
      );
    }
  };

  if (loading) {
    return (
      <div className="page">
        Cargando cartas para intercambio...
      </div>
    );
  }

  return (
    <div className="page">
      <div className="section-header">
        <p className="eyebrow">Intercambios</p>
        <h1>Cartas disponibles para intercambio</h1>
        <p>
          Aquí aparecen solamente las cartas que
          marcaste como disponibles para intercambiar.
        </p>
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <CardGrid
        cards={tradeCards}
        onDelete={handleDelete}
        onRefresh={loadTradeCards}
      />
    </div>
  );
}


export default Trade;