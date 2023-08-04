from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class MembershipForm(FlaskForm):
    user_id = IntegerField("User", validators=[DataRequired()])
    server_id = IntegerField("Server", validators=[DataRequired()])
    nickname = StringField("Nickname")
