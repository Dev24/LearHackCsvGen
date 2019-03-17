

function buildCSV() {

    const fs = require('fs');
    const path = require('path');
    const os = require('os');
    
    // output file in the same folder
    const filename = path.join(__dirname, 'output.csv');
    const output = []; // holds all rows of data
    
    // example JSON data
    const data = [
      {
        state: 'Maryland',
        capital: 'Annapolis',
        population: 38394
      },
      {
        state: 'New York',
        capital: 'Albany',
        population: 97856
      },
      {
        state: 'New Mexico',
        capital: 'Santa Fe',
        population: 75764
      },
    ];
    
    data.forEach((d) => {
      const row = []; // a new array for each row of data
      row.push(d.state);
      row.push(d.capital);
      row.push(d.population);
    
      output.push(row.join()); // by default, join() uses a ','
    });
    
    fs.writeFileSync(filename, output.join(os.EOL));
    
    }
    
    
    
    function generateName() {
        var random_name = require('node-random-name');
        console.log(random_name()); // -> "Brittny Kraska"
        console.log(random_name({ first: true, gender: "male" })); // -> "Jean"
        console.log(random_name({ last: true })); // -> "Kinsel"
        console.log(random_name({ seed: 'Based on this' })); // -> "Garrett Scheets"
        console.log(random_name({ random: Math.random, female: true })); // -> "Jo"
    }
    