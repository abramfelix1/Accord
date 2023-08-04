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
    # connect user to rooms based on server id
    for server in servers:
        print(f"Joining Server: {server}")
        join_room(str(server))
    print("**************************JOIN SERVER DATA END**************************")
    emit("join_server_response", {"Message": f"Joined Servers: {servers}"})


# handle sending chat messages when send_message event is emitted from the frontend
@socketio.on("send_message")
def handle_chat(data):
    print("**************************SEND_MESSAGE DATA START**************************")
    print(data)
    print("**************************SEND_MESSAGE DATA END**************************")
    emit(
        "send_message_response",
        {
            "Message": f"NEW MESSAGE: SERVER: {data['server_id']} CHANNEL: {data['channel_id']}"
        },
        room=str(data["server_id"]),
    )
