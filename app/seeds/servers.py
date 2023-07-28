from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


def seed_servers():
    demo_server = Server(
        owner_id=1, name='Demo Server')
    krusty_krabs= Server(
        owner_id=10, name='Krust Krabs')
    chum_bucket= Server(
        owner_id=3, name='Chum Bucket')
    bikini_bottom = Server(
        owner_id=7, name='Bikini Bottom')

    db.session.add(demo_server)
    db.session.add(krusty_krabs)
    db.session.add(chum_bucket)
    db.session.add(bikini_bottom)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()