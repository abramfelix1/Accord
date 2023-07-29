import os
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, login_required, current_user
from sqlalchemy.orm import joinedload
from .models import db, User, Server, Member,Channel,ChannelMessage
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import server_routes
from .api.direct_message_routes import message_routes
from .api.channel_routes import channel_routes
from .seeds import seed_commands
from .config import Config
from .socket import socketio

app = Flask(__name__, static_folder="../react-app/build", static_url_path="/")

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(server_routes, url_prefix="/api/servers")
app.register_blueprint(channel_routes, url_prefix="/api/channels")
app.register_blueprint(message_routes, url_prefix="/api/messages")
db.init_app(app)
Migrate(app, db)
socketio.init_app(app)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    route_list = {
        rule.rule: [
            [method for method in rule.methods if method in acceptable_methods],
            app.view_functions[rule.endpoint].__doc__,
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != "static"
    }
    return route_list


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == "favicon.ico":
        return app.send_from_directory("public", "favicon.ico")
    return app.send_static_file("index.html")



@app.errorhandler(404)
def invalid_route(e):
    return jsonify({'errorCode' : 404, 'message' : 'Route not found'}), 404


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages



@app.route('/api/server/<int:id>/join', methods=["POST"])
@login_required
def join_server(id):
    """
    User join server.
    If User is already a member of server, throw error.
    If Server does not exist, throw 404
    """

    # Get Server Id
    server = Server.query.get(id)
    # Get current user Id
    user_id = current_user.get_id()
    # If server not does exist, throw 404 error
    if server is None:
        return invalid_route("error")
    # Query if user is a member of server or not
    member = (
        Member.query.filter(Member.server_id.like(id), Member.user_id.like(user_id)).first()
    )

    # If Member is a member, throw error
    if member is not None:
        return jsonify({"message": "User is already a member"}), 403

    # Create member if they are not a member
    member = Member(
        user_id=user_id,
        server_id=server.id
    )

    db.session.add(member)
    db.session.commit()
    return member.to_dict()


@app.route("/api/channels/<int:id>/messages", methods=["GET","POST"])
@login_required
def get_channel_messages(id):
    """
    Get all messages for a channel
    """
    channel = Channel.query.get(id)

    if channel is None:
        return jsonify({"message": "Channel not found"}), 403

    messages = (
        ChannelMessage.query.filter(ChannelMessage.channel_id == id)
        .options(joinedload("user"))
        .all()
    )

    if not messages:
        return {}

    messages_info = []

    for message in messages:
        message_info = {
            "id": message.id,
            "message": message.message,
            "display_name": message.user.display_name,
            "image_url": message.user.image_url,
            "user_id": message.user_id,
            "username": message.user.username,
            "created_at": message.created_at,
            "updated_at": message.created_at,
        }
        messages_info.append(message_info)

    return messages_info

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    socketio.run(app)
