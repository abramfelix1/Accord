from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Member, Server
from app.forms import MessageForm

member_routes = Blueprint("members", __name__)

@member_routes.route("/current/server/<int:id>", methods=['DELETE'])
@login_required
def leave_server(id):

    user = current_user.get_id()
    member = Member.query.filter(Member.user_id.like(user), Member.server_id.like(id)).first()

    if not member:
        return jsonify({"message": "Member not found"}), 404

    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "Server succesfully deleted!"}), 200
