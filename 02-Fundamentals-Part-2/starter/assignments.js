const country = 'korea';
const continent = 'asia';
const capitalCity = 'seoul';
const population = 50;
const isIsland = false;
const language = 'korean';

// ----- LECTURE: Functions -----
// 1. Write a function called 'describeCountry' which takes three parameters: 'country', 'population' and 'capitalCity'. Based on this input, the function returns a string with this format: 'Finland has 6 million people and its capital city is Helsinki'
function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}.`
}
// 2. Call this function 3 times, with input data for 3 different countries. Store the returned values in 3 different variables, and log them to the console
console.log(describeCountry(country, population, capitalCity));


// ----- LECTURE: Function Declarations vs. Expressions -----
// 1. The world population is 7900 million people. Create a function declaration called 'percentageOfWorld1' which receives a 'population' value, and returns the percentage of the world population that the given population represents.For example, China has 1441 million people, so it's about 18.2% of the world population
// 2. To calculate the percentage, divide the given 'population' value by 7900 and then multiply by 100
// 3. Call 'percentageOfWorld1' for 3 populations of countries of your choice, store the results into variables, and log them to the console
function percentageOfWorld1(population) {
  return `${Math.floor(population / 7900 * 100 * 10) / 10}%`
}
console.log(percentageOfWorld1(1441));
// 4. Create a function expression which does the exact same thing, called 'percentageOfWorld2', and also call it with 3 country populations (can be   the same populations)
const percentageOfWorld2 = function (population) {
  return `${Math.floor(population / 7900 * 100 * 10) / 10}%`
}
console.log(percentageOfWorld2(1441));


// ----- LECTURE: Arrow Functions -----
// 1. Recreate the last assignment, but this time create an arrow function called 'percentageOfWorld3'
const percentageOfWorld3 = population => `${Math.floor(population / 7900 * 100 * 10) / 10}%`;
console.log(percentageOfWorld3(1441));


// ----- LECTURE: Arrow Functions -----
// 1. Create a function called 'describePopulation'. Use the function type you like the most. This function takes in two arguments: 'country' and 'population', and returns a string like this: 'China has 1441 million people, which is about 18.2% of the world.'
// 2. To calculate the percentage, 'describePopulation' call the 'percentageOfWorld1' you created earlier
// 3. Call 'describePopulation' with data for 3 countries of your choice
const describePopulation = function (country, population) {
  return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)} of the world.`
}
console.log(describePopulation(country, population))


// ----- LECTURE: Introduction to Arrays -----
// 1. Create an array containing 4 population values of 4 countries of your choice. You may use the values you have been using previously. Store this array into a variable called 'populations'
const populations = [1000, 40, 22, 76];
// 2. Log to the console whether the array has 4 elements or not (true or false)
console.log(populations.length === 4)
// 3. Create an array called 'percentages' containing the percentages of the world population for these 4 population values. Use the function 'percentageOfWorld1' that you created earlier to compute the 4 percentage values
const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3])
];
console.log(percentages)


// ----- LECTURE: Basic Array Operations (Methods) -----
// 1. Create an array containing all the neighbouring countries of a country of your choice. Choose a country which has at least 2 or 3 neighbours. Store the array into a variable called 'neighbours'
const neighbors = ['Japan', 'China', 'Russia', 'North Korea', 'Mongolia'];
// 2. At some point, a new country called 'Utopia' is created in the neighbourhood of your selected country. So add it to the end of the 'neighbours' array
neighbors.push('Utopia');
console.log(neighbors);
// 3. Unfortunately, after some time, the new country is dissolved. So remove it from the end of the array
neighbors.pop();
console.log(neighbors);
// 4. If the 'neighbours' array does not include the country ‘Germany’, log to the console: 'Probably not a central European country :D'
if (!neighbors.includes('Germany')) {
  console.log('Probably not a central European country :D');
}
// 5. Change the name of one of your neighbouring countries. To do that, find the index of the country in the 'neighbours' array, and then use that index to change the array at that index position.For example, you can search for 'Sweden' in the array, and then replace it with 'Republic of Sweden'.
const idx = neighbors.indexOf('Russia');
neighbors[idx] = 'Republic of Russia';
console.log(neighbors);


