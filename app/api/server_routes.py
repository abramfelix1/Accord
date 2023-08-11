from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import joinedload
from app.models import Server, Member, Channel, User, db
from app.forms import ServerForm, ChannelForm, MembershipForm, ServerImageForm
from werkzeug.utils import secure_filename
from app.aws_helpers import *

server_routes = Blueprint("servers", __name__)


@server_routes.errorhandler(404)
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


@server_routes.route("/", methods=["GET"])
@login_required
def get_all_servers():
    """
    Gets all public servers
    """
    servers = Server.query.all()
    user_id = current_user.get_id()
    if not servers:
        return {}

    # Server Users are members of
    members = Member.query.filter(Member.user_id == user_id).all()

    member_servers = [m.to_dict()["server_id"] for m in members]

    return [
        server.to_dict()
        for server in Server.query.filter(Server.id.not_in(set(member_servers))).all()
    ]


@server_routes.route("/", methods=["POST"])
@login_required
def create_a_servers():
    """
    Creates a server
    """
    form = ServerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_server = Server(
            owner_id=current_user.get_id(), name=data["server_name"], image_url=None
        )
        db.session.add(new_server)
        db.session.commit()

        new_member = Member(user_id=current_user.get_id(), server_id=new_server.id)
        new_channel = Channel(name="general", server_id=new_server.id)
        db.session.add(new_channel)
        db.session.add(new_member)
        db.session.commit()
        return new_server.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@server_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_server_by_id(id):
    """
    Gets server by ID
    """
    server = Server.query.get(id)
    if not server:
        return jsonify({"message": "Server not found"}), 404
    return server.to_dict()


@server_routes.route("/<int:id>", methods=["PUT", "PATCH"])
@login_required
def edit_a_server(id):
    """
    Edit a server
    """
    form = ServerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    server = Server.query.get(id)
    if server is None:
        return jsonify({"message": "Server not found"}), 404
    if str(server.owner_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401
    if form.validate_on_submit():
        data = form.data
        server.name = data["server_name"]
        server.image_url = data["server_image"]
        db.session.commit()
        return server.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@server_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_a_server(id):
    """
    Delete a server
    """
    server = Server.query.get(id)
    if server is None:
        return jsonify({"message": "Server not found"}), 404
    if str(server.owner_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401
    db.session.delete(server)
    db.session.commit()
    return jsonify({"message": "Server succesfully deleted!"}), 200


# Getting all the channels of a server
@server_routes.route("/<int:id>/channels", methods=["GET"])
@login_required
def get_all_channels_of_a_server(id):
    """
    Query for all the channels by a server id
    """
    server = Server.query.get(id)
    if server is None:
        return {}
    all_channels = {"Channels": [channels.to_dict() for channels in server.channels]}
    return all_channels


@server_routes.route("/<int:id>/channels", methods=["POST"])
@login_required
def create_channel(id):
    """
    Create Channel by Server Id
    """
    form = ChannelForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    # Get Server Id
    server = Server.query.get(id)

    # Return 403 error if server doesn't exist
    if server is None:
        return jsonify({"message": "Server not found"}), 404

    # Check if server owner_id matches with current user_id
    if str(server.owner_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    # Submit form if not error
    if form.validate_on_submit():
        new_channel = Channel(name=form.data["channel_name"], server_id=id)
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()

    # Throw error if there is any
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@server_routes.route("/<int:id>/members", methods=["GET"])
@login_required
def get_server_members(id):
    """
    Get server members by server ID
    """

    server = Server.query.get(id)

    if server is None:
        return jsonify({"message": "Server not found"}), 403

    members = Member.query.filter(Member.server_id == id)

    if not members:
        return {}

    return [member.to_dict() for member in members]


@server_routes.route("/<int:id>/image", methods=["PUT", "PATCH"])
@login_required
def add_server_image(id):
    server = Server.query.get(id)
    if not server:
        return jsonify({"message": "Server not found"}), 404

    form = ServerImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["image_url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" in upload:
            url = upload["url"]
            server.image_url = url
            db.session.commit()
            return server.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route("/<int:id>/image/remove", methods=["PUT"])
@login_required
def remove_server_image():
    server = Server.query.get(id)

    server.image_url = None
    db.session.commit()

    return server.to_dict()
