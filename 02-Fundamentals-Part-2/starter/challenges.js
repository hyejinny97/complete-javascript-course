// ----- Coding Challenge #1 -----
// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
// 2. Use the function to calculate the average for both team
const averageDolphins1 = calcAverage(44, 23, 71);
const averageKoalas1 = calcAverage(65, 54, 49);
const averageDolphins2 = calcAverage(85, 54, 41);
const averageKoalas2 = calcAverage(23, 34, 27);
// 3. Create a function 'checkWinner' that takes the average score of each team as parameters('avgDolphins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above.Example: "Koalas win (30 vs. 13)"
const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= avgKoalas * 2) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= avgDolphins * 2) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log('no team wins the trophy')
  }
}
// 4. Use the 'checkWinner' function to determine the winner for both Data 1 and Data 2
// 5. Ignore draws this time
checkWinner(averageDolphins1, averageKoalas1);
checkWinner(averageDolphins2, averageKoalas2);


// ----- Coding Challenge #2 -----
// 1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100
const calcTip = function (bill) {
  if (50 <= bill && bill <= 300) {
    return bill * 0.15
  } else {
    return bill * 0.2
  }
}
console.log(calcTip(100));
// 2. And now let's use arrays! So create an array 'bills' containing the test data below
const bills = [125, 555, 44];
// 3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before
const tips = [
  calcTip(bills[0]),
  calcTip(bills[1]),
  calcTip(bills[2]),
];
console.log(tips);
// 4. Bonus: Create an array 'total' containing the total values, so the bill + tip
const totals = [
  bills[0] + tips[0],
  bills[1] + tips[1],
  bills[2] + tips[2],
];
console.log(totals);


// ----- Coding Challenge #3 -----
// 1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith).
// 2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method
const mark = {
  fullName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2
    return this.BMI
  }
}
const john = {
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2
    return this.BMI
  }
}
// 3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
if (mark.calcBMI() > john.calcBMI()) {
  console.log(`Mark's BMI (${Math.round(mark.BMI * 10) / 10}) is higher than John's (${Math.round(john.BMI * 10) / 10})!`)
} else {
  console.log(`John's BMI (${Math.round(john.BMI * 10) / 10}) is higher than Mark's (${Math.round(mark.BMI * 10) / 10})!`)
}


// ----- Coding Challenge #4 -----
// 1. Create an array 'bills' containing all 10 test bill values
const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// 2. Create empty arrays for the tips and the totals ('tips' and 'totals')
const tips2 = [];
const totals2 = [];
// 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values(bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!
for (let i = 0; i < bills2.length; i++) {
  const tip = calcTip(bills2[i]);
  tips2.push(tip);
  totals2.push(bills2[i] + tip);
}
console.log(tips2);
console.log(totals2);
// 4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a difficult challenge (we haven't done this before)! 
const calcAverage2 = function (arr) {
  let sum_nums = 0;
  for (let i = 0; i < arr.length; i++) {
    sum_nums += arr[i];
  }
  return sum_nums / arr.length;
}
console.log(calcAverage2(totals2));