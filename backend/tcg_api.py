import requests


def search_pokemon_card(name):
    clean_name = name.strip()

    if not clean_name:
        return []

    url = "https://api.pokemontcg.io/v2/cards"

    search_attempts = [
        {"q": f'name:{clean_name}*', "pageSize": 20},
        {"q": f'name:"{clean_name}"', "pageSize": 20},
        {"q": clean_name, "pageSize": 20}
    ]

    for params in search_attempts:
        response = requests.get(url, params=params)

        if response.status_code != 200:
            continue

        data = response.json()
        results = data.get("data", [])

        if len(results) > 0:
            cards = []

            for card in results:
                card_types = card.get("types", ["Unknown"])

                cards.append({
                    "card_id": card.get("id"),
                    "name": card.get("name"),
                    "rarity": card.get("rarity", "Unknown"),
                    "card_type": card_types[0] if len(card_types) > 0 else "Unknown",
                    "set_name": card.get("set", {}).get("name", "Unknown"),
                    "image_url": card.get("images", {}).get("small", "")
                })

            return cards

    return []