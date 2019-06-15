function buildPolPopChart(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots

  var defaultURL = "/population/" + sample;

  d3.json(defaultURL).then(function(data) {



data = [(

      x = data.year,

      y = data.co2,

      base = [-500,-600,-700],

      //marker = dict(

        color = 'red'

      ,

      name = 'Pollution'

  ),

  (

      x = data.year,

      y = data.population,

      base = 0,

      // marker = dict(

        color = 'blue'

      ,

      name = 'Population'

  )

]





// fig = go.Figure(data=data)

// py.iplot(fig, filename='pol_pop')
plotly.plot(data, filename='pol_pop')
  })};