from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Member, Server
from app.forms import MessageForm

member_routes = Blueprint("members", __name__)

@member_routes.route("/server/<int:id>", methods=["DELETE"])
@login_required
def leave_server(id):
    """
    Leave server by id
    """
    server = Server.query.get(id)
    user = current_user.get_id()

    if not server:
        return jsonify({"message": "Server not found"}), 404

    member = Member.query.filter(
        Member.user_id.like(user), Member.server_id.like(id)
    ).first()

    if not member:
        return jsonify({"message": "Member not found"}), 404

    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "Leave server succesful!"}), 200


# @member_routes.route("/server/<int:id>")
# @login_required
# def get_current_server_member(id):
#     """
#     Get current server member by server ID
#     """

#     server = Server.query.get(id)
#     user = current_user.get_id()

#     if server is None:
#         return jsonify({"message": "Server not found"}), 403

#     member = Member.query.filter(
#         Member.server_id.like(id), Member.user_id.like(user)
#     ).first()

#     if not member:
#         return {}

#     return member.to_dict()