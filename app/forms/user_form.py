from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import URL


class UserSettingsForm(FlaskForm):
    display_name = StringField("Display Form")
    user_image = StringField("User Image", validators=[URL()])
