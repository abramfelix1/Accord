from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel

channel_routes = Blueprint('channels', __name__)



