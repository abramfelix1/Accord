from flask_socketio import SocketIO, emit, join_room, leave_room, close_room
from flask_login import current_user
from .models import db, ChannelMessage, User, Member, Server
import os
import datetime


# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://accord-w9kc.onrender.com",
        "https://accord-w9kc.onrender.com",
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle connecting user to all servers(rooms)
@socketio.on("join_server")
def join_server(data):
    print("**************************JOIN SERVER DATA START**************************")
    user = User.query.get(data["user_id"])
    servers = user.user_servers()
    for server in servers:
        print(f"Joining Server: {server}")
        join_room(str(server))
    print("**************************JOIN SERVER DATA END**************************")
    emit("join_server_response", {"Message": f"Joined Servers: {servers}"})


# handle sending chat messages when send_message event is emitted from the frontend
@socketio.on("send_message")
def handle_chat(data):
    # emits new_message event for the frontend
    print("********SEND_MESSAGE DATA**********")
    print(data)
    print("********SEND_MESSAGE DATA**********")
    emit(
        "new_message",
        {
            # "message": data["message"],
            # "user_id": data["user_id"],
            "channel_id": data["channel_id"],
        },
        broadcast=True,
    )
