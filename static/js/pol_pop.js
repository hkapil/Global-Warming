function buildPolPopChart(state, fromDate, toDate) {
// @TODO: Use `d3.json` to fetch the sample data for the plots
var defaultURL = "/pol-pop/" + state + "/" + fromDate + "/" + toDate;
d3.json(defaultURL).then(function(data) {

var data = [
  {
    type: 'bar',
    x: data.year,
    y: data.co2,
    base: [-500,-600,-700],
    marker: {
      color: 'red'
    },
    name: 'Pollution'
  },
  {
    type: 'bar',
    x: data.year,
    y: data.population/1000000,
    base: 0,
    marker: {
      color: 'blue'
    },
    name: 'Population'
  }]

Plotly.newPlot("pol_pop", data);
})};