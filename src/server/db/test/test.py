# test.py

import oracledb
import os

un = os.environ.get('ORACLE_USERNAME')
pw = os.environ.get('ORACLE_PASSWORD')
cs = os.environ.get('ORACLE_PYTHON_CONNECT_STRING')

with oracledb.connect(user=un, password=pw, dsn=cs) as connection:
    with connection.cursor() as cursor:
        sql = """select sysdate from dual"""
        for r in cursor.execute(sql):
            print(r)