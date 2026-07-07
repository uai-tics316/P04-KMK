from flask import Blueprint, request

from database import SessionLocal
from models import PokemonCard
from tcg_api import search_pokemon_card
from scanner import extract_text_from_image, extract_possible_card_name


card_routes = Blueprint("card_routes", __name__)


@card_routes.route("/test")
def test():
    return {"status": "ok"}


@card_routes.route("/search", methods=["GET"])
def search_card():
    name = request.args.get("name")

    if not name:
        return {"error": "Debes ingresar un nombre"}, 400

    cards = search_pokemon_card(name)

    return cards


@card_routes.route("/scan", methods=["POST"])
def scan_card():
    try:
        if "image" not in request.files:
            return {"error": "No se envió ninguna imagen"}, 400

        image = request.files["image"]

        text = extract_text_from_image(image)
        possible_name = extract_possible_card_name(text)

        if not possible_name:
            return {
                "error": "No se pudo detectar texto en la imagen",
                "raw_text": text
            }, 400

        cards = search_pokemon_card(possible_name)

        return {
            "detected_text": text,
            "possible_name": possible_name,
            "results": cards
        }

    except Exception as error:
        return {
            "error": str(error)
        }, 500
    if "image" not in request.files:
        return {"error": "No se envió ninguna imagen"}, 400

    image = request.files["image"]

    text = extract_text_from_image(image)
    possible_name = extract_possible_card_name(text)

    if not possible_name:
        return {
            "error": "No se pudo detectar texto en la imagen",
            "raw_text": text
        }, 400

    cards = search_pokemon_card(possible_name)

    return {
        "detected_text": text,
        "possible_name": possible_name,
        "results": cards
    }


@card_routes.route("/cards", methods=["GET"])
def get_cards():
    db = SessionLocal()
    cards = db.query(PokemonCard).all()

    result = []

    for card in cards:
        result.append({
            "id": card.id,
            "card_id": card.card_id,
            "name": card.name,
            "rarity": card.rarity,
            "type": card.card_type,
            "set_name": card.set_name,
            "image_url": card.image_url,
            "quantity": card.quantity,
            "for_trade": card.for_trade
        })

    db.close()
    return result


@card_routes.route("/cards", methods=["POST"])
def create_card():
    data = request.json

    db = SessionLocal()

    card = PokemonCard(
        card_id=data.get("card_id"),
        name=data.get("name"),
        rarity=data.get("rarity"),
        card_type=data.get("card_type"),
        set_name=data.get("set_name"),
        image_url=data.get("image_url"),
        quantity=data.get("quantity", 1),
        for_trade=data.get("for_trade", False)
    )

    db.add(card)
    db.commit()
    db.refresh(card)

    new_card_id = card.id

    db.close()

    return {
        "message": "Carta agregada correctamente",
        "id": new_card_id
    }, 201


@card_routes.route("/cards/<int:id>", methods=["DELETE"])
def delete_card(id):
    db = SessionLocal()

    card = db.query(PokemonCard).filter(PokemonCard.id == id).first()

    if not card:
        db.close()
        return {"error": "Carta no encontrada"}, 404

    db.delete(card)
    db.commit()
    db.close()

    return {"message": "Carta eliminada correctamente"}


@card_routes.route("/cards/<int:id>", methods=["PUT"])
def update_card(id):
    data = request.json

    db = SessionLocal()

    card = db.query(PokemonCard).filter(PokemonCard.id == id).first()

    if not card:
        db.close()
        return {"error": "Carta no encontrada"}, 404

    card.quantity = data.get("quantity", card.quantity)
    card.for_trade = data.get("for_trade", card.for_trade)

    db.commit()
    db.close()

    return {"message": "Carta actualizada correctamente"}