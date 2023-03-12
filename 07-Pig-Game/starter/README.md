# ✔ '07-Pig Game' 이론 정리

## ▶ 82. PROJECT #3: Pig Game

- `PROJECT #3: Pig Game`에 대한 설명

  - 주사위를 굴려 나온 수를 합해, 먼저 100에 도달하는 사람이 이기는 게임
  - user가 주사위를 굴리면 1 ~ 6 사이의 랜덤한 수가 뜸
  - 주사위가 1을 제외한 수가 나오는 경우
    - user가 다시 주사위를 굴리면, current score에 나온 수를 더하고 주사위를 다시 돌릴 수 있음
    - user가 hold를 선택하면, current score를 total score에 더하고 다른 user에게 기회가 넘겨감
  - 주사위가 1이 나오는 경우
    - current score가 0이 되고 다른 user에게 기회가 넘겨감

  ![](./pig-game-flowchart.png)

- 먼저, 화면을 초기화해야함

  - user1/user2의 score를 0으로 초기화
  - 주사위가 보이지 않아야 함 (CSS 파일에 hidden 관련 스타일 추가)

  ```js
  const score0El = document.querySelector('#score--0');
  const score1El = document.getElementById('score--1');

  score0El.textContent = 0;
  score1El.textContent = 0;
  ```

  ```js
  const diceEl = document.querySelector('.dice');

  diceEl.classList.add('hidden');
  ```

## ▶ 83. Rolling the Dice

- 'Roll dice' 버튼을 클릭할 때마다 일어나는 일

  - 1 ~ 6 사이의 랜덤 주사위 수 생성하기
  - 해당 주사위를 화면에 나타내기
  - 주사위 수가 1인지 아닌지 체크
    - 주사위 수가 1이 아닌 경우, current score에 수 더하고 화면에 나타내기
    - 주사위 수가 1인 경우, player 바꾸기

  ```js
  const current0El = document.getElementById('current--0');
  const current1El = document.getElementById('current--1');
  const btnRoll = document.querySelector('.btn--roll');

  let currentScore = 0;

  btnRoll.addEventListener('click', function () {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      current0El.textContent = currentScore; // 차후에 수정 필요!
    } else {
      // Switch to next player
    }
  });
  ```

## ▶ 84. Switching the Active Player

- 현재 active player가 누군지 기록하는 변수 만들고, 이전 코드 리팩토링

  ```js
  let activePlayer = 0;

  btnRoll.addEventListener('click', function () {
    ...
    if (dice !== 1) {
      ...
      current0El.textContent = currentScore; // 삭제
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
    }
  });
  ```

- 주사위 수가 1인 경우, player 바꾸기

  - 화면에 현재 active player의 current score를 0으로 나타내기
  - active player를 바꾸기
  - 변수 current score를 0으로 초기화
  - `toggle()`을 사용해 변경한 active player에 'player--active' 클래스를 추가하기

  ```js
  const player0El = document.querySelector('.player--0');
  const player1El = document.querySelector('.player--1');

  btnRoll.addEventListener('click', function () {
    ...
    if (dice !== 1) {
      ...
    } else {
      // Switch to next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  });
  ```

## ▶ 85. Holding Current Score

- 'Hold' 버튼을 누르면, current score를 total score에 더하고 player를 바꿈

  - 'Roll dice' 버튼을 클릭해서 주사위가 1이 나왔을 때 player를 바꾸는 것과 동일한 코드를 사용해서 바꿔줘야 함
  - 따라서, 위 코드에서 player를 바꾸는 코드를 따로 빼서 함수화 해준 후 재사용하기
  - active player의 변수 score에 current score를 더하기
  - active player의 변경된 score를 화면에 나타내기
  - score가 100 이상인지 체크
    - 100 미만인 경우, player 바꾸기
    - 100 이상인 경우, 주사위를 없애고 현재 player에 'player--winner' 클래스를 넣고 'player--active' 클래스는 빼기

  ```js
  const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  };
  ```

  ```js
  btnRoll.addEventListener('click', function () {
    ...
    if (dice !== 1) {
      ...
    } else {
      // Switch to next player
      switchPlayer();
    }
  });
  ```

  ```js
  const btnHold = document.querySelector('.btn--hold');
  let scores = [0, 0];

  btnHold.addEventListener('click', function () {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  });
  ```

- 한 player의 score가 100 이상에 도달하면, 'Roll dice' 버튼과 'Hold' 버튼을 클릭해도 아무런 반응이 일어나지 않도록 해야함

  ```js
  let playing = true;

  btnRoll.addEventListener('click', function () {
    if (playing) {
     ...
    }
  });

  btnHold.addEventListener('click', function () {
    if (playing) {
      if (scores[activePlayer] >= 100) {
        // Finish the game
        playing = false;
        ...
      } else {
        ...
      }
    }
  });
  ```

## ▶ 86. Resetting the Game

- 'New game' 버튼을 누르면 게임을 초기화하자

  - scores, current score, activePlayer, playing 변수 모두 초기화하기
  - 화면에 score와 current score 모두 0으로 변경하기
  - 주사위 없애기
  - 모든 player의 클래스에 'player--winner' 없애기
  - 첫번째 player의 클래스에 'player--active' 추가하고, 두번째 player의 클래스에는 없애기
  - 82번 코드에서 가장 처음 화면을 초기화하기 위해 썼던 코드와 중복되는 부분이 있기 때문에, 초기화하는 코드를 따로 init 함수에 적어 재사용하자
  - 단, 다른 함수에서도 scores, currentScore, activePlayer, playing 변수에 접근이 가능해야하기 때문에, init 함수 밖에서 변수들을 선언을 하되 초기값 할당은 init 함수 안에서 해주자

  ```js
  let scores, currentScore, activePlayer, playing;

  const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  };
  init();

  btnNew.addEventListener('click', init);
  ```
