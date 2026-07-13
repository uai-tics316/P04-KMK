from typing import Any

import requests
from requests import RequestException


POKEMON_TCG_API_URL = "https://api.pokemontcg.io/v2/cards"
REQUEST_TIMEOUT_SECONDS = 10


def normalize_card(card: dict[str, Any]) -> dict[str, Any]:
    card_types = card.get("types") or ["Unknown"]
    card_set = card.get("set") or {}
    images = card.get("images") or {}

    return {
        "card_id": card.get("id", ""),
        "name": card.get("name", "Unknown"),
        "rarity": card.get("rarity") or "Unknown",
        "card_type": card_types[0] if card_types else "Unknown",
        "set_name": card_set.get("name", "Unknown"),
        "image_url": images.get("small", ""),
    }


def search_pokemon_card(name: str) -> list[dict[str, Any]]:
    clean_name = name.strip()

    if not clean_name:
        return []

    search_attempts = [
        {"q": f"name:{clean_name}*", "pageSize": 20},
        {"q": f'name:"{clean_name}"', "pageSize": 20},
        {"q": clean_name, "pageSize": 20},
    ]

    last_error: Exception | None = None

    for params in search_attempts:
        try:
            response = requests.get(
                POKEMON_TCG_API_URL,
                params=params,
                timeout=REQUEST_TIMEOUT_SECONDS,
            )

            response.raise_for_status()

            data = response.json()
            results = data.get("data", [])

            if results:
                return [normalize_card(card) for card in results]

        except (RequestException, ValueError) as error:
            last_error = error

    if last_error is not None:
        raise RuntimeError(
            "No fue posible comunicarse con la Pokémon TCG API."
        ) from last_error

    return []