function buildMetadata(state) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    var defaultURL = "/metadata/" + state;
    //var defaultURL = "/metadata/945";
    metaData = d3.json(defaultURL).then(function(data) {
      var data = data;
      console.log(data);
//    });

    var panelDiv = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panelDiv.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
 //   data.forEach((metadata) => {
      var newdiv = panelDiv.append("div");
     var datavar = Object.entries(data);
     console.log(datavar);
     datavar.forEach(([key, value]) => {
      var newrow = newdiv.append("p");
      newrow.text(`${key}: ${value}`)
      });
   //});
  });
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/states").then((data) => {
    console.log(data);
    data.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample.State);
    });

    // Use the first sample from the list to build the initial plots
    // const firstSample = sample.State[0];
    const firstSample = "MD";
    //buildRocAirChart(firstSample);
    buildPolTempChart(firstSample);
    buildPolPopChart(firstSample);
    buildPopTempChart(firstSample);
      //buildRocAirChart(firstSample);
    build3FactorChart(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  //buildRocAirChart(newSample);
  buildPolTempChart(newSample);
  buildPopTempChart(newSample);
  buildPolPopChart(newSample);
  //buildRocAirChart(newSample);
  build3FactorChart(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
