from sqlalchemy import Boolean, Column, Integer, String

from database import Base


class PokemonCard(Base):
    __tablename__ = "pokemon_cards"

    id = Column(Integer, primary_key=True, index=True)

    card_id = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    rarity = Column(
        String,
        nullable=False,
        default="Unknown",
    )

    card_type = Column(
        String,
        nullable=False,
        default="Unknown",
    )

    set_name = Column(
        String,
        nullable=False,
        default="Unknown",
    )

    image_url = Column(
        String,
        nullable=False,
        default="",
    )

    quantity = Column(
        Integer,
        nullable=False,
        default=1,
    )

    for_trade = Column(
        Boolean,
        nullable=False,
        default=False,
    )