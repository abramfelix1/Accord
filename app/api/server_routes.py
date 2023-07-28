from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server, Channel

server_routes = Blueprint('servers', __name__)



















































# Getting all the channels of a server
@server_routes.route("/<int:id>/channels")
@login_required
def get_all_channels_of_a_server(id):
    """
    Query for all the channels by a server id
    """
    server = Server.query.get(id)

    if server is None:
        return {}

    all_channels = {"Channels": [channels.to_dict() for channels in server.channels]}
    return all_channels


