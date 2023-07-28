from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import PrivateMessage, ChannelMessage

message_routes = Blueprint('messages', __name__)

