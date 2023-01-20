// ----- Coding Challenge #1 -----
// 1. Store Mark's and John's mass and height in variables
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;
// 2. Calculate both their BMIs using the formula (you can even implement both versions)
const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;
console.log(BMIMark, BMIJohn);
// 3. Create a Boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.
const markHigherBMI = BMIMark > BMIJohn;
console.log(markHigherBMI);


// ----- Coding Challenge #2 -----
// Use the BMI example from Challenge #1, and the code you already wrote, and improve it.
if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`)
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`)
}


// ----- Coding Challenge #3 -----
// 1. Calculate the average score for each team, using the test data below
let dolphin = (96 + 108 + 89) / 3
let koalas = (88 + 91 + 110) / 3
console.log(dolphin, koalas)
// 2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score)
if (dolphin === koalas) {
  console.log('draw')
} else if (dolphin > koalas) {
  console.log('dolphin win!')
} else {
  console.log('koalas win!')
}
// 3. Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. 
dolphin = (97 + 112 + 101) / 3
koalas = (109 + 95 + 123) / 3
console.log(dolphin, koalas)
if (dolphin === koalas) {
  console.log('draw')
} else if (dolphin > koalas && dolphin >= 100) {
  console.log('dolphin win!')
} else if (dolphin < koalas && koalas >= 100) {
  console.log('koalas win!')
} else {
  console.log('no team wins the trophy')
}
// 4. Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.
dolphin = (97 + 112 + 101) / 3
koalas = (109 + 95 + 106) / 3
console.log(dolphin, koalas)
if (dolphin === koalas && dolphin >= 100 && koalas >= 100) {
  console.log('draw')
} else if (dolphin > koalas && dolphin >= 100) {
  console.log('dolphin win!')
} else if (dolphin < koalas && koalas >= 100) {
  console.log('koalas win!')
} else {
  console.log('no team wins the trophy')
}


// ----- Coding Challenge #4 -----
// 1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for this. It's not allowed to use an if/else statement.
const bill = 430;
const tip = (50 <= bill && bill <= 300) ? bill * 0.15 : bill * 0.2;
// 2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 316.25”
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);