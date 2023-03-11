# ✔ '05-Guess-My-Number' 이론 정리

## ▶ 70. PROJECT #1: Guess My Number!

- `PROJECT #1: Guess My Number`에 대한 설명
  - 1 ~ 20까지의 수가 랜덤으로 주어지고, 입력란에 추측한 수를 넣을 수 있음
  - 목표한 수가 예상한 수보다 높으면 'too low'라는 텍스트가 뜨고, score가 1점 감소됨
  - 목표한 수가 예상한 수보다 낮으면 'too high'라는 텍스트가 뜨고, score가 1점 감소됨
  - 목표한 수를 맞추면 'correct number'라는 텍스트가 뜨고, 현재 score가 Highscore보다 높으면 기록됨
  - Again 버튼을 누르면 게임을 다시 시작할 수 있음
- JS에서 특정 요소를 가지고 오려면 `document.querySelector()`을 사용하면 됨

  - CSS Selector 방식과 동일하게 괄호 안에 class나 id명을 기입하면 됨

    ```js
    document.querySelector('.message'); // <p class="message">Start guessing...</p>
    ```

  - `textContent`를 사용하면 요소 안에 적은 text를 가지고 올 수 있음

    ```js
    document.querySelector('.message').textContent; // Start guessing...
    ```

## ▶ 71. What's the DOM and DOM Manipulation

- DOM (Document Object Model)

  - HTML document의 구조적 표현
  - JS는 HTML 요소에 접근할 수 있고 text, attributes, CSS styles 을 바꿀 수 있음
  - HTML 로드 시, 브라우저에 의해 Tree structure가 생성됨

- DOM Tree Structure

  - DOM 진입점에 document object가 있음

  ```
  Document
      ↳ Element <html>
            ↳ Element <head>
                  ↳ Element <title>
                        ↳ Text 'A Simple Page'
            ↳ Element <body>
                  ↳ Element <p>
                        ↳ Text 'A paragraph...'
                        ↳ Element <a>
                              ↳ Text 'link'
  ```

- DOM 조작을 위해 사용되는 DOM methods나 properties는 JS의 일부가 아님
  - DOM methods나 properties는 WEB API 중 하나로서, JS와 상호작용하는 것일 뿐!
  - 이외 WEB API 예) Timers, Fetch

## ▶ 72. Selecting and Manipulating Elements

- p, div, span 태그의 text 변경하기

  - `textContent` 사용

  ```js
  document.querySelector('.message').textContent = '🎉 Correct Number!';
  document.querySelector('.number').textContent = 13;
  document.querySelector('.score').textContent = 10;
  ```

- input 태그의 입력값 변경하기

  - `value` 사용

  ```js
  document.querySelector('.guess').value = 23;
  ```

## ▶ 73. Handling Click Events

- check 버튼을 클릭했을 때 특정 코드를 실행하도록 해보자
- 일단, `querySelector()`를 사용해 해당 이벤트가 일어나는 elements를 가지고 와야함
- `addEventLister()`를 사용하면 Events(클릭 등) 처리 가능

  - 첫 번째 인자: event 종류
  - 두 번째 인자: event가 발생했을 때 실행되는 함수 (Event Handler)

  ```
  element.addEventListener(Event Type, Event Handler);
  ```

- input 란에 아무 숫자도 입력하지 않은 상태로 check 버튼을 눌렀을 경우, 'No number' 메시지가 뜨게 하자

  ```js
  document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);

    if (!guess) {
      document.querySelector('.message').textContent = '⛔️ No number!';
    }
  });
  ```

## ▶ 74. Implementing the Game Logic

- random한 secret number를 만들자

  ```js
  let secretNumber = Math.trunc(Math.random() * 20) + 1;
  ```

- 입력한 값와 secret number를 비교해, 상황에 따라 메시지를 띄워야 함

  - 입력한 값이 secret number와 같으면, 'Correct Number' 메시지를 띄우자
  - 입력한 값이 secret number보다 크면, 'Too high' 메시지를 띄우자
  - 입력한 값이 secret number보다 작으면, 'Too low' 메시지를 띄우자

