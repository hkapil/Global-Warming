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

#app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/global_warming.sqlite"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/climate_change.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
#Population_Metadata = Base.classes.population_metadata
#States = Base.classes.states
#Pollution = Base.classes.co2_emissions
#Population = Base.classes.population
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
    #df = pd.read_sql('select * from states', db.session.bind)
    df = pd.read_sql(stmt, db.session.bind)
    #return jsonify(list(df["state_name"]))
    return jsonify(list(df["name"]))

@app.route("/pollution/<sample>")
def pollution(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    #stmt1 = db.session.query(Pollution).statement
    print("test statement")
    #df1 = pd.read_sql('select year, co2, State from co2_emissions', db.session.bind)
    #print(stmt1)
    df1 = pd.read_sql('select Year, CO2DATA, State from co2', db.session.bind)
    #print(stmt1)
    print("test statement2")
    #df1 = pd.read_sql(stmt1, db.session.bind)
    #print(df1)
    #print("test statement3")
    sample_data1 = df1.loc[1:3]
    #print(sample_data1)
    #print("test statement4")
    # Filter the data based on the sample number and
    # only keep rows with values above 1
 #   sample_data = df.loc[df[sample] > 1, ["Year", "co2", sample]]
 #   sample_data = sample_data.sort_values(sample, ascending=False)
    #print(sample_data1)
    #print("test statement5")
    # Format the data to send as json
    data1 = {
        "Year": sample_data1.Year.values.tolist(),
        "sample_values": sample_data1.State.values.tolist(),
        "co2": sample_data1.CO2DATA.tolist(),
        "avgTemp": sample_data1.CO2DATA.tolist(),
    }
    #print(data)
    return jsonify(data1)

@app.route("/population/<sample>")
def population(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    #stmt1 = db.session.query(Pollution).statement
    #print("test statement")
    df1 = pd.read_sql('select State, Year, Population from census_data', db.session.bind)
    #print(stmt1)
    #print("test statement2")
    #df1 = pd.read_sql(stmt1, db.session.bind)
    #print(df1)
    #print("test statement3")
    pop_data = df1.loc[1:3]
    #print(pop_data)
    #print("test statement4")
    # Filter the data based on the sample number and
    # only keep rows with values above 1
 #   sample_data = df.loc[df[sample] > 1, ["Year", "co2", sample]]
 #   sample_data = sample_data.sort_values(sample, ascending=False)
    #print(pop_data)
    #print("test statement5")
    # Format the data to send as json
    data1 = {
        "year": pop_data.Year.values.tolist(),
        "state": pop_data.State.values.tolist(),
        "co2": pop_data.Population.tolist(),
        "population": pop_data.Population.tolist(),
    }
    #print(data)
    return jsonify(data1)

@app.route("/3factor/<sample>")
def threeFactor(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    #stmt1 = db.session.query(Pollution).statement
    #print("test statement")
    df1 = pd.read_sql('select State, Year, Population from census_data', db.session.bind)
    #print(stmt1)
    #print("test statement2")
    #df1 = pd.read_sql(stmt1, db.session.bind)
    #print(df1)
    #print("test statement3")
    three_data = df1.loc[1:3]
    #print(three_data)
    #print("test statement4")
    # Filter the data based on the sample number and
    # only keep rows with values above 1
 #   sample_data = df.loc[df[sample] > 1, ["Year", "co2", sample]]
 #   sample_data = sample_data.sort_values(sample, ascending=False)
    #print(pop_data)
    #print("test statement5")
    # Format the data to send as json
    data1 = {
        "Year": three_data.Year.values.tolist(),
        "state": three_data.State.values.tolist(),
        "co2": three_data.Population.tolist(),
        "population": three_data.Population.tolist(),
        "temp": three_data.Population.tolist(),
    }
    #print(data)
    return jsonify(data1)


@app.route("/pop-temp/<sample>")
def popTemp(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    #stmt1 = db.session.query(Pollution).statement
    #print("test statement")
    df1 = pd.read_sql('select State, Year, Population from census_data', db.session.bind)
    #print(stmt1)
    #print("test statement2")
    #df1 = pd.read_sql(stmt1, db.session.bind)
    #print(df1)
    #print("test statement3")
    three_data1 = df1.loc[1:3]
    #print(three_data)
    #print("test statement4")
    # Filter the data based on the sample number and
    # only keep rows with values above 1
 #   sample_data = df.loc[df[sample] > 1, ["Year", "co2", sample]]
 #   sample_data = sample_data.sort_values(sample, ascending=False)
    #print(pop_data)
    #print("test statement5")
    # Format the data to send as json
    data1 = {
        "year": three_data1.Year.values.tolist(),
        "state": three_data1.State.values.tolist(),
        "population": three_data1.Population.tolist(),
        "avgTemp": three_data1.Population.tolist(),
    }
    #print(data)
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

    print("test statement6")

    print(population)
    print("test statement7")

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
