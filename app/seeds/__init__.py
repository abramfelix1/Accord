from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .member import seed_members, undo_members
from .channel import seed_channels, undo_channels
from .messages import seed_messages, undo_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
# @seed_commands.command('all')
# def seed():
#     if environment == 'production':
#         # Before seeding in production, you want to run the seed undo
#         # command, which will  truncate all tables prefixed with
#         # the schema name (see comment in users.py undo_users function).
#         # Make sure to add all your other model's undo functions below
#         undo_users()
#     seed_users()
#     # Add other seed functions here


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;"
        )
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;"
        )
        db.session.commit()
    seed_users()
    seed_servers()
    seed_members()
    seed_channels()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_servers()
    undo_members()
    undo_channels()
    undo_messages()

    # Add other undo functions here
