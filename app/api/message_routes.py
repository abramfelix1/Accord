from flask import Blueprint, jsonify
from flask_login import login_required
from sqlalchemy.orm import joinedload
from app.models import PrivateMessage, ChannelMessage, Channel

message_routes = Blueprint("messages", __name__)


@message_routes.errorhandler(404)
def invalid_route(e):
    return jsonify({"errorCode": 404, "message": "Route not found"}), 404


@message_routes.route("/<int:id>")
@login_required
def edit_message(id):
    pass
