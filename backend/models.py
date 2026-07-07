from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean

from database import Base

class PokemonCard(Base):
    __tablename__ = "pokemon_cards"

    id = Column(Integer, primary_key=True)

    card_id = Column(String)
    name = Column(String)

    rarity = Column(String)

    card_type = Column(String)

    set_name = Column(String)

    image_url = Column(String)

    quantity = Column(Integer)

    for_trade = Column(Boolean)