// ----- LECTURE: Introduction to Objects -----
// 1. Create an object called 'myCountry' for a country of your choice, containing properties 'country', 'capital', 'language', 'population' and 'neighbours'(an array like we used in previous assignments)
// const myCountry = {
//   'country': 'korea',
//   'capital': 'seoul',
//   'language': 'korean',
//   'population': 50,
//   'neighbors': ['Japan', 'China', 'Russia', 'North Korea', 'Mongolia']
// };


// ----- LECTURE: Dot vs. Bracket Notation -----
// 1. Using the object from the previous assignment, log a string like this to the console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries and a capital called Helsinki.'
// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighboring countries and a capital called ${myCountry.capital}.`);
// 2. Increase the country's population by two million using dot notation, and then decrease it by two million using brackets notation.
// myCountry.population -= 2;
// console.log(myCountry.population);
// myCountry['population'] += 2;
// console.log(myCountry.population);


// ----- LECTURE: Object Methods -----
// 1. Add a method called 'describe' to the 'myCountry' object. This method will log a string to the console, similar to the string logged in the previous assignment, but this time using the 'this' keyword.
// 2. Call the 'describe' method.
// 3. Add a method called 'checkIsland' to the 'myCountry' object. This method will set a new property on the object, called 'isIsland'. 'isIsland' will be true if there are no neighboring countries, and false if there are. Use the ternary operator to set the property.
const myCountry = {
  'country': 'korea',
  'capital': 'seoul',
  'language': 'korean',
  'population': 50,
  'neighbors': ['Japan', 'China', 'Russia', 'North Korea', 'Mongolia'],
  'describe': function () {
    console.log(
      `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbors.length} neighboring countries and a capital called ${this.capital}.`
    );
  },
  'checkIsland': function () {
    this.isIsland = this.neighbors.length === 0 ? true : false;
    return this.isIsland;
  }
};

myCountry.describe();
console.log(myCountry.checkIsland());
console.log(myCountry.isIsland);


// ----- LECTURE: Iteration: The for Loop -----
// 1. There are elections in your country! In a small town, there are only 50 voters. Use a for loop to simulate the 50 people voting, by logging a string like this to the console (for numbers 1 to 50): 'Voter number 1 is currently voting'
for (let num = 1; num <= 50; num++) {
  console.log(`Voter number ${num} is currently voting`);
}


// ----- LECTURE: Looping Arrays, Breaking and Continuing -----
// 1. Let's bring back the 'populations' array from a previous assignment
// 2. Use a for loop to compute an array called 'percentages2' containing the percentages of the world population for the 4 population values. Use the function 'percentageOfWorld1' that you created earlier
const percentages2 = [];
for (let i = 0; i < 4; i++) {
  percentages2.push(percentageOfWorld1(populations[i]));
}
// 3. Confirm that 'percentages2' contains exactly the same values as the 'percentages' array that we created manually in the previous assignment, and reflect on how much better this solution is
console.log(percentages2);


// ----- LECTURE: Looping Backwards and Loops in Loops -----
// 1. Store this array of arrays into a variable called 'listOfNeighbours'[['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
// 2. Log only the neighbouring countries to the console, one by one, not the entire arrays. Log a string like 'Neighbour: Canada' for each country
for (let i = 0; i < listOfNeighbours.length; i++) {
  for (let j = 0; j < listOfNeighbours[i].length; j++) {
    console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
  }
}


// ----- LECTURE: The while Loop -----
// 1. Recreate the challenge from the lecture 'Looping Arrays, Breaking and Continuing', but this time using a while loop (call the array 'percentages3')
const percentages3 = [];
let i = 0;
while (i < 4) {
  percentages3.push(percentageOfWorld1(populations[i]));
  i++
}
console.log(percentages3)