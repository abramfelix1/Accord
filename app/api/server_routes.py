from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Server, db
from app.forms import ServerForm

server_routes = Blueprint("servers", __name__)


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
        form.populate_obj(new_server)
        db.session.add(new_server)
        db.session.commit()
        return new_server.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# Getting all the channels of a server
@server_routes.route("/<int:id>/channels")
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
