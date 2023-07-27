from app.models import db, Member, environment, SCHEMA
from sqlalchemy.sql import text


def seed_members():

    # Members of Demo Server
    member_1 = Member(
        user_id=2, server_id=1)
    member_2 = Member(
        user_id=4, server_id=1)
    member_3 = Member(
        user_id=5, server_id=1)
    member_4 = Member(
        user_id=6, server_id=1)

    # Members of Bikini Bottom Server
    member_5 = Member(
        user_id=3, server_id=4)
    member_6 = Member(
        user_id=8, server_id=4)
    member_7 = Member(
        user_id=9, server_id=4)
    member_8 = Member(
        user_id=10, server_id=4)
    member_9 = Member(
        user_id=11, server_id=4)

    # Members of Chum Bucket
    member_10 = Member(
        user_id=7, server_id=3)
    member_11 = Member(
        user_id=8, server_id=3)
    member_12 = Member(
        user_id=11, server_id=3)

    # Members of Krusty Krabs
    member_13 = Member(
        user_id=7, server_id=2)
    member_14 = Member(
        user_id=8, server_id=2)
    member_15 = Member(
        user_id=10, server_id=2)
    member_16 = Member(
        user_id=11, server_id=2)

    db.session.add(member_1)
    db.session.add(member_2)
    db.session.add(member_3)
    db.session.add(member_4)
    db.session.add(member_5)
    db.session.add(member_6)
    db.session.add(member_7)
    db.session.add(member_8)
    db.session.add(member_9)
    db.session.add(member_10)
    db.session.add(member_11)
    db.session.add(member_12)
    db.session.add(member_13)
    db.session.add(member_14)
    db.session.add(member_15)
    db.session.add(member_16)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM members"))

    db.session.commit()
