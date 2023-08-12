from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import Channel, Server, ChannelMessage
from app.forms import ChannelForm, MessageForm
from .auth_routes import forbidden
from ..models import db

channel_routes = Blueprint("channels", __name__)


@channel_routes.errorhandler(404)
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


@channel_routes.route("/<int:id>", methods=["PUT", "PATCH"])
@login_required
def update_channel(id):
    """
    Update Channel by Id
    """
    form = ChannelForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # Get Channel Id
    channel = Channel.query.get(id)

    # Throw error if channel does not exist
    if channel is None:
        return invalid_route("error")

    # Get Server Id
    server_owner_id = Server.query.get(channel.server_id).owner_id

    # Check if server owner_id matches with current user_id
    if str(server_owner_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    # Update name of channel if no error
    if form.validate_on_submit():
        channel.name = form.data["channel_name"]
        db.session.commit()
        return channel.to_dict()

    # return error is fails
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


# -------------------- Message Routes --------------------------


@channel_routes.route("/<int:id>/messages", methods=["GET", "POST"])
@login_required
def get_channel_messages(id):
    """
    Get all messages for a channel
    """
    channel = Channel.query.get(id)

    if channel is None:
        return jsonify({"message": "Channel not found"}), 403

    if request.method == "POST":
        form = MessageForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        print("**************************************************************")
        print(form.data)
        if form.validate_on_submit():
            new_message = ChannelMessage(
                message=form.data["message"], channel_id=id, user_id=current_user.id
            )
            db.session.add(new_message)
            db.session.commit()
            return new_message.to_dict()

        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

    messages = ChannelMessage.query.filter(ChannelMessage.channel_id == id)

    return [message.to_dict() for message in messages]
