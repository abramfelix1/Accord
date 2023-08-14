from app.models import db, Member, environment, SCHEMA
from sqlalchemy.sql import text


def seed_members():

    # Members of Demo Server
    member_56 = Member(
        user_id=1, server_id=1)
    member_1 = Member(
        user_id=2, server_id=1)
    member_62 = Member(
        user_id=3, server_id=1)
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
        user_id=7, server_id=4)
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
    member_143 = Member(
        user_id=12, server_id=4)
    member_144 = Member(
        user_id=13, server_id=4)
    member_145 = Member(
        user_id=11, server_id=4)
    member_146 = Member(
        user_id=15, server_id=4)
    member_147 = Member(
        user_id=16, server_id=4)
    member_148 = Member(
        user_id=17, server_id=4)
    member_149 = Member(
        user_id=18, server_id=4)
    member_150 = Member(
        user_id=19, server_id=4)

    # Members of Chum Bucket
    member_10 = Member(
        user_id=6, server_id=3)
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

    # Members of marvel
    member_47 = Member(
        user_id=36, server_id=5)
    member_63 = Member(
        user_id=20, server_id=5)
    member_64 = Member(
        user_id=21, server_id=5)
    member_65 = Member(
        user_id=22, server_id=5)
    member_66 = Member(
        user_id=23, server_id=5)
    member_67 = Member(
        user_id=24, server_id=5)
    member_68 = Member(
        user_id=25, server_id=5)
    member_69 = Member(
        user_id=26, server_id=5)
    member_70 = Member(
        user_id=27, server_id=5)
    member_71 = Member(
        user_id=28, server_id=5)
    member_72 = Member(
        user_id=29, server_id=5)
    member_73 = Member(
        user_id=30, server_id=5)
    member_74 = Member(
        user_id=31, server_id=5)
    member_75 = Member(
        user_id=32, server_id=5)
    member_76 = Member(
        user_id=33, server_id=5)
    member_77 = Member(
        user_id=34, server_id=5)
    member_78 = Member(
        user_id=35, server_id=5)

    # Members of stark industries
    member_48 = Member(
        user_id=34, server_id=6)
    member_78 = Member(
        user_id=21, server_id=6)
    member_80 = Member(
        user_id=20, server_id=6)
    member_81 = Member(
        user_id=1, server_id=6)

    # Members of smash club
    member_49 = Member(
        user_id=20, server_id=7)
    member_82 = Member(
        user_id=22, server_id=7)
    member_83 = Member(
        user_id=26, server_id=7)
    member_84 = Member(
        user_id=29, server_id=7)
    member_85 = Member(
        user_id=30, server_id=7)
    member_86 = Member(
        user_id=33, server_id=7)
    member_87 = Member(
        user_id=34, server_id=7)
    member_88 = Member(
        user_id=25, server_id=7)

    # Members of i am groot
    member_50 = Member(
        user_id=24, server_id=8)
    member_89 = Member(
        user_id=9, server_id=8)
    member_91 = Member(
        user_id=10, server_id=8)
    member_92 = Member(
        user_id=11, server_id=8)
    member_93 = Member(
        user_id=12, server_id=8)
    member_94 = Member(
        user_id=13, server_id=8)
    member_95 = Member(
        user_id=11, server_id=8)
    member_96 = Member(
        user_id=15, server_id=8)
    member_97 = Member(
        user_id=16, server_id=8)
    member_98 = Member(
        user_id=17, server_id=8)
    member_99 = Member(
        user_id=18, server_id=8)
    member_100 = Member(
        user_id=19, server_id=8)
    member_101 = Member(
        user_id=20, server_id=8)
    member_102 = Member(
        user_id=21, server_id=8)
    member_103 = Member(
        user_id=22, server_id=8)
    member_104 = Member(
        user_id=23, server_id=8)
    member_105 = Member(
        user_id=24, server_id=8)
    member_106 = Member(
        user_id=25, server_id=8)
    member_107 = Member(
        user_id=26, server_id=8)
    member_108 = Member(
        user_id=27, server_id=8)
    member_109 = Member(
        user_id=28, server_id=8)
    member_110 = Member(
        user_id=29, server_id=8)
    member_111 = Member(
        user_id=30, server_id=8)
    member_112 = Member(
        user_id=31, server_id=8)
    member_113 = Member(
        user_id=32, server_id=8)
    member_114 = Member(
        user_id=33, server_id=8)
    member_115 = Member(
        user_id=34, server_id=8)
    member_116 = Member(
        user_id=11, server_id=8)
    member_120 = Member(
        user_id=1, server_id=8)
    member_121 = Member(
        user_id=4, server_id=8)

    # Members of davy jones locker
    member_51 = Member(
        user_id=18, server_id=9)
    member_117 = Member(
        user_id=1, server_id=9)
    member_118 = Member(
        user_id=26, server_id=9)
    member_119 = Member(
        user_id=25, server_id=9)
    member_122 = Member(
        user_id=2, server_id=9)
    member_123 = Member(
        user_id=3, server_id=9)
    member_124 = Member(
        user_id=4, server_id=9)

    # Members of meow
    member_52 = Member(
        user_id=12, server_id=10)
    member_125 = Member(
        user_id=1, server_id=10)
    member_126 = Member(
        user_id=7, server_id=10)
    member_127 = Member(
        user_id=8, server_id=10)
    member_128 = Member(
        user_id=11, server_id=10)
    member_129 = Member(
        user_id=20, server_id=10)
    member_130 = Member(
        user_id=25, server_id=10)
    member_131 = Member(
        user_id=30, server_id=10)
    member_132 = Member(
        user_id=31, server_id=10)
    member_133 = Member(
        user_id=33, server_id=10)
    member_134 = Member(
        user_id=22, server_id=10)

    # Members of app academy
    member_53 = Member(
        user_id=1, server_id=11)
    member_135 = Member(
        user_id=4, server_id=11)
    member_136 = Member(
        user_id=3, server_id=11)
    member_137 = Member(
        user_id=2, server_id=11)

    # Members of study-group
    member_54 = Member(
        user_id=4, server_id=12)
    member_138 = Member(
        user_id=1, server_id=12)
    member_139 = Member(
        user_id=2, server_id=12)
    member_140 = Member(
        user_id=3, server_id=12)

    # Members of atlantis
    member_55 = Member(
        user_id=19, server_id=13)
    member_141 = Member(
        user_id=7, server_id=13)
    member_142 = Member(
        user_id=10, server_id=13)


