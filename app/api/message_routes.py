from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, PrivateMessage, ChannelMessage, Channel
from app.forms import MessageForm

message_routes = Blueprint("messages", __name__)


@message_routes.errorhandler(404)
def invalid_route(e):
    return jsonify({"errorCode": 404, "message": "Route not found"}), 404


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@message_routes.route("/<int:id>", methods=["PUT", "PATCH"])
@login_required
def edit_message(id):
    """
    Edit Message by id
    """
    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    message = ChannelMessage.query.get(id)

    if message is None:
        return jsonify({"message": "Message not found"}), 403
    if str(message.user_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401
    if form.validate_on_submit():
        data = form.data
        message.message = data["message"]
        db.session.commit()
        return message.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_a_message(id):
    """
    Delete a server
    """
    message = ChannelMessage.query.get(id)
    if message is None:
        return jsonify({"message": "Message not found"}), 404
    if str(message.user_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401
    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message succesfully deleted!"}), 200
