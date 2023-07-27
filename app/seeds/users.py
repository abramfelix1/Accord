from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    plankton = User(
        username='plankton', email='plankton@aa.io', password='password')
    abram = User(
        username='abram', email='abram@aa.io', password='password')
    randy = User(
        username='randy', email='randy@aa.io', password='password', display_name='randyhac')
    jonathan = User(
        username='jonathan', email='jonathan@aa.io', password='password')
    spongebob = User(
        username='spongebob', email='spongebob@aa.io', password='password', display_name='squarepants', image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThu3bG0UEH9zGM88LiFoCne7gnKm9_0j5aQ&usqp=CAU")
    patrick = User(
        username='patrick', email='patrick@aa.io', password='password', display_name='star', image_url='https://assets-prd.ignimgs.com/2020/08/10/patrick-star-show-button-1597086459843.jpg')
    squidward = User(
        username='squidward', email='squidward@aa.io', password='password', image_url='https://miro.medium.com/v2/resize:fit:1024/0*YjYX05Vdd6K8UOY8.png')
    mrkrab = User(
        username='mrkrab', email='mrkrab@aa.io', password='password', image_url='https://i.pinimg.com/originals/07/4b/d7/074bd7dfc19abf84f5cd6cb70619c703.jpg')
    sandy = User(
        username='sandy', email='sandy@aa.io', password='password', display_name='squirrel', image_url='https://www.spongebobshop.com/cdn/shop/products/Viacom_Spongebob_Tote_Printful_SBSP-SBF-PT_Image03_grande.jpg?v=1583786197')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(plankton)
    db.session.add(abram)
    db.session.add(randy)
    db.session.add(jonathan)
    db.session.add(spongebob)
    db.session.add(patrick)
    db.session.add(squidward)
    db.session.add(mrkrab)
    db.session.add(sandy)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
