from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ChannelForm(FlaskForm):
    channel_name = StringField("Channel Name", validators=[DataRequired()])
