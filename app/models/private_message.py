from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PrivateMessage(db.Model):
    __tablename__ = "private_messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    message = db.Column(db.String(2000))
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    # recipient_id = db.Column(db.Integer(), db.ForeignKey(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now)
    updated_at = db.Column(db.DateTime(), default=datetime.now)


    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'user_id': self.user_id,
            # "recipient_id": self.recipient_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }