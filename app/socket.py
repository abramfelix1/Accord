from flask_socketio import SocketIO, emit
from .models import db, ChannelMessage
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