#current num: 150

# server owners
    db.session.add(member_56)
    db.session.add(member_15)
    db.session.add(member_5)
    db.session.add(member_10)
    db.session.add(member_47)   #broken
    db.session.add(member_48)
    db.session.add(member_49)
    db.session.add(member_50)
    db.session.add(member_51)   #broken
    db.session.add(member_52)
    db.session.add(member_53)
    db.session.add(member_54)
    db.session.add(member_55)

# server members
    db.session.add(member_1)
    db.session.add(member_60)
    db.session.add(member_57)
    db.session.add(member_58)
    db.session.add(member_59)
    db.session.add(member_2)
    db.session.add(member_3)
    db.session.add(member_62)
    db.session.add(member_4)
    db.session.add(member_6)
    db.session.add(member_7)
    db.session.add(member_8)
    db.session.add(member_9)
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
    db.session.add(member_63)
    db.session.add(member_64)
    db.session.add(member_65)
    db.session.add(member_66)
    db.session.add(member_67)
    db.session.add(member_68)
    db.session.add(member_69)
    db.session.add(member_70)
    db.session.add(member_71)
    db.session.add(member_72)
    db.session.add(member_73)
    db.session.add(member_74)
    db.session.add(member_75)
    db.session.add(member_76)
    db.session.add(member_77)
    db.session.add(member_78)
    db.session.add(member_39)
    db.session.add(member_80)
    db.session.add(member_81)
    db.session.add(member_82)
    db.session.add(member_83)
    db.session.add(member_84)
    db.session.add(member_85)
    db.session.add(member_86)
    db.session.add(member_87)
    db.session.add(member_88)
    db.session.add(member_89)
    db.session.add(member_91)
    db.session.add(member_93)
    db.session.add(member_94)
    db.session.add(member_95)
    db.session.add(member_96)
    db.session.add(member_97)
    db.session.add(member_98)
    db.session.add(member_99)
    db.session.add(member_100)
    db.session.add(member_101)
    db.session.add(member_102)
    db.session.add(member_103)
    db.session.add(member_104)
    db.session.add(member_106)
    db.session.add(member_107)
    db.session.add(member_108)
    db.session.add(member_109)
    db.session.add(member_110)
    db.session.add(member_111)
    db.session.add(member_112)
    db.session.add(member_113)
    db.session.add(member_114)
    db.session.add(member_115)
    db.session.add(member_116)
    db.session.add(member_117)
    db.session.add(member_118)
    db.session.add(member_119)
    db.session.add(member_120)
    db.session.add(member_121)
    db.session.add(member_122)
    db.session.add(member_123)
    db.session.add(member_124)
    db.session.add(member_125)
    db.session.add(member_126)
    db.session.add(member_127)
    db.session.add(member_128)
    db.session.add(member_129)
    db.session.add(member_131)
    db.session.add(member_132)
    db.session.add(member_133)
    db.session.add(member_134)
    db.session.add(member_135)
    db.session.add(member_136)
    db.session.add(member_137)   #broken
    db.session.add(member_138)
    db.session.add(member_139)
    db.session.add(member_140)
    db.session.add(member_141)
    db.session.add(member_142)
    db.session.add(member_143)
    db.session.add(member_144)
    db.session.add(member_145)
    db.session.add(member_146)
    db.session.add(member_147)
    db.session.add(member_148)
    db.session.add(member_149)
    db.session.add(member_150)



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
