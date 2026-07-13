from typing import Any

from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from database import SessionLocal
from models import PokemonCard
from tcg_api import search_pokemon_card


card_routes = Blueprint("card_routes", __name__)


def serialize_card(card: PokemonCard) -> dict[str, Any]:
    return {
        "id": card.id,
        "card_id": card.card_id,
        "name": card.name,
        "rarity": card.rarity,
        "type": card.card_type,
        "set_name": card.set_name,
        "image_url": card.image_url,
        "quantity": card.quantity,
        "for_trade": card.for_trade,
    }


def parse_positive_integer(value: Any) -> int | None:
    if isinstance(value, bool):
        return None

    try:
        parsed_value = int(value)
    except (TypeError, ValueError):
        return None

    if parsed_value < 1:
        return None

    return parsed_value


@card_routes.get("/test")
def test():
    return jsonify({"status": "ok"})


@card_routes.get("/search")
def search_card():
    name = request.args.get("name", "").strip()

    if not name:
        return jsonify({
            "error": "Debes ingresar el nombre de una carta."
        }), 400

    try:
        cards = search_pokemon_card(name)
        return jsonify(cards)

    except RuntimeError as error:
        return jsonify({"error": str(error)}), 502


@card_routes.get("/cards")
def get_cards():
    try:
        with SessionLocal() as db:
            cards = (
                db.query(PokemonCard)
                .order_by(PokemonCard.name.asc())
                .all()
            )

            return jsonify([
                serialize_card(card)
                for card in cards
            ])

    except SQLAlchemyError:
        return jsonify({
            "error": "No fue posible consultar el inventario."
        }), 500


@card_routes.post("/cards")
def create_card():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "El cuerpo debe contener un objeto JSON válido."
        }), 400

    card_id = str(data.get("card_id", "")).strip()
    name = str(data.get("name", "")).strip()
    quantity = parse_positive_integer(data.get("quantity", 1))
    for_trade = data.get("for_trade", False)

    if not card_id:
        return jsonify({
            "error": "El campo card_id es obligatorio."
        }), 400

    if not name:
        return jsonify({
            "error": "El campo name es obligatorio."
        }), 400

    if quantity is None:
        return jsonify({
            "error": "La cantidad debe ser un número entero mayor o igual a 1."
        }), 400

    if not isinstance(for_trade, bool):
        return jsonify({
            "error": "El campo for_trade debe ser verdadero o falso."
        }), 400

    try:
        with SessionLocal() as db:
            existing_card = (
                db.query(PokemonCard)
                .filter(PokemonCard.card_id == card_id)
                .first()
            )

            if existing_card is not None:
                existing_card.quantity += quantity

                if for_trade:
                    existing_card.for_trade = True

                db.commit()
                db.refresh(existing_card)

                return jsonify({
                    "message": (
                        "La carta ya existía. "
                        "Se aumentó su cantidad."
                    ),
                    "card": serialize_card(existing_card),
                }), 200

            card = PokemonCard(
                card_id=card_id,
                name=name,
                rarity=str(data.get("rarity") or "Unknown").strip(),
                card_type=str(
                    data.get("card_type") or "Unknown"
                ).strip(),
                set_name=str(
                    data.get("set_name") or "Unknown"
                ).strip(),
                image_url=str(data.get("image_url") or "").strip(),
                quantity=quantity,
                for_trade=for_trade,
            )

            db.add(card)
            db.commit()
            db.refresh(card)

            return jsonify({
                "message": "Carta agregada correctamente.",
                "card": serialize_card(card),
            }), 201

    except IntegrityError:
        return jsonify({
            "error": "Ya existe una carta con ese identificador."
        }), 409

    except SQLAlchemyError:
        return jsonify({
            "error": "No fue posible guardar la carta."
        }), 500


@card_routes.put("/cards/<int:card_id>")
def update_card(card_id: int):
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "El cuerpo debe contener un objeto JSON válido."
        }), 400

    if "quantity" not in data and "for_trade" not in data:
        return jsonify({
            "error": (
                "Debes enviar quantity, for_trade "
                "o ambos campos."
            )
        }), 400

    quantity = None

    if "quantity" in data:
        quantity = parse_positive_integer(data["quantity"])

        if quantity is None:
            return jsonify({
                "error": (
                    "La cantidad debe ser un número entero "
                    "mayor o igual a 1."
                )
            }), 400

    if (
        "for_trade" in data
        and not isinstance(data["for_trade"], bool)
    ):
        return jsonify({
            "error": "El campo for_trade debe ser verdadero o falso."
        }), 400

    try:
        with SessionLocal() as db:
            card = db.get(PokemonCard, card_id)

            if card is None:
                return jsonify({
                    "error": "Carta no encontrada."
                }), 404

            if quantity is not None:
                card.quantity = quantity

            if "for_trade" in data:
                card.for_trade = data["for_trade"]

            db.commit()
            db.refresh(card)

            return jsonify({
                "message": "Carta actualizada correctamente.",
                "card": serialize_card(card),
            })

    except SQLAlchemyError:
        return jsonify({
            "error": "No fue posible actualizar la carta."
        }), 500


@card_routes.delete("/cards/<int:card_id>")
def delete_card(card_id: int):
    try:
        with SessionLocal() as db:
            card = db.get(PokemonCard, card_id)

            if card is None:
                return jsonify({
                    "error": "Carta no encontrada."
                }), 404

            db.delete(card)
            db.commit()

            return jsonify({
                "message": "Carta eliminada correctamente."
            })

    except SQLAlchemyError:
        return jsonify({
            "error": "No fue posible eliminar la carta."
        }), 500