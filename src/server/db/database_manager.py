# database_manager.py
import oracledb
import os

class DatabaseManager:
    def __init__(self):
        self.un = os.environ.get('ORACLE_USERNAME')
        self.pw = os.environ.get('ORACLE_PASSWORD')
        self.cs = os.environ.get('ORACLE_PYTHON_CONNECT_STRING')

    def connect(self):
        return oracledb.connect(user=self.un, password=self.pw, dsn=self.cs);

    def test_connection(self):
        try:
            connection = self.connect()
            connection.close()
            return True
        except oracledb.Error:
            return False