- 입력한 값이 secret number와 같지 않을 때, score를 1씩 감소시켜야 함

  - DOM에서 score를 읽어와 1씩 감소시키는 방법보단, js 파일 내에서 score 변수를 두고 DOM score 위치에 나타나게 하는 것이 더 나은 방법임
  - 만약 score가 0일 경우, 이후에 아무리 check 버튼을 클릭해도 score는 0으로 고정시키고 'You lost the game' 메시지를 띄우자

  ```js
  let score = 20;

  document.querySelector('.check').addEventListener('click', function () {
    ...
    if (!guess) {
      ...
    } else if (guess === secretNumber) {
      document.querySelector('.message').textContent = '🎉 Correct Number!';
    } else if (guess > secretNumber) {
      if (score > 1) {
        document.querySelector('.message').textContent = '📈 Too high!';
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        document.querySelector('.message').textContent = '💥 You lost the game!';
        document.querySelector('.score').textContent = 0;
      }
    } else if (guess < secretNumber) {
      if (score > 1) {
        document.querySelector('.message').textContent = '📉 Too low!';
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        document.querySelector('.message').textContent = '💥 You lost the game!';
        document.querySelector('.score').textContent = 0;
      }
    }
  });
  ```

## ▶ 75. Manipulating CSS Styles

- JS에서 DOM 조작으로 CSS styling하려면 `style` method를 이용하면 됨

  - css 속성명을 작성할 때, 반드시 캐멀 케이스로 작성해야 함
  - 스타일은 반드시 string으로 작성해야 함

  ```
  element.style.[css 속성명] = [스타일]
  ```

- 입력한 값이 secret number와 같을 때, 스타일링을 바꿔줘야 하고, secret number를 보여줘야 함

  - body의 배경색을 초록색으로 바꾸고 number 박스의 너비를 길게 스타일링하자

  ```js
  document.querySelector('.check').addEventListener('click', function () {
    ...
    if (!guess) {
      ...
    } else if (guess === secretNumber) {
      ...
      document.querySelector('.number').textContent = secretNumber;

      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

    } else if (guess > secretNumber) {
      ...
    } else if (guess < secretNumber) {
     ...
    }
  });
  ```

## ▶ 76. Coding Challenge #1

- again 버튼을 클릭했을 때, 초기화해야 함
  - score, secret number 초기화
  - number, input, score, message 모두 초기화
  - body와 number 박스의 스타일링 초기화

## ▶ 77. Implementing Highscores

- 입력한 값이 secret number와 같을 때, score와 highscore을 비교해서 score가 더 크다면 갱신해주자

  ```js
  let highscore = 0;

  document.querySelector('.check').addEventListener('click', function () {
    ...
    if (!guess) {
      ...
    } else if (guess === secretNumber) {
      ...
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    } else if (guess > secretNumber) {
      ...
    } else if (guess < secretNumber) {
     ...
    }
  });
  ```

## ▶ 78. Refactoring Our Code: The DRY Principle

- 중복된 것을 없애주기 위해 refactoring하자
- 입력된 값이 secret number보다 크거나 작을 때, message 이외의 동일한 코드가 반복됨

  - 둘을 묶어 입력된 값이 secret number와 다를 때로 정의하고, 삼항 연산자를 사용해 서로 다른 message가 나타나게끔 하자

  ```js
  document.querySelector('.check').addEventListener('click', function () {
    ...
    if (!guess) {
      ...
    } else if (guess === secretNumber) {
      ...
    } else if (guess !== secretNumber) {
      if (score > 1) {
        document.querySelector('.message').textContent = guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        document.querySelector('.message').textContent = '💥 You lost the game!';
        document.querySelector('.score').textContent = 0;
      }
    }
  });
  ```

- function을 사용하면 더 유지보수가 쉬운 코드가 될 수 있음

  - message의 text를 변경하는 코드가 중복되니, 함수화해보자

  ```js
  const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
  };

  document.querySelector('.check').addEventListener('click', function () {
    ...
    if (!guess) {
      displayMessage('⛔️ No number!');
    } else if (guess === secretNumber) {
      displayMessage('🎉 Correct Number!');
      ...
    } else if (guess !== secretNumber) {
      if (score > 1) {
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        displayMessage('💥 You lost the game!');
        document.querySelector('.score').textContent = 0;
      }
    }
  });

  document.querySelector('.again').addEventListener('click', function () {
    ...
    displayMessage('Start guessing...');
    ...
  });
  ```
