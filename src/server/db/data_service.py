# src/server/db/data_service.py

from db.database_manager import DatabaseManager

class DataService:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def run_query(self, query):
        conn = self.db_manager.connect()
        cursor = conn.cursor()

        cursor.execute(query)
        result = cursor.fetchall()
        data = [{'year': row[0], 'count': row[1]} for row in result]

        cursor.close()
        conn.close()

        return data

    def fetch_map_data(self, query):
        conn = self.db_manager.connect()
        cursor = conn.cursor()

        cursor.execute(query)
        result = cursor.fetchall()

        cursor.close()
        conn.close()

        return result
    