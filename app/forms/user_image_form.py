from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, ValidationError
from app.models import User

from app.aws_helpers import ALLOWED_EXTENSIONS


class UserImageForm(FlaskForm):
    image_url = FileField("User Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
