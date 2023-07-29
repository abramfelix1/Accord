from app.models import db, ChannelMessage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_messages():
    # Demo Channel Messages
    message1 = ChannelMessage(message="asdfg", channel_id=1, user_id=2)
    message2 = ChannelMessage(message="gfdsa", channel_id=1, user_id=4)
    message3 = ChannelMessage(message="qwers", channel_id=1, user_id=5)
    message4 = ChannelMessage(message="rewq", channel_id=1, user_id=6)

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
