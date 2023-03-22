// ----- Coding Challenge #1 -----
const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
};

// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string'or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
const displayResults = function (type = 'array') {
  if (type === 'array') {
    console.log(this.answers);
  } else if (type === 'sting') {
    console.log(`Poll results are ${this.answers.join(', ')}`);
  }
}
poll.displayResults = displayResults;

// 1. Create a method called 'registerNewAnswer' on the 'poll' object.
const registerNewAnswer = function () {
  const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}`));

  // validation
  if (!answer) {
    throw new Error('not number');
  }
  if (answer < 0 || answer > 3) {
    throw new Error('not in options');
  }

  this.answers[answer] += 1
  // 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
  this.displayResults('array');
  this.displayResults('sting');
}
poll.registerNewAnswer = registerNewAnswer;

// 2. Call this method whenever the user clicks the "Answer poll" button.
const pollBtn = document.querySelector('.poll');
pollBtn.addEventListener('click', registerNewAnswer.bind(poll));

// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?
const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];
const displayResults2 = displayResults.bind({ answers: [...data1, ...data2] });
displayResults2('array');
displayResults2('string');


// ----- Coding Challenge #2 -----
// 1. Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do not select the h1 element again!
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', () => header.style.color = 'blue');
})();
// 2. And now explain to yourself (or someone around you) why this worked! Take all the time you need. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.
// () => header.style.color = 'blue' 함수가 생성될 때, parent function의 EV인 header가 closure에 저장됨. 따라서, body를 클릭할 때마다 위 callback function이 실행되고 closure에서 header 변수를 찾게 됨