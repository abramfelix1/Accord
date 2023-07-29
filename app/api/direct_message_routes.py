from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import PrivateMessage, ChannelMessage

message_routes = Blueprint('messages', __name__)

@message_routes.errorhandler(404) 
def invalid_route(e): 
    return jsonify({'errorCode' : 404, 'message' : 'Route not found'}), 404