// ----- Coding Challenge #1 -----
const checkDogs = function (dogsJulia, dogsKate) {
  // 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
  const dogsJulia2 = dogsJulia.slice(1, -2)
  // 2. Create an array with both Julia's (corrected) and Kate's data
  const dogs = dogsJulia2.concat(dogsKate)
  // 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy �")
  dogs.forEach(function (dogAge, idx) {
    if (dogAge >= 3) {
      console.log(`"Dog number ${idx + 1} is an adult, and is ${dogAge} years old`);
    } else {
      console.log(`"Dog number ${idx + 1} is still a puppy `);
    }
  })
}

// 4. Run the function for both test datasets
const dogsJulia = [3, 5, 2, 12, 7]
const dogsKate = [4, 1, 15, 8, 3]
checkDogs(dogsJulia, dogsKate)


// ----- Coding Challenge #2 -----
const calcAverageHumanAge = function (ages) {
  // 1. Calculate the dog age in human years using the following formula
  const humanAges = ages.map(function (dogAge) {
    let humanAge;
    if (dogAge <= 2) {
      return humanAge = 2 * dogAge;
    } else {
      return humanAge = 16 + dogAge * 4;
    }
  })

  // 2. Exclude all dogs that are less than 18 human years old
  const humanAgesOver18 = humanAges.filter(function (humanAge) {
    return humanAge >= 18;
  })

  // 3. Calculate the average human age of all adult dogs
  const averageHumanAge = humanAgesOver18.reduce((acc, age) => acc + age, 0) / humanAgesOver18.length;

  return averageHumanAge
}

// 4. Run the function for both test datasets
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// ----- Coding Challenge #3 -----
// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining
const calcAverageHumanAge2 = ages => ages
  .map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
  .filter(humanAge => humanAge >= 18)
  .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));


// ----- Coding Challenge #4 -----
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array.
dogs.forEach(function (dog) {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
})
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
const sarahDog = dogs.find((dog) => dog.owners.includes('Sarah'));
if (sarahDog.curFood < sarahDog.recommendedFood * 0.9) {
  console.log(`Sarah's dog is eating too little.`);
} else if (sarahDog.curFood > sarahDog.recommendedFood * 1.1) {
  console.log(`Sarah's dog is eating too much.`);
}
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommendedFood * 1.1).flatMap(dog => dog.owners)
// const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recommendedFood * 0.9).flatMap(dog => dog.owners)
const { ownersEatTooMuch, ownersEatTooLittle } = dogs.reduce((owners, dog) => {
  if (dog.curFood > dog.recommendedFood * 1.1) {
    owners.ownersEatTooMuch.push(...dog.owners);
  } else if (dog.curFood < dog.recommendedFood * 0.9) {
    owners.ownersEatTooLittle.push(...dog.owners);
  }
  return owners
}, { ownersEatTooMuch: [], ownersEatTooLittle: [] })
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);
// 4. Log a string to the console for each array created in 3.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));
// 6. Log to the console whether there is any dog eating an okay amount of food
console.log(dogs.some(dog => dog.curFood > dog.recommendedFood * 0.9 && dog.curFood < dog.recommendedFood * 1.1));
// 7. Create an array containing the dogs that are eating an okay amount of food.
const okayAmountDogs = dogs.filter(dog => dog.curFood > dog.recommendedFood * 0.9 && dog.curFood < dog.recommendedFood * 1.1);
console.log(okayAmountDogs);
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order.
const orderedDogs = dogs.slice().sort((dog1, dog2) => dog1.recommendedFood - dog2.recommendedFood);
console.log(orderedDogs);