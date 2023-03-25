from flask_restful import Api, Resource
from db.database_manager import DatabaseManager
from db.data_service import DataService
from db.queries import poverty_query

def setup_routes(app):
    api = Api(app, "/api")

    class PovertyData(Resource):
        def __init__(self):
            self.db_manager = DatabaseManager()
            self.data_service = DataService(self.db_manager)

        def get(self):
            return self.data_service.fetch_data(poverty_query)

    api.add_resource(PovertyData, '/poverty')

    class Test(Resource):
        def get(self):
            return "Hello World"
        
    api.add_resource(Test, '/test')
