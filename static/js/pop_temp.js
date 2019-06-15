function buildPopTempChart(sample) {



  // @TODO: Use `d3.json` to fetch the sample data for the plots

  var defaultURL = "/pop-temp/" + sample;

  d3.json(defaultURL).then(function(data) {





var trace1 = {

  x: data.year,

  y: data.avgTemp,

  text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],

  mode: 'markers',

  marker: {

    size: [400, 600, 800, 1000],

    sizemode: 'area'

  }

};



var trace2 = {

  x: data.year,

  y: data.population,

  text: ['A</br>size: 40</br>sixeref: 0.2', 'B</br>size: 60</br>sixeref: 0.2', 'C</br>size: 80</br>sixeref: 0.2', 'D</br>size: 100</br>sixeref: 0.2'],

  mode: 'markers',

  marker: {

    size: [400, 600, 800, 1000],

    //setting 'sizeref' to lower than 1 decreases the rendered size

    sizeref: 2,

    sizemode: 'area'

  }

};



var data = [trace1, trace2];



var layout = {

  title: 'Temperature vs Population',

  showlegend: false,

  height: 600,

  width: 600

};



Plotly.newPlot('pop_temp', data, layout);

})};