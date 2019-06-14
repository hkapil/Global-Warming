function buildPolTempChart(sample) {



                // @TODO: Use `d3.json` to fetch the sample data for the plots
             
                var defaultURL = "/pollution/" + sample;
             
                d3.json(defaultURL).then(function(data) {
             
             
             
             var data2 = [{
             
                x: data.year,
             
                y: data.co2,
             
                type: 'bar'      }];
             
             
             
             var data1 = [{
             
                x: data.year,
             
                y: data.avgTemp,
             
                type: 'bar'      }];
             
             
             
             
             
             var layout2 = { margin: { t: 30, b: 100 } };
             
             var layout1 = { margin: { t: 30, b: 100 } };
             
             
             
             Plotly.plot('pol_temp', data2, layout2);
             
             Plotly.plot('pol_temp', data1, layout1);
             
             });
             
             }