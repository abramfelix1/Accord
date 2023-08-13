from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def password_check(form, field):
    new_password = field.data

    if len(new_password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')

class PasswordResetForm(FlaskForm):
    credentials = StringField("Credentials", validators=[DataRequired()])
    password = StringField("Password", validators=[DataRequired()])
    new_password = StringField("New Password", validators=[DataRequired(), password_check])
