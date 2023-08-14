from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


# def seed_servers():
#     demo_server = Server(
#         owner_id=1, name='Demo Server')
#     krusty_krabs= Server(
#         owner_id=10, name='Krust Krabs')
#     chum_bucket= Server(
#         owner_id=6, name='Chum Bucket')
#     bikini_bottom = Server(
#         owner_id=7, name='Bikini Bottom')
#     marvel = Server(
#         owner_id=44, name='Marvel')
#     stark_industries = Server(
#         owner_id=34, name='Stark Industries')
#     smash_club = Server(
#         owner_id=20, name='Smash Club')
#     i_am_groot = Server(
#         owner_id=24, name='I AM GROOT')
#     davy_jones_locker = Server(
#         owner_id=42, name='Davy Jones Locker')
#     meow = Server(
#         owner_id=36, name='Meow')
#     app_academy = Server(
#         owner_id=1, name='App Academy')
#     study_group = Server(
#         owner_id=4, name='Study Group')
#     atlantis = Server(
#         owner_id=19, name='Atlantis')

def seed_servers():
    demo_server = Server(
        owner_id=1, name='Demo Server')
    krusty_krabs= Server(
        owner_id=10, name='Krust Krabs', image_url="https://i.imgur.com/UIXaU42.jpg", banner_image ='https://i.imgur.com/w4R3rYI.png')
    chum_bucket= Server(
        owner_id=6, name='Chum Bucket', image_url="https://i.imgur.com/IHwLwmD.jpg", banner_image='https://i.imgur.com/BMks5VE.jpeg')
    bikini_bottom = Server(
        owner_id=7, name='Bikini Bottom', image_url="https://i.imgur.com/bxvu2Vl.jpg", banner_image='https://i.imgur.com/Tnemoe4.jpeg')
    marvel = Server(
        owner_id=36, name='Marvel', image_url="https://i.imgur.com/OdT0cLl.jpg")
    stark_industries = Server(
        owner_id=34, name='Stark Industries', banner_image='https://i.imgur.com/QljYaI1.png')
    smash_club = Server(
        owner_id=20, name='Smash Club', banner_image='https://i.imgur.com/aegvdGV.png')
    i_am_groot = Server(
        owner_id=24, name='I AM GROOT', image_url="https://i.imgur.com/9hi25cU.jpg")
    davy_jones_locker = Server(
        owner_id=18, name='Davy Jones Locker')
    meow = Server(
        owner_id=12, name='Meow', image_url="https://i.imgur.com/1H1NeH3.jpg", banner_image='https://i.imgur.com/mtbl1cr.jpeg')
    app_academy = Server(
        owner_id=1, name='App Academy', image_url="https://i.imgur.com/EtcV4uQ.png")
    study_group = Server(
        owner_id=4, name='Study Group')
    atlantis = Server(
        owner_id=19, name='Atlantis')

    db.session.add(demo_server)
    db.session.add(krusty_krabs)
    db.session.add(chum_bucket)
    db.session.add(bikini_bottom)
    db.session.add(marvel)
    db.session.add(stark_industries)
    db.session.add(smash_club)
    db.session.add(i_am_groot)
    db.session.add(davy_jones_locker)
    db.session.add(meow)
    db.session.add(app_academy)
    db.session.add(study_group)
    db.session.add(atlantis)

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
