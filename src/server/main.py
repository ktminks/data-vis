from flask import Flask
from flask_cors import CORS
from db.routes import setup_routes
from db.data_manager import DataManager
from db.database_manager import DatabaseManager

db_manager = DatabaseManager()
data_manager = DataManager(db_manager)
# data_manager.init_db()

app = Flask(__name__)
CORS(app)
setup_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
