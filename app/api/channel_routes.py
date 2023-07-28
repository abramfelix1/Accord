from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel

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