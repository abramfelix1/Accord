from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy import event


class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    owner_id = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    name = db.Column(db.String(100), nullable=False)
    banner_image = db.Column(db.String())
    image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # many to many with server through members table
    # users = db.relationship("User", secondary="members", cascade="all,delete", back_populates="servers")
    members = db.relationship("Member", cascade="all,delete", back_populates="server")

    # one to many with user
    owner = db.relationship("User", back_populates="servers_owned")

    # one to many with channels
    channels = db.relationship(
        "Channel",
        back_populates="server",
        cascade="all,delete",
    )

    def to_dict(self):
        first_channel = self.channels[0].to_dict() if self.channels else None
        members_count = [member.to_dict() for member in self.members]
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "banner_image": self.banner_image,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "firstChannel": first_channel,
            "members_count": len(members_count),
        }

    def to_dict_relationships(self):

        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "banner_image": self.banner_image,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "users": self.users,
            "owner": self.owner,
            "channels": self.channels.to_dict(),
        }
