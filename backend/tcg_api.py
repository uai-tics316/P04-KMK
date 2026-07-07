import requests


def search_pokemon_card(name):
    url = "https://api.pokemontcg.io/v2/cards"

    params = {
        "q": f'name:{name}*',
        "pageSize": 20
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        print("Error Pokemon API:", response.text)
        return []

    data = response.json()
    cards = []

    for card in data.get("data", []):
        cards.append({
            "card_id": card.get("id"),
            "name": card.get("name"),
            "rarity": card.get("rarity", "Unknown"),
            "card_type": card.get("types", ["Unknown"])[0],
            "set_name": card.get("set", {}).get("name", "Unknown"),
            "image_url": card.get("images", {}).get("small", "")
        })

    return cards