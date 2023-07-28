from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import joinedload
from app.models import Server, Member, Channel,User, db
from app.forms import ServerForm, ChannelForm

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

    if not servers:
        return {}

    return [server.to_dict() for server in servers]


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
            owner_id=current_user.get_id(), name=data["server_name"], image_url="url"
        )
        db.session.add(new_server)
        db.session.commit()

        new_member = Member(user_id=current_user.get_id(), server_id=new_server.id)
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
        return {}
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
        return jsonify({"message": "Server not found"}), 403
    if str(server.owner_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401
    if form.validate_on_submit():
        data = form.data
        server.name = data["server_name"]
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
        return jsonify({"message": "Server not found"}), 403
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
        return jsonify({"message": "Server not found"}), 403

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
    members_query = db.session.query(Member).join(User).filter(Member.server_id == id)
    if not members_query:
        return {}

    members = members_query.all()

    member_details = []

    for member in members:
        print("Member ID:", member.id)
        print("User ID:", member.user_id)
        print("Created At:", member.created_at)
        print("Updated At:", member.updated_at)
        print("TEST: ", member.user)

    return [member.to_dict() for member in members]
