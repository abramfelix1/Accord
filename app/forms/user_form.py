from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, URL, ValidationError
from app.models import User

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    current = current_user.to_dict()
    # If current username does not match with form username data, return true and raise error.
    user = User.query.filter(User.username == username).first()

    if current['username'] != username:
        if user:
            raise ValidationError('Username is already in use.')


class UserSettingsForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), username_exists])
    display_name = StringField("Display Form")
    image_url = StringField("User Image")
