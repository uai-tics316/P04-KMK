import os

from flask import Flask
from flask_cors import CORS

from database import Base, engine
from models import PokemonCard  # noqa: F401
from routes import card_routes


def create_app() -> Flask:
    app = Flask(__name__)

    frontend_origin = os.getenv(
        "FRONTEND_ORIGIN",
        "http://localhost:5173",
    )

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [frontend_origin],
            }
        },
    )

    Base.metadata.create_all(bind=engine)

    app.register_blueprint(
        card_routes,
        url_prefix="/api",
    )

    @app.get("/")
    def home():
        return {
            "message": "PokéScan API funcionando",
            "status": "ok",
        }

    return app


app = create_app()


if __name__ == "__main__":
    debug_mode = os.getenv(
        "FLASK_DEBUG",
        "false",
    ).lower() == "true"

    host = os.getenv("FLASK_HOST", "127.0.0.1")
    port = int(os.getenv("FLASK_PORT", "5000"))

    app.run(
        host=host,
        port=port,
        debug=debug_mode,
    )