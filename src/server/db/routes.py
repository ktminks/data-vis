from flask import jsonify
from flask_restful import Api, Resource
from db.database_manager import DatabaseManager
from db.data_service import DataService
from db.queries import *

def setup_routes(app):
    api = Api(app, "/api")
    api.add_resource(PovertyData, '/poverty/<type>')
    api.add_resource(Test, '/test')

class PovertyData(Resource):
    def __init__(self):
        self.db_manager = DatabaseManager()
        self.data_service = DataService(self.db_manager)

    def get(self, type):
        if type == 'map':
            response = self.data_service.fetch_map_data(poverty_query_map)
        else:
            response = self.data_service.run_query(poverty_query)
        return jsonify(response)

class Test(Resource):
    def get(self):
        return "Hello World"
    
