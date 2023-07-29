from flask import Blueprint, jsonify
from flask_login import login_required
from sqlalchemy.orm import joinedload
from app.models import PrivateMessage, ChannelMessage, Channel

message_routes = Blueprint("messages", __name__)


@message_routes.errorhandler(404)
def invalid_route(e):
    return jsonify({"errorCode": 404, "message": "Route not found"}), 404


@message_routes.route("/channel/<int:id>/messages")
@login_required
def get_channel_messages(id):
    channel = Channel.query.get(id)

    if channel is None:
        return jsonify({"message": "Channel not found"}), 403

    messages = (
        ChannelMessage.query.filter(ChannelMessage.channel_id == id)
        .options(joinedload("user"))
        .all()
    )

    if not messages:
        return {}

    messages_info = []

    for message in messages:
        message_info = {
            "message": message.message,
            "display_name": message.user.display_name,
            "image_url": message.user.image_url,
            "user_id": message.user_id,
            "username": message.user.username,
            "created_at": message.created_at,
            "updated_at": message.created_at,
        }
        messages_info.append(message_info)

    return messages_info
