from flask import Blueprint

card_routes = Blueprint(
    "card_routes",
    __name__
)

@card_routes.route("/test")
def test():

    return {
        "status": "ok"
    }