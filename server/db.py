import MySQLdb

from contextlib import contextmanager

class DBConnector(object):
    def __init__(self, host, port, user, password, db):
        self.host = host
        self.port = port
	self.user = user
	self.password = password
	self.db = db

    @contextmanager
    def connect(self):
	conn = None
        try:
	    conn = MySQLdb.connect(host=self.host, port=self.port, 
	                           user=self.user, passwd=self.password,
				   db=self.db)
	    yield conn.cursor()
        finally:
	    if conn is not None:
                conn.close()
