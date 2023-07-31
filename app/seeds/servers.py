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
    test_server_1 = Server(
        owner_id=1, name='test server 1')
    test_server_2 = Server(
        owner_id=1, name='test server 2')
    test_server_3 = Server(
        owner_id=1, name='test server 3')
    test_server_4 = Server(
        owner_id=1, name='test server 4')
    test_server_5 = Server(
        owner_id=1, name='test server 5')
    test_server_6 = Server(
        owner_id=1, name='test server 6')
    test_server_7 = Server(
        owner_id=1, name='test server 7')
    test_server_8 = Server(
        owner_id=1, name='test server 8')
    test_server_9 = Server(
        owner_id=1, name='test server 9')

    db.session.add(demo_server)
    db.session.add(krusty_krabs)
    db.session.add(chum_bucket)
    db.session.add(bikini_bottom)
    db.session.add(test_server_1)
    db.session.add(test_server_2)
    db.session.add(test_server_3)
    db.session.add(test_server_4)
    db.session.add(test_server_5)
    db.session.add(test_server_6)
    db.session.add(test_server_7)
    db.session.add(test_server_8)
    db.session.add(test_server_9)

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
