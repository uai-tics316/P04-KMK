from flask import Flask
from flask_cors import CORS

from database import engine
from models import Base

from routes import card_routes

app = Flask(__name__)
CORS(app)

Base.metadata.create_all(bind=engine)

app.register_blueprint(
    card_routes,
    url_prefix="/api"
)

@app.route("/")
def home():
    return {
        "message": "Pokemon Card Scanner API funcionando"
    }

if __name__ == "__main__":
    app.run(debug=True)