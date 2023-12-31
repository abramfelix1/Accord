from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    display_name = db.Column(db.String(32))
    image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=db.func.now())

    # many to many with server through members table
    # servers = db.relationship("Server", secondary="members", back_populates="users")
    memberships = db.relationship("Member", cascade="all,delete", back_populates="user")

    # one to many with server
    servers_owned = db.relationship(
        "Server", cascade="all,delete-orphan", back_populates="owner"
    )

    # one to many with channels through channel messages table
    messages = db.relationship(
        "ChannelMessage",
        cascade="all,delete",
        back_populates="users",
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "display_name": self.display_name,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def to_dict_relationships(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "display_name": self.display_name,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "servers": self.servers,
            "servers_owned": self.servers_owned,
            "channel_messages": self.channel_messages,
        }

    def user_servers(self):
        servers = [server.to_dict()["server_id"] for server in self.memberships]

        return servers
