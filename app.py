import os

import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/climate_change.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
States = Base.classes.US_States
Pollution = Base.classes.co2
Population = Base.classes.census_data
Temperature = Base.classes.us_temp

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/states")
def states():
    """Return a list of states."""
    # Use Pandas to perform the sql query
    stmt = db.session.query(States).statement
    state_df = pd.read_sql(stmt, db.session.bind)
    return jsonify(list(state_df["state"]))

@app.route("/dates")
def dates():
    """Return a list of states."""
    # Use Pandas to perform the sql query
    #stmt = db.session.query(States).statement
    #state_df = pd.read_sql(stmt, db.session.bind)
    stmt1 = "select distinct Year from co2"
    dates_data = pd.read_sql(stmt1, db.session.bind)
    return jsonify(list(dates_data["Year"]))

@app.route("/pol-temp/<state>/<fromDate>/<toDate>")
def pollution(state,fromDate, toDate):
    """Return pollution and temp data."""
    stmt1 = "select b.state_id, a.Year, a.CO2DATA, b.avg_temp from co2 a, view_us_temp_year b where b.state_id = a.Abbr and a.Year = b.year and b.state_id = " + "'" + state + "'" + " and b.year >= " + "'" + fromDate + "'" + " and b.year <= " + "'" + toDate +"'"
    pol_temp_data = pd.read_sql(stmt1, db.session.bind)
#    df1 = pd.read_sql('select b.state_id, a.Year, a.CO2DATA, b.avg_temp from co2 a, view_us_temp_year b where b.state_id = a.Abbr and a.Year = b.year', db.session.bind)
#    stmt1 = db.session.query(Pollution,Temperature).filter(Pollution.State == Temperature.state_id).statement
#    df1 = pd.read_sql(stmt1, db.session.bind)
#    print(df1)
    #pol_temp_data = df1.loc[1:3]
    pol_temp_data1 = {
        "Year": pol_temp_data.Year.values.tolist(),
        "sample_values": pol_temp_data.state_id.values.tolist(),
        "co2": pol_temp_data.CO2DATA.tolist(),
        "avgTemp": pol_temp_data.avg_temp.tolist(),
    }
    return jsonify(pol_temp_data1)

@app.route("/pol-pop/<state>/<fromDate>/<toDate>")
def population(state,fromDate, toDate):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt1 = "select b.Abbr, b.Year, b.CO2DATA, a.Population from census_data a, co2 b where a.State = b.Abbr and a.Year = b.year and b.Abbr = " + "'" + state + "'" + " and b.year >= " + "'" + fromDate + "'" + " and b.year <= " + "'" + toDate +"'"
    df1 = pd.read_sql(stmt1, db.session.bind)
#    df1 = pd.read_sql('select b.Abbr, b.Year, b.CO2DATA, a.Population from census_data a, co2 b where a.State = b.Abbr and a.Year = b.year', db.session.bind)
    pol_pop = df1.loc[1:3]
    pol_pop1 = {
        "year": pol_pop.Year.values.tolist(),
        "state": pol_pop.Abbr.values.tolist(),
        "co2": pol_pop.CO2DATA.tolist(),
        "population": pol_pop.Population.tolist(),
    }
    return jsonify(pol_pop1)

@app.route("/3factor/<state>/<fromDate>/<toDate>")
def threeFactor(state,fromDate, toDate):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt1 = "select a.State, a.Population, b.year, b.avg_temp, c.CO2DATA from census_data a, view_us_temp_year b, co2 c where b.state_id = a.State and  b.state_id = c.Abbr and a.Year = b.year and a.Year = c.year and b.state_id = " + "'" + state + "'" + " and b.year >= " + "'" + fromDate + "'" + " and b.year <= " + "'" + toDate +"'"
    df1 = pd.read_sql(stmt1, db.session.bind)
#    df1 = pd.read_sql('select a.State, a.Population, b.year, b.avg_temp, c.CO2DATA from census_data a, view_us_temp_year b, co2 c where b.state_id = a.State and  b.state_id = c.Abbr and a.Year = b.year and a.Year = c.year', db.session.bind)
    three_data = df1.loc[1:3]
    data1 = {
        "Year": three_data.year.values.tolist(),
        "state": three_data.State.values.tolist(),
        "co2": three_data.CO2DATA.tolist(),
        "population": three_data.Population.tolist(),
        "temp": three_data.avg_temp.tolist(),
    }
    return jsonify(data1)


@app.route("/pop-temp/<state>/<fromDate>/<toDate>")
def popTemp(state,fromDate, toDate):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt1 = "select a.State, a.Population, b.year, b.avg_temp from census_data a, view_us_temp_year b where b.state_id = a.State and a.Year = b.year and b.state_id = " + "'" + state + "'" + " and b.year >= " + "'" + fromDate + "'" + " and b.year <= " + "'" + toDate +"'"
    df1 = pd.read_sql(stmt1, db.session.bind)
    #df1 = pd.read_sql('select a.State, a.Population, b.year, b.avg_temp from census_data a, view_us_temp_year b where b.state_id = a.State and a.Year = b.year', db.session.bind)
    three_data1 = df1.loc[1:3]
    data1 = {
        "year": three_data1.year.values.tolist(),
        "state": three_data1.State.values.tolist(),
        "population": three_data1.Population.tolist(),
        "avgTemp": three_data1.avg_temp.tolist(),
    }
    return jsonify(data1)


@app.route("/metadata/<state>")
def population_metadata(state):
#    """Return the MetaData for a given sample."""
    sel = [
        Population.ID,
        Population.State,
        Population.Year,
        Population.Population,
    ]

    results = db.session.query(*sel).filter(Population.State == state).all()

    # Create a dictionary entry for each row of metadata information
    population = {}
    for result in results:
        population["ID"] = result[0]
        population["State"] = result[1]
        population["Year"] = result[2]
        population["Population"] = result[3]

    return jsonify(population)


@app.route("/samples/<sample>")
def samples(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt = db.session.query(Population).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
    sample_data = sample_data.sort_values(sample, ascending=False)

    # Format the data to send as json
    data = {
        "otu_ids": sample_data.otu_id.values.tolist(),
        "sample_values": sample_data[sample].values.tolist(),
        "otu_labels": sample_data.otu_label.tolist(),
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run()
