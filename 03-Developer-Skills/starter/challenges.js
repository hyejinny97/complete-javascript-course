// ----- Coding Challenge #1 -----
// 1. Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console. Try it with both test datasets.
// 2. Use the problem-solving framework: Understand the problem and break it up into sub-problems!
const printForecast = function (arr) {
  let answer = ''
  for (let day = 0; day < arr.length; day++) {
    answer += ` ... ${arr[day]}℃ in ${day + 1} days`;
  }
  console.log(answer + ' ...');
}
printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
