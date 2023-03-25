from flask import Flask, jsonify
from db.database_manager import DatabaseManager
from db.data_manager import DataManager

app = Flask(__name__)
db_manager = DatabaseManager()
data_manager = DataManager(db_manager)

@app.before_first_request
def setup_database():
    data_manager.init_db()

@app.route('/api/test')
def test_connection():
    result = db_manager.test_connection()
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='localhost', port=4201)


# # Create tables and load mock data
# with app.app_context():
#     db.create_all()
#     with open("mock_simplified.json", "r") as file:
#         mock_data = json.load(file)

#     # Map table names to classes
#     table_classes = {
#         "Region": Region,
#         "Country": Country,
#         "DevelopmentIndicator": DevelopmentIndicator,
#         "PovertyAndIncome": PovertyAndIncome,
#     }

#     for table, records in mock_data.items():
#         table_class = table_classes.get(table)
#         if table_class:
#             db.session.bulk_insert_mappings(table_class, records)
#             db.session.commit()


# # Define the query function
# def worse_than_average_query():
#     query = text("""
#         SELECT year, COUNT(countryID) as count
#         FROM (
#             SELECT p1.year, p1.countryID
#             FROM poverty_and_income p1
#             JOIN (
#                 SELECT year, AVG(povertyGap) as global_avg
#                 FROM poverty_and_income
#                 GROUP BY year
#             ) p2 ON p1.year = p2.year
#             WHERE p1.povertyGap > p2.global_avg * 1.5
#         )
#         GROUP BY year
#         ORDER BY year
#     """)
#     result_proxy = db.session.execute(query)
#     result = result_proxy.fetchall()
#     column_names = result_proxy.keys()
#     return result, column_names

# @app.route("/api/poverty")
# def worse_than_average():
#     result, column_names = worse_than_average_query()
#     return jsonify([dict(zip(column_names, row)) for row in result])

# if __name__ == "__main__":
#     app.run(debug=True)
