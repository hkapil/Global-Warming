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
  // Grab a reference to the dropdown state select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the state select options
  d3.json("/states").then((data) => {
    console.log(data);
    data.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample.state)
        .attr("value", "MD");
    });

  // Grab a reference to the dropdown date from select element
  var selector1 = d3.select("#selDataset1");

  // Use the list of sample names to populate the state select options
  d3.json("/dates").then((data1) => {
    console.log(data1);
    data1.forEach((sample1) => {
      selector1
        .append("option")
        .text(sample1)
        .property("value", sample1.Year);
    });
  });

  // Grab a reference to the dropdown date from select element
  var selector2 = d3.select("#selDataset2");

  // Use the list of sample names to populate the state select options
  d3.json("/dates").then((data2) => {
    console.log(data2);
    data2.forEach((sample2) => {
      selector2
        .append("option")
        .text(sample2)
        .property("value", sample2.Year);
    });
  });

    // Use the first sample from the list to build the initial plots
    // const firstSample = sample.State[0];
    const firstState = "MD";
    const firstfromDate = "1980";
    const firsttoDate = "1990";
    //const firstSample = sampleNames[0];
    //buildRocAirChart(firstSample);
    buildPolTempChart(firstState, firstfromDate, firsttoDate);
    buildPolPopChart(firstState, firstfromDate, firsttoDate);
    buildPopTempChart(firstState, firstfromDate, firsttoDate);
      //buildRocAirChart(firstSample);
    build3FactorChart(firstState, firstfromDate, firsttoDate);
    buildMetadata(firstState, firstfromDate, firsttoDate);
  });
}

function optionChanged(sample) {
  // Fetch new data each time a new sample is selected
  //buildRocAirChart(newSample);

  var fromDate = document.getElementById("selDataset1").value;
  var toDate = document.getElementById("selDataset2").value;
  var newState = document.getElementById("selDataset").value;
  buildPolTempChart(newState, fromDate, toDate);
  buildPopTempChart(newState, fromDate, toDate);
  buildPolPopChart(newState, fromDate, toDate);
  //buildRocAirChart(newSample);
  build3FactorChart(newState, fromDate, toDate);
  buildMetadata(newState, fromDate, toDate);
}

// Initialize the dashboard
init();
