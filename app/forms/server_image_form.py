from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, ValidationError

from app.aws_helpers import ALLOWED_EXTENSIONS


class ServerImageForm(FlaskForm):
    image_url = FileField("Server Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])


class ServerBannerForm(FlaskForm):
    banner_image = FileField("Server Banner", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
