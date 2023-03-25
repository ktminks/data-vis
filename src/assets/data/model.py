# from flask import Flask, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from sqlalchemy import text, Column, String, Integer, Float
# import json

# app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# CORS(app, resources={r"*": {"origins": ["http://localhost:4200"]}})
# db = SQLAlchemy(app)

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