from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Server(db.Model):
    __tablename__ = "servers"

    id = db.Column(db.Integer(), primary_key=True)
    owner_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(), nullable=False)
    image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime(), default=datetime.now)
    updated_at = db.Column(db.DateTime(), default=datetime.now)

    # many to many with server through members table
    users = db.relationship("User", secondary="members", back_populates="servers")
    
    # one to many with user
    owner = db.relationship("User", back_populates="servers_owned")

    # one to many with channels
    channels = db.relationship("Channel", back_populates="server")


    def to_dict(self):
        return {
            'id': self.id,
            "owner_id": self.owner_id,
            'name': self.name,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }