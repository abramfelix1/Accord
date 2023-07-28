from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server
from app.forms import ServerForm

server_routes = Blueprint("servers", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@server_routes.route("/", methods=["GET", "POST"])
@login_required
def get_all_servers():
    """
    Gets all public servers
    """
    servers = Server.query.all()
    return jsonify([server.to_dict() for server in servers])
