// ----- Coding Challenge #1 -----
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
    'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// 1. Create one player array for each team (variables 'players1' and 'players2')
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
const printGoals = function (...names) {
  console.log(`${names.length} goals were scored`);
}
const playerNames = ['Davies', 'Muller', 'Lewandowski', 'Kimmich'];
printGoals(...playerNames);
printGoals(...game.scored);
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.
console.log((team1 < team2 && 'team1') || 'team2');


// ----- Coding Challenge #2 -----
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
for (const [idx, player] of game.scored.entries()) {
  console.log(`Goal ${idx + 1}: ${player}`);
}
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
let sum_odd = 0;
for (const value of Object.values(game.odds)) {
  sum_odd += value;
}
console.log(sum_odd / 3);
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
for (const [key, value] of Object.entries(game.odds)) {
  console.log(`Odd of ${game[key] ? `victory ${game[key]}` : 'draw'}: ${value}`);
}
// 4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
const scorers = {};
for (const player of game.scored) {
  scorers[player] = scorers[player] ?? 0;
  scorers[player] += 1;
}
console.log(scorers);


// ----- Coding Challenge #3 -----
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);
// 1. Create an array 'events' of the different game events that happened (no duplicates)
const events = [...new Set(gameEvents.values())];
console.log(events);
// 2. After the game has finished, it was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);
console.log(gameEvents);
// 3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);
// 4. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this: [FIRST HALF] 17: ⚽ GOAL
for (const [min, event] of gameEvents) {
  const eventStr = `[${min <= 45 ? 'FIRST HALF' : 'second half'}] ${min}: ${event}`
  console.log(eventStr);
}


// ----- Coding Challenge #4 -----
const conversion = function (texts) {
  // name lists를 하나씩 분리
  const text_arr = texts.split('\n');

  // underscore_case를 camelCase로 전환
  for (let i = 0; i < text_arr.length; i++) {
    const text = text_arr[i];
    const subText = text.trim().toLowerCase().split('_');
    const newText = [subText[0]];
    for (let j = 1; j < subText.length; j++) {
      newText.push(subText[j][0].toUpperCase() + subText[j].slice(1));
    }
    console.log(newText.join('').padEnd(20, ' ') + '✅'.repeat(i + 1));
  }
}

// document.body.append(document.createElement('textarea'))
// document.body.append(document.createElement('button'))

// const btn = document.querySelector('button');

// btn.addEventListener('click', function () {
//   const texts = document.querySelector('textarea').value;
//   console.log(texts);
//   conversion(texts);
// });


// String Methods Practice
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flights_arr = flights.split('+');

for (const flight of flights_arr) {
  const [state, from, to, time] = flight.split(';');
  const output = [];

  // 1) 출발, 도착 등 상태
  output.push(`${(state.split('_')[1] === 'Delayed' && '🔴') || ''}${state.replace(/_/g, ' ')}`);

  // 2) from-to
  output.push(`from ${from.slice(0, 3).toUpperCase()} to ${to.slice(0, 3).toUpperCase()}`);

  // 3) time
  output.push(`(${time.replace(':', 'h')})`);

  console.log(output.join(' ').padStart(44));
} 