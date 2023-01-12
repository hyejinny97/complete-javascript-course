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