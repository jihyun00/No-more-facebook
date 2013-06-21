from datetime import datetime
from db import DBConnector

class Count(object):
    def __init__(self):
        self.db = DBConnector("127.0.0.1", 3306, "jihyun", "jihyun", "test")

    def find(self, identifier, kind):
        with self.db.connect() as cursor:
            cursor.execute(
			"""
			    SELECT * 
			    FROM nmf
				WHERE identifier = %s
				      AND kind = %s
			""", 
			(identifier, kind))
            return cursor.fetchall()

    def upsert(self, identifier, kind):
        data = self.find(identifier, kind)
        if len(data) > 0:
            return update(identifier, kind)
        else:
            return insert(identifier, kind)

    def update(self, identifier, kind):
        with self.db.connect() as cursor:
            return cursor.execute(
			"""
			    UPDATE FROM nmf
			    WHERE identifier = %s
				  AND kind = %s
			""", 
			(identifier, kind)) == 1

    def insert(self, identifier, kind):
        with self.db.connect() as cursor:
            x = cursor.execute(
			"""
                            INSERT INTO nmf 
                            (identifier, kind, count, `updated-time`)
                            VALUES
                            (%s, %s, 1, now())
			""", 
			(identifier, kind))
            return x.commit()
