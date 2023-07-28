from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server

server_routes = Blueprint('servers', __name__)
