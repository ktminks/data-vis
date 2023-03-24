from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import text, Column, String, Integer, Float
import json

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app, resources={r"*": {"origins": ["http://localhost:4200"]}})
db = SQLAlchemy(app)

# Define database models
class Region(db.Model):
    regionID = db.Column(db.String, primary_key=True)
    regionName = db.Column(db.String)

class Country(db.Model):
    countryID = db.Column(db.String, primary_key=True)
    regionID = db.Column(db.String, db.ForeignKey("region.regionID"))
    countryName = db.Column(db.String)
    currencyUnit = db.Column(db.String)

class DevelopmentIndicator(db.Model):
    indicatorID = db.Column(db.String, primary_key=True)
    countryID = db.Column(db.String, db.ForeignKey("country.countryID"), primary_key=True)
    year = db.Column(db.Integer, primary_key=True)
    indicatorName = db.Column(db.String)
    topic = db.Column(db.String)
    unitsOfMeasure = db.Column(db.String)

class PovertyAndIncome(db.Model):
    indicatorID = db.Column(db.String, db.ForeignKey("development_indicator.indicatorID"), primary_key=True)
    countryID = db.Column(db.String, db.ForeignKey("country.countryID"), primary_key=True)
    year = db.Column(db.Integer, db.ForeignKey("development_indicator.year"), primary_key=True)
    mean = db.Column(db.Float)
    gdp = db.Column(db.Float)
    giniIndex = db.Column(db.Float)
    median = db.Column(db.Float)
    povertyGap = db.Column(db.Float)
    headCount = db.Column(db.Integer)

# Create tables and load mock data
with app.app_context():
    db.create_all()
    with open("mock_simplified.json", "r") as file:
        mock_data = json.load(file)

    # Map table names to classes
    table_classes = {
        "Region": Region,
        "Country": Country,
        "DevelopmentIndicator": DevelopmentIndicator,
        "PovertyAndIncome": PovertyAndIncome,
    }

    for table, records in mock_data.items():
        table_class = table_classes.get(table)
        if table_class:
            db.session.bulk_insert_mappings(table_class, records)
            db.session.commit()


# Define the query function
def worse_than_average_query():
    query = text("""
        SELECT year, COUNT(countryID) as count
        FROM (
            SELECT p1.year, p1.countryID
            FROM poverty_and_income p1
            JOIN (
                SELECT year, AVG(povertyGap) as global_avg
                FROM poverty_and_income
                GROUP BY year
            ) p2 ON p1.year = p2.year
            WHERE p1.povertyGap > p2.global_avg * 1.5
        )
        GROUP BY year
        ORDER BY year
    """)
    result_proxy = db.session.execute(query)
    result = result_proxy.fetchall()
    column_names = result_proxy.keys()
    return result, column_names

@app.route("/api/poverty")
def worse_than_average():
    result, column_names = worse_than_average_query()
    return jsonify([dict(zip(column_names, row)) for row in result])

if __name__ == "__main__":
    app.run(debug=True)
