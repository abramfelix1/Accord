from flask_wtf import FlaskForm
from wtforms import StringField, EmailField
from wtforms.validators import DataRequired, ValidationError, Regexp
from app.models import User



def user_exists(form, field):
    # Checking if user exists
    email = field.data

    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data

    if len(username) < 2:
        raise ValidationError('Username must be 2-40 characters.')

    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def password_check(form, field):
    password = field.data

    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Regexp('^\w+$'),username_exists])
    email = EmailField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_check])
