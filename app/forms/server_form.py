from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, URL


class ServerForm(FlaskForm):
    server_name = StringField("Server Name", validators=[DataRequired()])
    server_image = StringField("Server Image")
    # private = BooleanField("Private", validators=[DataRequired()])
