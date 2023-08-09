from app.models import db, Member, environment, SCHEMA
from sqlalchemy.sql import text


def seed_members():

    # Members of Demo Server
    member_56 = Member(
        user_id=1, server_id=1)
    member_1 = Member(
        user_id=2, server_id=1)
    member_2 = Member(
        user_id=4, server_id=1)
    member_3 = Member(
        user_id=5, server_id=1)
    member_17 = Member(
        user_id=6, server_id=1)
    member_18 = Member(
        user_id=7, server_id=1)
    member_19 = Member(
        user_id=8, server_id=1)
    member_20 = Member(
        user_id=9, server_id=1)
    member_21 = Member(
        user_id=10, server_id=1)
    member_22 = Member(
        user_id=11, server_id=1)
    member_23 = Member(
        user_id=12, server_id=1)
    member_24 = Member(
        user_id=13, server_id=1)
    member_25 = Member(
        user_id=11, server_id=1)
    member_26 = Member(
        user_id=15, server_id=1)
    member_27 = Member(
        user_id=16, server_id=1)
    member_28 = Member(
        user_id=17, server_id=1)
    member_29 = Member(
        user_id=18, server_id=1)
    member_30 = Member(
        user_id=19, server_id=1)
    member_31 = Member(
        user_id=20, server_id=1)
    member_32 = Member(
        user_id=21, server_id=1)
    member_33 = Member(
        user_id=22, server_id=1)
    member_34 = Member(
        user_id=23, server_id=1)
    member_35 = Member(
        user_id=24, server_id=1)
    member_36 = Member(
        user_id=25, server_id=1)
    member_37 = Member(
        user_id=26, server_id=1)
    member_38 = Member(
        user_id=27, server_id=1)
    member_39 = Member(
        user_id=28, server_id=1)
    member_40 = Member(
        user_id=29, server_id=1)
    member_41 = Member(
        user_id=30, server_id=1)
    member_42 = Member(
        user_id=31, server_id=1)
    member_43 = Member(
        user_id=32, server_id=1)
    member_44 = Member(
        user_id=33, server_id=1)
    member_45 = Member(
        user_id=34, server_id=1)
    member_46 = Member(
        user_id=11, server_id=1)

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
    member_57 = Member(
        user_id=1, server_id=4)
    member_61 = Member(
        user_id=7, server_id=4)

    # Members of Chum Bucket
    member_10 = Member(
        user_id=7, server_id=3)
    member_11 = Member(
        user_id=8, server_id=3)
    member_12 = Member(
        user_id=11, server_id=3)
    member_58 = Member(
        user_id=1, server_id=3)
    member_60 = Member(
        user_id=3, server_id=3)

    # Members of Krusty Krabs
    member_13 = Member(
        user_id=7, server_id=2)
    member_14 = Member(
        user_id=8, server_id=2)
    member_15 = Member(
        user_id=10, server_id=2)
    member_4 = Member(
        user_id=11, server_id=2)
    member_59 = Member(
        user_id=1, server_id=2)
    
    # Members of test server 1
    member_47 = Member(
        user_id=1, server_id=5)

    # Members of test server 2
    member_48 = Member(
        user_id=1, server_id=6)

    # Members of test server 3
    member_49 = Member(
        user_id=1, server_id=7)

    # Members of test server 4
    member_50 = Member(
        user_id=1, server_id=8)

    # Members of test server 5
    member_51 = Member(
        user_id=1, server_id=9)

    # Members of test server 6
    member_52 = Member(
        user_id=1, server_id=10)

    # Members of test server 7
    member_53 = Member(
        user_id=1, server_id=11)

    # Members of test server 8
    member_54 = Member(
        user_id=1, server_id=12)

    # Members of test server 9
    member_55 = Member(
        user_id=1, server_id=13)

    db.session.add(member_47)
    db.session.add(member_48)
    db.session.add(member_49)
    db.session.add(member_50)
    db.session.add(member_51)
    db.session.add(member_52)
    db.session.add(member_53)
    db.session.add(member_54)
    db.session.add(member_55)
    db.session.add(member_56)
    db.session.add(member_1)
    db.session.add(member_15)
    db.session.add(member_60)
    db.session.add(member_61)
    db.session.add(member_57)
    db.session.add(member_58)
    db.session.add(member_59)
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
    db.session.add(member_17)
    db.session.add(member_18)
    db.session.add(member_19)
    db.session.add(member_20)
    db.session.add(member_21)
    db.session.add(member_22)
    db.session.add(member_23)
    db.session.add(member_24)
    db.session.add(member_25)
    db.session.add(member_26)
    db.session.add(member_27)
    db.session.add(member_28)
    db.session.add(member_29)
    db.session.add(member_30)
    db.session.add(member_31)
    db.session.add(member_32)
    db.session.add(member_33)
    db.session.add(member_34)
    db.session.add(member_35)
    db.session.add(member_36)
    db.session.add(member_37)
    db.session.add(member_38)
    db.session.add(member_39)
    db.session.add(member_40)
    db.session.add(member_41)
    db.session.add(member_42)
    db.session.add(member_43)
    db.session.add(member_44)
    db.session.add(member_45)
    db.session.add(member_46)



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
