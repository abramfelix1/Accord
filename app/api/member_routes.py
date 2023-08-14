from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Member, Server
from app.forms import MessageForm, MemberNicknameForm

member_routes = Blueprint("members", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages

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
        Member.user_id == (int(user)), Member.server_id == (int(id))
    ).first()

    if not member:
        return jsonify({"message": "Member not found"}), 404

    db.session.delete(member)
    db.session.commit()
    return jsonify({"member_id": user}), 200


@member_routes.route('/server/<int:id>', methods=["PUT", "PATCH"])
@login_required
def update_member_nickname(id):

    form = MemberNicknameForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    server = Server.query.get(id)
    user = current_user.get_id()

    if not server:
        return jsonify({"message": "Server not found"}), 404

    member = Member.query.filter(
        Member.user_id.like(user), Member.server_id.like(id)
    ).first()

    if not member:
        return jsonify({"message": "Member not found"}), 404

    if form.validate_on_submit():
        member.nickname = form.data["nickname"]
        db.session.commit()

        return member.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@member_routes.route("/server/<int:id>")
@login_required
def get_current_server_member(id):
    """
    Get current server member by server ID
    """

    server = Server.query.get(id)
    user = current_user.get_id()

    if server is None:
        return jsonify({"message": "Server not found"}), 403

    member = Member.query.filter(
        Member.server_id.like(id), Member.user_id.like(user)
    ).first()

    if not member:
        return {}

    return member.to_dict()
