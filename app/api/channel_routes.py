from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Channel
from .auth_routes import forbidden
from ..models import db

channel_routes = Blueprint('channels', __name__)

@channel_routes.errorhandler(404) 
def invalid_route(e): 
    return jsonify({'errorCode' : 404, 'message' : 'Route not found'}), 404



@channel_routes.route("/<int:id>")
@login_required
def get_channel_detail(id):
    """
    Get a channel by a channel id
    """
    # query for a channel
    channel = Channel.query.get(id)

    # if no channel found, throw an 404 error
    if channel is None:
        return invalid_route("error")
    
    # return the channel details in json format
    return channel.to_dict_relationships()



@channel_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_channel(id):
    """
    Delete a channel by a channel id
    """
    # query for a channel
    channel = Channel.query.get(id)

    # if channel not found, throw a 404 error
    if channel is None:
        return invalid_route("error")

    # get the server owner id
    server_owner_id = channel.server.owner_id
    # get the current user id
    current_user_id = current_user.to_dict()["id"]

    # check to see if the current user is the owner of the channel
    if server_owner_id != current_user_id:
        return forbidden()
    
    # if successful, delete the channel
    db.session.delete(channel)
    db.session.commit()

    return jsonify({"message": "Channel succesfully deleted!"})