function build3FactorChart(state, fromDate, toDate) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var defaultURL = "/3factor/" + state + "/" + fromDate + "/" + toDate;
    d3.json(defaultURL).then(function(data) {
    
    //Create traces
    trace0 = {
        x : data.year,
        y : data.co2,
        mode : 'lines',
        name : 'lines'
    };
    trace1 = {
        x : data.year,
        y : data.population/1000000,
        mode : 'lines+markers',
        name : 'lines+markers'
    };
    trace2 = {
        x : data.year,
        y : data.temp,
        mode : 'markers',
        name : 'markers'
    };
    
    var data = [trace0, trace1, trace2];
    
    Plotly.newPlot("three_factor", data);

    })};
    