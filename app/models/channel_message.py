from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ChannelMessage(db.Model):
    __tablename__ = "channel_messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    message = db.Column(db.String(2000))
    user_id = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    channel_id = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False
    )
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    users = db.relationship("User", back_populates="messages")
    channels = db.relationship("Channel", back_populates="messages")

    def to_dict(self):
        # channels = [channel.to_dict()["server_id"] for channel in self.channels]
        channels = self.channels.to_dict()
        return {
            "id": self.id,
            "message": self.message,
            "user_id": self.user_id,
            "username": self.users.username,
            "image_url": self.users.image_url,
            "display_name": self.users.display_name,
            "channel_id": self.channel_id,
            "server_id": channels["server_id"],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
