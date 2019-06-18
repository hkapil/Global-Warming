function buildMetadata(state, fromDate, toDate) {

    var panelDiv = d3.select("#sample-metadata");

    panelDiv.html("");

    var newdiv = panelDiv.append("div");
    var newrow = newdiv.append("p");
    newrow.text(`State: ${state}`)
    var newrow1 = newdiv.append("p");
    newrow1.text(`From Year: ${fromDate}`)
    var newrow2 = newdiv.append("p");
    newrow2.text(`To Year: ${toDate}`)

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
        .property("selected", function(d) {
          return d === "MD";
        });
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
  // .property("value", sample1.Year);

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
    selector2.property("selected", function(d){return d === "1980"});
    // Use the first sample from the list to build the initial plots
    // const firstSample = sample.State[0];
    //const firstSample = sampleNames[0];
    const firstState = "MD";
    const firstfromDate = "1980";
    const firsttoDate = "1990";
    // document.getElementById("selDataset").placeholder = firstState; 
        //const firstSample = sampleNames[0];
    //buildRocAirChart(firstSample);
    buildPolTempChart(firstState, firstfromDate, firsttoDate);
    buildPolPopChart(firstState, firstfromDate, firsttoDate);
    buildPopTempChart(firstState, firstfromDate, firsttoDate);
      //buildRocAirChart(firstSample);
    build3FactorChart(firstState, firstfromDate, firsttoDate);
    buildMetadata(firstState, firstfromDate, firsttoDate);
  });
});
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
