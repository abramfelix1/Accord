from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    gary = User(
        username='Gary', email='gary@aa.io', password='password', image_url="https://i.imgur.com/XAnQPRm.jpg")
    pearl = User(
        username='Pearl', email='pearl@aa.io', password='password', image_url="https://i.imgur.com/CoeJBS2.jpg")
    puff = User(
        username='Puff', email='puff@aa.io', password='password', image_url="https://i.imgur.com/1DWfhr2.jpg")
    larry = User(
        username='Larry', email='larry@aa.io', password='password', image_url="https://i.imgur.com/HXvGuud.jpg")
    karen = User(
        username='Karen', email='karen@aa.io', password='password', image_url="https://i.imgur.com/MbCDg2h.jpg")
    man_ray = User(
        username='Man_Ray', email='man_ray@aa.io', password='password', image_url="https://i.imgur.com/NkMazhg.jpg")
    flying_dutchman = User(
        username='Flying_Dutchman', email='flying_dutchman@aa.io', password='password', image_url="https://i.imgur.com/5v0u3l8.jpg")
    king_neptune = User(
        username='King_Neptune', email='king_neptune@aa.io', password='password', image_url="https://i.imgur.com/Kcgni4P.jpg")
    mermaid_man = User(
        username='Mermaid_Man', email='mermaid_man@aa.io', password='password', image_url="https://i.imgur.com/EDi989g.png")
    plankton = User(
        username='plankton', email='plankton@aa.io', password='password', image_url="https://i.imgur.com/ppWdNtC.png")
    abram = User(
        username='abram', email='abram@aa.io', password='password', image_url="")
    randy = User(
        username='randy', email='randy@aa.io', password='password', image_url="", display_name='randyhac')
    jonathan = User(
        username='jonathan', email='jonathan@aa.io', password='password', image_url="")
    spongebob = User(
        username='spongebob', email='spongebob@aa.io', password='password', display_name='squarepants', image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThu3bG0UEH9zGM88LiFoCne7gnKm9_0j5aQ&usqp=CAU")
    patrick = User(
        username='patrick', email='patrick@aa.io', password='password', display_name='star', image_url='https://assets-prd.ignimgs.com/2020/08/10/patrick-star-show-button-1597086459843.jpg')
    squidward = User(
        username='squidward', email='squidward@aa.io', password='password', image_url='https://i.imgur.com/zTVDhhx.jpg')
    mrkrab = User(
        username='mrkrab', email='mrkrab@aa.io', password='password', image_url='https://i.pinimg.com/originals/07/4b/d7/074bd7dfc19abf84f5cd6cb70619c703.jpg')
    sandy = User(
        username='sandy', email='sandy@aa.io', password='password', display_name='squirrel', image_url='https://www.spongebobshop.com/cdn/shop/products/Viacom_Spongebob_Tote_Printful_SBSP-SBF-PT_Image03_grande.jpg?v=1583786197')
    hulk = User(
        username='Hulk', email='hulk@aa.io', password='password', image_url="https://i.imgur.com/WbxQ0gE.jpg")
    spiderman = User(
        username='Spiderman', email='spiderman@aa.io', password='password', image_url="https://i.imgur.com/4puF5oz.jpg")
    thor = User(
        username='Thor', email='thor@aa.io', password='password', image_url="https://i.imgur.com/T0M24sC.jpg")
    daredevil = User(
        username='Daredevil', email='daredevil@aa.io', password='password', image_url="https://i.imgur.com/7xnU571.jpg")
    groot = User(
        username='Groot', email='groot@aa.io', password='password', image_url="https://i.imgur.com/wTlUdCY.jpg")
    deadpool = User(
        username='Deadpool', email='deadpool@aa.io', password='password', image_url="https://i.imgur.com/igRJSl1.jpg")
    loki = User(
        username='Loki', email='loki@aa.io', password='password', image_url="https://i.imgur.com/1Tx5nd3.jpg")
    blade = User(
        username='Blade', email='blade@aa.io', password='password', image_url="https://i.imgur.com/WEgvOIs.jpg")
    hawkeye = User(
        username='Hawkeye', email='hawkeye@aa.io', password='password', image_url="https://i.imgur.com/IIgoxNR.jpg")
    captian_america = User(
        username='Captian_America', email='captian_america@aa.io', password='password', image_url="https://i.imgur.com/cJKHVzk.jpg")
    captian_marvel = User(
        username='Captian_Marvel', email='captian_marvel@aa.io', password='password', image_url="https://i.imgur.com/VXGk9G6.jpg")
    wolverine = User(
        username='Wolverine', email='wolverine@aa.io', password='password', image_url="https://i.imgur.com/qBCB2PG.jpg")
    black_widow = User(
        username='Black_Widow', email='black_widow@aa.io', password='password', image_url="https://i.imgur.com/Z10GkE6.jpg")
    black_panther = User(
        username='Black_Panther', email='black_panther@aa.io', password='password', image_url="https://i.imgur.com/yuz2tDq.jpg")
    iron_man = User(
        username='Iron_Man', email='iron_man@aa.io', password='password', image_url="https://i.imgur.com/qp7IMJd.jpg")
    gamora = User(
        username='Gamora', email='gamora@aa.io', password='password', image_url="https://i.imgur.com/uEbuxRG.jpg")
    stan_lee = User(
        username='Stan_Lee', email='stan_lee@aa.io', password='password', image_url="https://i.imgur.com/XjmxGzZ.jpg")
    
    db.session.add(demo)
    db.session.add(abram)
    db.session.add(randy)
    db.session.add(jonathan)
    db.session.add(mermaid_man)     #5
    db.session.add(plankton)
    db.session.add(spongebob)
    db.session.add(patrick)
    db.session.add(squidward)
    db.session.add(mrkrab)          #10
    db.session.add(sandy)
    db.session.add(gary)
    db.session.add(pearl)
    db.session.add(puff)
    db.session.add(larry)           #15
    db.session.add(karen)
    db.session.add(man_ray)
    db.session.add(flying_dutchman)
    db.session.add(king_neptune)
    db.session.add(hulk)            #20
    db.session.add(spiderman)
    db.session.add(thor)
    db.session.add(daredevil)
    db.session.add(groot)
    db.session.add(deadpool)        #25
    db.session.add(loki)
    db.session.add(blade)
    db.session.add(hawkeye)
    db.session.add(captian_america)
    db.session.add(captian_marvel)  #30
    db.session.add(wolverine)
    db.session.add(black_widow)
    db.session.add(black_panther)
    db.session.add(iron_man)
    db.session.add(gamora)          #35
    db.session.add(gary)
    db.session.add(pearl)
    db.session.add(puff)
    db.session.add(larry)
    db.session.add(karen)           #40
    db.session.add(man_ray)
    db.session.add(flying_dutchman)
    db.session.add(king_neptune)
    db.session.add(stan_lee)        #44

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
