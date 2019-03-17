


/*
  Util Methods
*/

const fs = require('fs');
const path = require('path');
const os = require('os');

var random_name = require('node-random-name');



function buildCSV(outFile, data) {

  // output file in the same folder
  const filename = path.join(__dirname, outFile);
  const output = []; // holds all rows of data

  data.forEach((d) => {
    const row = []; // a new array for each row of data
    for(var i in d) row.push(d[i]);  //add all elements into array in order, NB: make sure json is structured
    output.push(row.join()); // by default, join() uses a ','
  });

  fs.writeFileSync(filename, output.join(os.EOL));

}

/*
function generateNameTest() {  
  console.log(random_name()); // -> "Brittny Kraska"
  console.log(random_name({ first: true, gender: "male" })); // -> "Jean"
  console.log(random_name({ last: true })); // -> "Kinsel"
  console.log(random_name({ seed: 'Based on this' })); // -> "Garrett Scheets"
  console.log(random_name({ random: Math.random, female: true })); // -> "Jo"
}
*/

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function getRandomExcluding(max, excludeList=[]){ 
  let retVal = getRandomInt(max);
  //todo:change exclude list of set to pre duplicates
  if(excludeList.length < max){
    while(excludeList.includes(retVal)){
      retVal = getRandomInt(max);
    }
  }
  return retVal;
}

function getRandomItemFromList(dataList){
  return dataList[getRandomInt(dataList.length)];
}

function getRandomItemFromListExcluding(dataList, excludedList=[]){
  let retVal = getRandomItemFromList(dataList);
  if(excludedList.length < dataList.length){
    while(excludedList.includes(retVal)){
      retVal = getRandomItemFromList(dataList);
    }
  }
  return retVal;
}

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



/*
  Main functions
*/


/*
What are the data we need to generate?
assume they are all students of the same year sem and degree
https://www.handbook.unsw.edu.au/undergraduate/programs/2019/3778
https://www.handbook.unsw.edu.au/undergraduate/specialisations/2019/COMPA1
Computer Science

student list
{
  studid: 1,
  firstname: jack,
  lastname: chen
}

student preference list
{
  stuid: 1,
  favcolour: blue,
  subj1: COMP1511,
  subj2: COMP1531,
  subj3: COM2521,


} 

*/



const colourSelectionList = ['red', 'green', 'blue', 'yellow', 'orange','pink'];
const compSubjectSelection = {
  COMP1511: 'Programming Fundamentals',
  COMP1521: 'Computer System Fundamental',
  COMP1531: 'Software Engineering Fundamentals',
  COMP2511: 'Object-Oriented Design & Programming',
  COMP2521: 'Data Structures and Algorithms',
  //TODO: add more subjects
};
const compSubjectSelectionList = Object.keys(compSubjectSelection);

//https://www.business.unsw.edu.au/degrees-courses/undergraduate/bachelor/commerce-bcom?utm_source=ADM&?utm_medium=CPC&?utm_medium=CPC&?utm_campaign=BAU&?utm_content=Commerce%20-%20UG%20-%20Brand&ppc=1&gclid=CjwKCAjwvbLkBRBbEiwAChbckTFwR_380PPV1kW0ZZ3k5V1GCXaUrTcoyWq2jXBG4fiS0Gwim1MP3xoCEikQAvD_BwE#Structure
const freeElectivesSelection = {
  ACCT1501: "Accounting and Financial Managment 1A",
  ACCT1511: "Accounting and Financial Managment 1B",
  ECON1101: "Microeconimics 1",
  ECON1102: "Macroeconomics 1",
  FINS1613: "Business Finance",
  ECON1203: "Business and Economic Statistics",
  //TODO: add more subjects
}
const freeElectivesSelectionList = Object.keys(freeElectivesSelection);


//get random data
//console.log(getRandomItemFromList(compSubjectSelectionList));
//TODO: create a method to use set to get a unique list of subjects, up to 3









/*
  Data Generation
*/


//generate a list of students



const amtStudent = 50;

let studData = [];
for (i = 0; i < amtStudent; i++) {  
  let _item = {
    stuid: i,
    firstname: random_name({ random: Math.random, first: true }),
    lastname: random_name({ random: Math.random, last: true }),
    favcolor: colourSelectionList[getRandomInt(colourSelectionList.length)],
    openness: getRandomInt(10)+1,
    conscientiousness: getRandomInt(10)+1,
    extraversion: getRandomInt(10)+1,
    agreeableness: getRandomInt(10)+1,
    neuroticism: getRandomInt(10)+1,
  }

  //set subjects
  let subj1 = getRandomItemFromList(compSubjectSelectionList);
  let subj2 = getRandomItemFromList(compSubjectSelectionList, [subj1]);
  let subj3 = getRandomItemFromList(compSubjectSelectionList, [subj1, subj2]);
  _item["subj1"] = subj1;
  _item["subj2"] = subj2;
  _item["subj3"] = subj3;

  _item["electives"] = getRandomItemFromList(freeElectivesSelectionList);

  //console.log("subjects", subj1, subj2, subj3);
  studData.push(_item);
}
//console.log(studData);
buildCSV('studentData.csv', studData);



let prefData = [];
for (i = 0; i < amtStudent; i++) {  
  let listOfPref = getRandomInt(5);
  let alreadyPrefIds = [];  //list of preference ids already given
  for (j = 0; j < listOfPref; j++) {  
    let prefStudid = getRandomExcluding(studData.length, alreadyPrefIds);
    alreadyPrefIds.push(prefStudid);
    let _item = {
      stuid: i,
      prefStuid: prefStudid, 
      rating: getRandomInt(10)
    }
    prefData.push(_item);
  }
}

buildCSV('studentPref.csv', prefData);












