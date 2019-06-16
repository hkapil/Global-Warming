function build3FactorChart(state, fromDate, toDate) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var defaultURL = "/3factor/" + state + "/" + fromDate + "/" + toDate;
    d3.json(defaultURL).then(function(data) {
 
    

    //Create traces

    trace0 = {

        x : data.Year,

        y : data.co2,

        mode : 'lines',

        name : 'Pollution'

    };

    trace1 = {

        x : data.Year,

        y : data.population/1000000,

        mode : 'lines+markers',

        name : 'Population'

    };

    trace2 = {

        x : data.Year,

        y : data.temp,

        mode : 'markers',

        name : 'Temperature'

    };

    

    var layout = {

        xaxis: {

            nticks: data.Year.length    

        }

      }



    var data = [trace0, trace1, trace2];

    



    Plotly.newPlot("three_factor", data, layout);


    })};