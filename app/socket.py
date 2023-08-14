from flask_socketio import SocketIO, emit, join_room, leave_room, close_room
from flask_login import current_user
from .models import db, ChannelMessage, User, Member, Server
import os
import datetime


# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://accord-ajr.onrender.com",
        "https://accord-ajr.onrender.com",
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# Might use for bonus. Make isOnline key for Users table, or make a reducer for sockets. Have to set up Disconnect and Connect listeners.
online_users = set()


# handle connecting user to all servers(rooms)
@socketio.on("join_server")
def join_server(data):
    print("**************************JOIN SERVER DATA START**************************")
    print("online_users before: ", online_users)
    user = User.query.get(data["user_id"])
    servers = user.user_servers()
    online_users.add(user.id)
    # connect user to rooms based on server id
    for server in servers:
        print(f"Joining Server: {server}")
        join_room(str(server))
    print("**************************JOIN SERVER DATA END**************************")
    emit(
        "join_server_response",
        {
            "Message": f"Joined Servers: {servers}",
            "Users": f"Online Users: {online_users}",
        },
        broadcast=True,
    )


@socketio.on("add_server")
def add_server(data):
    print("**************************ADD SERVER DATA START**************************")
    join_room(str(data["server_id"]))
    print("**************************ADD SERVER DATA END**************************")
    emit(
        "join_server_response",
        {
            "Message": f"Joined Server: {data['server_id']}",
            "Users": f"Online Users: {online_users}",
        },
        broadcast=False,
    )


# handle chat messages when message_update event is emitted from the frontend
@socketio.on("chat_update")
def handle_chat(data):
    print("**************************SEND_MESSAGE DATA START**************************")
    print(data)
    print("**************************SEND_MESSAGE DATA END**************************")
    emit(
        "chat_update_response",
        {
            "channel_id": data["channel_id"],
            "server_id": data["server_id"],
            "message_id": data.get("message_id", None),
            "Action_Type": data["action_type"],
            "message": data.get("message", None),
        },
        room=str(data["server_id"]),
        broadcast=False,
    )


@socketio.on("channel_update")
def handle_channel(data):
    print("**************************SEND_MESSAGE DATA START**************************")
    print(data)
    print("**************************SEND_MESSAGE DATA END**************************")
    emit(
        "channel_update_response",
        {
            "channel_id": data["channel_id"],
            "server_id": data["server_id"],
            "Action_Type": data["action_type"],
            "channel_name": data.get("channel_name", None),
        },
        room=str(data["server_id"]),
        broadcast=False,
    )


@socketio.on("disconnect")
def handle_disconnect():
    emit(
        "disconnect_response",
        {
            "Message": "USER HAS DISCONNECTED",
            "Users": f"Online Users: {online_users}",
        },
        broadcast=True,
    )
