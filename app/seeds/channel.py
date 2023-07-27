from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text


def seed_channels():

    # Demo Server Channels
    music = Channel(
        name='music', server_id=1)
    random = Channel(
        name='random', server_id=1)
    memes = Channel(
        name='memes', server_id=1)
    leet_code = Channel(
        name='leet codes', server_id=1)

    # Krusty Krab Channels
    krusty_kitchen = Channel(
        name='The Krusty Kitchen', server_id=2
    )
    mr_krab_office = Channel(
        name="Mr.Krab's Office", server_id=2
    )
    krusty_menu = Channel(
        name="Krusty Menu and Updates", server_id=2
    )

    # Chum Bucket Channels
    bucket_list = Channel(
        name='The Bucket List', server_id=3
    )
    chum_cafeteria = Channel(
        name='Chum Cafeteria', server_id=3
    )
    laboratory = Channel(
        name='The Laboratory', server_id=3
    )

    # Bikini Bottom Channels
    kelp_forest = Channel(
        name='Kelp Forest', server_id=4)
    dullsville = Channel(
        name='Dullsville', server_id=4)
    rock_bottom = Channel(
        name='rock_bottom', server_id=4)

    db.session.add(music)
    db.session.add(random)
    db.session.add(memes)
    db.session.add(leet_code)
    db.session.add(krusty_kitchen)
    db.session.add(mr_krab_office)
    db.session.add(krusty_menu)
    db.session.add(bucket_list)
    db.session.add(chum_cafeteria)
    db.session.add(laboratory)
    db.session.add(kelp_forest)
    db.session.add(dullsville)
    db.session.add(rock_bottom)





    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
