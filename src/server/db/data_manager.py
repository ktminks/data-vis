import json
import os
import oracledb

class DataManager:
    def __init__(self, db_manager, schema_file='src/server/db/test/schema.sql', mock_data_file='src/server/db/test/data.json'):
        self.db_manager = db_manager
        self.schema_file = schema_file
        self.mock_data_file = mock_data_file

    def init_db(self):
        conn = self.db_manager.connect()
        cursor = conn.cursor()

        # Drop tables if they exist
        self.drop_tables(conn, cursor)
        
        # If tables don't exist, create them
        self.create_tables(conn, cursor)

        # If tables are empty, load mock data
        self.load_mock_data(conn, cursor)

        conn.commit()
        cursor.close()
        conn.close()
        

    def table_exists(self, table_name, cursor):
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            return True
        except oracledb.Error as e:
            print(f'Error while attempting to check if table {table_name} exists: {e}')
            return False

    def execute_create_table(self, statement, conn, cursor):
        table_name = statement.split()[2]
        try:
            cursor.execute(statement)
        except oracledb.Error as e:
            error_obj, = e.args
            print(f'Error while attempting to create table {table_name}: {e}')
            print("Error Message:", error_obj.message)

    def drop_tables(self, conn, cursor):
        try:
            with open(self.schema_file, 'r') as f:
                schema = f.read()
                statements = schema.strip().split(';')
                for statement in statements:
                    if statement.strip():
                        table_name = statement.split()[2]
                        if self.table_exists(table_name, cursor):
                            cursor.execute(f'DROP TABLE {table_name} CASCADE CONSTRAINTS')
                            print(f'Dropped table {table_name}')
        except oracledb.Error as e:
            error_obj, = e.args
            print(f'Error while attempting to drop table {table_name}: {e}')
            print("Error Message:", error_obj.message)
        conn.commit()

    def create_tables(self, conn, cursor):
        with open(self.schema_file, 'r') as f:
            schema = f.read()
            statements = schema.strip().split(';')
            for statement in statements:
                if statement.strip():
                    self.execute_create_table(statement, conn, cursor)
        conn.commit()

    def table_is_empty(self, table_name, cursor):
        try:
            cursor.execute(f'SELECT COUNT(*) FROM {table_name}')
            return cursor.fetchone()[0] == 0
        except oracledb.Error as e:
            print(f'Error while checking if table {table_name} is empty: {e}')
    
    def load_mock_data(self, conn, cursor):
        try:
            # If tables are empty, load mock data
            with open(self.mock_data_file, 'r') as f:
                mock_data = json.load(f)
                for table, rows in mock_data.items():
                    print(f'Loading mock data for table {table}')
                    for row in rows:
                        print(f'Loading row: {row}')
                        columns = ', '.join(row.keys())
                        placeholders = ', '.join([':' + key for key in row.keys()])
                        insert_query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
                        cursor.execute(insert_query, row)

        except oracledb.Error as e:
            print(f'Error while loading mock data: {e}')

