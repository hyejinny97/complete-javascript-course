// ----- Coding Challenge #1 -----
// 1. Select the element with the 'again' class and attach a click event handler
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

document.querySelector('.again').addEventListener('click', function () {
  // 2. In the handler function, restore initial values of the 'score' and 'secretNumber' variables
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // 3. Restore the initial conditions of the message, number, score and guess input fields
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';

  // 4. Also restore the original background color (#222) and number width (15rem)
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
})