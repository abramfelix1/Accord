from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL


class UserSettingsForm(FlaskForm):
    display_name = StringField("Display Form", validators=[DataRequired()])
    user_image = StringField("User Image", validators=[URL()])
