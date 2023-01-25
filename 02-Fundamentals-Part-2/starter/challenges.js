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