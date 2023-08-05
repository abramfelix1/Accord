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
            "Message": f"CHAT_UPDATE: SERVER: {data['server_id']} CHANNEL: {data['channel_id']}",
            "channel_id": data["channel_id"],
        },
        room=str(data["server_id"]),
    )
