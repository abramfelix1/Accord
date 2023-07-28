from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    server_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now)
    updated_at = db.Column(db.DateTime(), default=datetime.now)

    # one to many with servers
    server = db.relationship("Server", back_populates="channels")

    # many to many with users through channel messages tables
    users = db.relationship("User", secondary="channel_messages", cascade="all,delete", back_populates="channel_messages")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            "server_id": self.server_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
    
    def to_dict_relationships(self):
        return {
            'id': self.id,
            'name': self.name,
            "server_id": self.server_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "server": self.server.to_dict(),
            "users": self.users,
        }