function buildPolTempChart(state, fromDate, toDate) {



                // @TODO: Use `d3.json` to fetch the sample data for the plots
             
                var defaultURL = "/pol-temp/" + state + "/" + fromDate + "/" + toDate;
             
                d3.json(defaultURL).then(function(data) {
             
             
             
             var data2 = {
             
                x: data.Year,
             
                y: data.co2,
             
                type: 'bar',  

                name : 'Pollution'
                   
               };
             
             
             
             var data1 = {
             
                x: data.Year,
             
                y: data.avgTemp,
             
                type: 'bar',
                
                name : 'Temperature'
               
               };
             
             var trace = [data2, data1]
             
             var layout = {

               xaxis: {
       
                   nticks: data.Year   
       
               }
       
             }

             Plotly.newPlot('pol_temp', trace, layout);
             
             });
             
             }