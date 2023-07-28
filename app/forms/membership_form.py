from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class MembershipForm(FlaskForm):
    nickname = StringField("Nickname", validators=[DataRequired()])
