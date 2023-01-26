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
