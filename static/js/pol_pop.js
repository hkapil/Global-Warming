function buildPolPopChart(state, fromDate, toDate) {

// @TODO: Use `d3.json` to fetch the sample data for the plots
var defaultURL = "/pol-pop/" + state + "/" + fromDate + "/" + toDate;
d3.json(defaultURL).then(function(data) {

var data1 = {
    type: 'scatter',
    x: data.year,
    y: data.co2,
    marker: {
      color: 'red'
    },
    name: 'Pollution'
  };

  var data2 = {
    type: 'scatter',
    x: data.year,
    y: data.population/800000,
    marker: {
      color: 'blue'
    },
    name: 'Population'
  };

  var trace = [data1, data2];

  var layout = {        
    xaxis: {            
      nticks: data.year
    }      
  }

Plotly.newPlot("pol_pop", trace, layout);
})};