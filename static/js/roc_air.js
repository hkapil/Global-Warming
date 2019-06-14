function buildRocAirChart(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var defaultURL = "/pollution/" + sample;
    d3.json(defaultURL).then(function(data) {
      
      var data2 = [{
        values: data.year,
        labels: data.co2,
        type: 'pie'
      }];
          
      var layout2 = { margin: { t: 30, b: 100 } };
      //Plotly.plot("bubble", data, layout);
      Plotly.plot("rate_temp_change", data2, layout2);
  
      const xaxis = data.otu_ids;
      const yaxis = data.sample_values;
      const size = data.sample_values;
      console.log(xaxis);
      var trace1 = {
        x: xaxis,
        y: yaxis,
        mode: 'markers',
        marker: {
          size: size,
          color:data.otu_ids,
          colorscale:'Earth'
        }
  
      };
      
      var data1 = [trace1];
      console.log(data1);
      
      var layout1 = {
        title: 'Marker Size',
        showlegend: false
      };
      
      Plotly.plot('roc_air', data1, layout1);
      Plotly.plot('roc_industry', data1, layout1);
      Plotly.plot('roc_population', data1, layout1);
      
      // @TODO: Build a Bubble Chart using the sample data
      // d3.json(defaultURL).then(function(data) {
      //   var data = [data];
      //   var layout = { margin: { t: 30, b: 100 } };
      //   Plotly.plot("pie", data, layout);
      });
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
  }