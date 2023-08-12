from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Member, Server, db
from app.forms import UserSettingsForm, UserImageForm
from werkzeug.utils import secure_filename
from app.aws_helpers import *

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/profile", methods=['PUT', 'PATCH'])
@login_required
def update_user():
    """
    Update current user's username, display_name, image_url and returns that user in a dictionary
    """
    form = UserSettingsForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_user.username = form.data['username']
        current_user.display_name = form.data['display_name']

        db.session.commit()

        return current_user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route("/servers")
@login_required
def get_user_servers():
    """
    Get all servers user is assoicated to
    """
    user_id = current_user.get_id()

    members = Member.query.filter(Member.user_id == user_id).all()

    server_ids = []
    for member in members:
        print(member)
        server_ids.append(member.to_dict()["server_id"])

    servers = [server.to_dict() for server in Server.query.filter(Server.id.in_(server_ids)).all()]
    return servers


@user_routes.route("/image", methods=["PUT", "PATCH"])
@login_required
def add_user_image():
    print("********************************* BEFORE THE SUBMIT ***************************")

    form = UserImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["image_url"]
        image.filename = get_unique_filename(image.filename)
        print(image)
        upload = upload_file_to_s3(image)
        print(upload, "DASDSADSADSADSADSADASDADADSADASD")

        if "url" in upload:
            url = upload["url"]
            current_user.image_url = url
            db.session.commit()

    print("DASD NOT THROGIH DASDADSADSADADSA")
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
