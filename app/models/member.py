from .db import db, environment, SCHEMA, add_prefix_for_prod
from .server import Server
from datetime import datetime


class Member(db.Model):
    __tablename__ = "members"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    server_id = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("servers.id")), nullable=False
    )
    created_at = db.Column(db.DateTime(), default=datetime.now)
    updated_at = db.Column(db.DateTime(), default=datetime.now)

    user = db.relationship("User", back_populates="memberships")

    server = db.relationship("Server", back_populates="members")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "server_id": self.server_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
