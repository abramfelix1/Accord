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


# handle sending chat messages
@socketio.on("send_message")
def handle_chat(data):
    message = data["message"]
    user_id = data["user_id"]
    channel_id = data["channel_id"]
    timestamp = datetime.utcnow()

    message = ChannelMessage()
    db.session.add(message=message, user_id=user_id, channel_id=channel_id)

    emit(
        "new_message",
        {
            "message": data["message"],
            "user_id": data["user_id"],
            "channel_id": data["channel_id"],
        },
        broadcast=True,
    )
