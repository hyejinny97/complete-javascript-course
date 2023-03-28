# ✔ '11-Arrays-Bankist' 이론 정리

## ▶ 142. Simple Array Methods

### 🔹 `slice` method

```js
arr명.slice([begin[, end]])
```

- array의 begin부터 (end - 1)까지 복사

  - `begin`: 추출 시작점에 대한 인덱스
  - `end`: 추출을 종료 할 인덱스

- 반환값: 추출한 요소를 포함한 새로운 배열

  - 원본 array는 변하지 x

  ```js
  let arr = ['a', 'b', 'c', 'd', 'e'];

  console.log(arr.slice(2)); // ['c', 'd', 'e']
  console.log(arr.slice(2, 4)); // ['c', 'd']
  console.log(arr.slice(-2)); // ['d', 'e']
  console.log(arr.slice(1, -2)); // ['b', 'c']
  ```

- 인자를 넣지 않으면 전체 elements를 복사해 반환 (얕은 복사)

  - `[...arr]`와 동일 기능

  ```js
  console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e']
  ```

### 🔹 `splice` method

```js
arr명.slice(start[, deleteCount[, item1[, item2[, ...]]]])
```

- 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가

  - `start`: 배열의 변경을 시작할 인덱스
  - `deleteCount`: 배열에서 제거할 요소의 수, 값을 생략하면 start부터 모든 요소를 제거
  - `item1, item2`: 배열에 추가할 요소

- 반환값: 제거한 요소를 담은 배열

  - 원본 array가 바뀜 (mutate)

  ```js
  arr.splice(-1);
  console.log(arr); // ['a', 'b', 'c', 'd']

  arr.splice(1, 2);
  console.log(arr); // ['a', 'd']
  ```

### 🔹 `reverse` method

```js
arr명.reverse();
```

- 배열의 순서를 반전

- 반환값: 순서가 반전된 배열

  - 원본 array가 바뀜 (mutate)

  ```js
  arr = ['a', 'b', 'c', 'd', 'e'];

  console.log(arr.reverse()); // ['e', 'd', 'c', 'b', 'a']
  console.log(arr); // ['e', 'd', 'c', 'b', 'a']
  ```

### 🔹 `concat` method

```js
array명.concat([value1[, value2[, ...[, valueN]]]])
```

- 인자로 주어진 배열이나 값들을 기존 배열에 합침

- 반환값: 추가된 새로운 배열

  - 원본 array는 변하지 x
  - `[...arr, ...arr2]`와 동일 기능

  ```js
  const arr2 = ['j', 'i', 'h', 'g', 'f'];
  const letters = arr.concat(arr2);

  console.log(letters); // ['e', 'd', 'c', 'b', 'a', 'j', 'i', 'h', 'g', 'f']
  ```

### 🔹 `join` method

```js
array명.join([separator]);
```

- 배열의 모든 요소를 연결해 하나의 문자열 생성

  - `separator`: 배열의 각 요소를 구분할 문자열, 생략하면 배열의 요소들이 쉼표로 구분

- 반환값: 배열의 모든 요소들을 연결한 하나의 문자열을 반환

  - 원본 array는 변하지 x

  ```js
  console.log(letters.join(' - '));
  // e - d - c - b - a - j - i - h - g - f
  ```

## ▶ 143. The new at Method

### 🔹 `at` method

```js
array명.at(index);
```

- ES2022에 도입된 문법
- 배열에서 해당 값에 해당하는 인덱스의 요소를 반환

  - `index`: 배열에서 반환할 요소의 인덱스 (음수 값을 지정할 경우 배열의 마지막을 기준으로 한 인덱스)

- 반환값: 주어진 인덱스에 위치한 배열 요소

  - 주어진 인덱스가 배열에 없으면 undefined를 반환
  - bracket notation `[]`과 유사한 기능

  ```js
  const arr = [23, 11, 64];

  console.log(arr.at(0)); // 23
  ```

- 배열 내 마지막 요소를 반환할 때 용이

  ```js
  // 방법1) bracket notation
  console.log(arr[arr.length - 1]); // 64
  ```

  ```js
  // 방법2) slice method
  console.log(arr.slice(-1)[0]); // 64
  ```

  ```js
  // 방법3) at method
  console.log(arr.at(-1)); // 64
  ```

- string type도 `at` method 존재

  ```js
  console.log('jonas'.at(0)); // 'j'
  console.log('jonas'.at(-1)); // 's'
  ```

## ▶ 144. Looping Arrays: forEach

### 🔹 `forEach` method (for Array)

```js
array명.forEach(callback(currentvalue[, index[, array]])[, thisArg]);
```

- callback function을 배열 요소 각각에 대해 실행

  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: forEach()를 호출한 배열
  - `thisArg`: callback을 실행할 때 this로 사용할 값

  ```js
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  // 방법1) for-of loop
  for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
      console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    }
  }
  ```

  ```js
  // 방법2) forEach method
  movements.forEach(function (mov, i, arr) {
    if (mov > 0) {
      console.log(`Movement ${i + 1}: You deposited ${mov}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
  });
  ```

- for-of loop와 유사한 기능
  - 차이점: forEach method를 사용하면 continue나 break 키워드를 사용해 loop 흐름을 통제할 순 없음

## ▶ 145. forEach With Maps and Sets

- forEach method는 array뿐만 아니라 Map과 Set에도 존재

### 🔹 `forEach` method (for Map)

```js
Map명.forEach(callback(currentvalue[, key[, map]])[, thisArg]);
```

- 삽입 순서에 따라 callback function을 Map 객체의 각 키/값 쌍에 실행

  - `currentValue`: 처리할 현재 value
  - `key`: 처리할 현재 key
  - `map`: forEach()를 호출한 map
  - `thisArg`: callback을 실행할 때 this로 사용할 값

  ```js
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);

  currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
  });
  // USD: United States dollar
  // EUR: Euro
  // GBP: Pound sterling
  ```

### 🔹 `forEach` method (for Set)

```js
Set명.forEach(callback(value[, value[, set]])[, thisArg]);
```

- callback function을 Set의 각 요소에 실행

  - `value`: 처리할 현재 value
  - `set`: forEach()를 호출한 set
  - `thisArg`: callback을 실행할 때 this로 사용할 값

  ```js
  const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

  currenciesUnique.forEach(function (value, _, set) {
    console.log(`${value}: ${value}`);
  });
  // USD: USD
  // GBP: GBP
  // EUR: EUR
  ```

## ▶ 146. PROJECT: "Bankist" App

- [Demo Bankist App 링크](https://bankist.netlify.app/)
- "Bankist" App에 대한 Flowchart

  ![](./Bankist-flowchart.png)

## ▶ 147. Creating DOM Elements

- 'displayMovements()'를 만들어보자

  - 1. 일단, movements container의 내부 HTML 태그들을 먼저 지우자
  - 2. `forEach()` 메서드를 사용해 movements를 looping하자
  - 3. 각 movement의 type이 뭔지 확인하자
  - 4. movements container에 삽입할 각 movements-row를 만들자
  - 5. movements container에 movements-row를 붙혀넣자

- `Element.innerHTML`

  - element 내에 포함 된 HTML을 가져옴
  - innerHTML 값을 설정하면 요소의 기존 내용을 새 내용으로 쉽게 변경 가능

- `Element.insertAdjacentHTML(position, text)`

  - HTML 같은 특정 텍스트를 파싱하고, 특정 위치의 DOM tree 안에 원하는 node들을 추가함
  - `position`: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
  - `text`: HTML 또는 XML 문자열

  ```js
  const displayMovements = function (movements) {
    containerMovements.innerHTML = '';

    movs.forEach(function (mov, i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';

      const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
      `;

      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  };
  ```

## ▶ 149. Data Transformations: map, filter, reduce

1. `array명.map()` method

   - original array elements를 순회하며 각각 callback function에 적용시킨 후, 그 결과를 새 array에 담아 반환

2. `array명.filter()` method

   - original array elements를 순회하며 각각 callback function에 적용시킨 후, 그 결과가 true인 것만 새 array에 담아 반환

3. `array명.reduce()` method

   - original array elements를 순회하며 각각 callback function에 적용시킨 후, 그 결과를 앞의 결과에 계속 누적해나가 하나의 value를 반환

## ▶ 150. The map Method

### 🔹 `map` method

```js
arr명.map(callback(currentValue[, index[, array]])[, thisArg])
```

- 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환

  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: map()을 호출한 배열
  - `thisArg`: callback을 실행할 때 this로 사용되는 값

- 반환값: 배열의 각 요소에 대해 실행한 callback의 결과를 모은 새로운 배열

  - 원본 array는 변하지 x

  ```js
  const eurToUsd = 1.1;
  const movementsUSD = movements.map(mov => mov * eurToUsd);

  console.log(movementsUSD);
  //  [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]
  ```

## ▶ 151. Computing Usernames

- `forEach()` method는 단순히 array의 각 요소를 순회해 callback function에 적용시킬 뿐, 새로운 array를 반환하거나 하진 않음
- `map()` method는 callback function에서 반드시 특정 값을 반환해야하지만, `forEach()` method는 callback function에서 특정 문구를 console에 로그하거나 objects를 바꿔주는 등 side effect를 일으킴

- 'createUsernames()'를 만들어보자

  - 1. 5개의 account 정보가 담긴 array 형태의 accounts를 순회한다
  - 2. 각 account에 owner의 이니셜을 딴 username property를 추가한다

  ```js
  const createUsernames = function (accs) {
    accs.forEach(function (acc) {
      acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
    });
  };

  createUsernames(accounts);
  console.log(accounts);
  // [{owner: 'Jonas Schmedtmann', username: 'js', ...}, {...}, {...}, {...}]
  ```

## ▶ 152. The filter Method

### 🔹 `filter` method

```js
arr명.filter(callback(currentValue[, index[, array]])[, thisArg])
```

- 배열 내의 모든 요소 각각에 대하여 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환

  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: filter()를 호출한 배열
  - `thisArg`: callback을 실행할 때 this로 사용되는 값

- 반환값: 배열의 각 요소에 대해 실행한 callback의 결과를 모은 새로운 배열

  - 어떤 요소도 테스트를 통과하지 못했으면 빈 배열을 반환
  - 원본 array는 변하지 x

  ```js
  const deposits = movements.filter(function (mov) {
    return mov > 0;
  });

  console.log(deposits);
  // [200, 450, 3000, 70, 1300]
  ```

## ▶ 153. The reduce Method

### 🔹 `reduce` method

```js
arr명.reduce(callback(acc, cur[, index[, array]])[, initialValue])
```

- 배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환

  - `accumulator`: 콜백의 반환값을 누적
  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: reduce()를 호출한 배열
  - `initialValue`: callback의 최초 호출에서 첫 번째 인수에 제공하는 값 (초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용)

- 반환값: 누적 계산의 결과 값

  - 원본 array는 변하지 x

  ```js
  const balance = movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);

  console.log(balance); // 3840
  ```

  ```js
  const max = movements.reduce((acc, mov) => {
    if (acc > mov) return acc;
    else return mov;
  }, movements[0]);

  console.log(max); // 3000
  ```

- 'calcDisplayBalance()'를 만들어보자

  ```js
  const calcDisplayBalance = function (movements) {
    const balance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${balance}€`;
  };

  calcDisplayBalance(account1.movements);
  ```

## ▶ 155. The Magic of Chaining Methods

- Chaining Methods을 통해 'calcDisplaySummery()'를 만들어보자

  - 1. deposits를 모두 합해 income을 구하자
  - 2. withdrawals를 모두 합해 outcome을 구하자
  - 3. deposits에 이자율을 곱한 후, 1 이상인 것만 모아 interest를 구하자

  ```js
  const calcDisplaySummary = function (movements) {
    const incomes = movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;

    const out = movements
      .filter(mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * 1.2) / 100)
      .filter((int, i, arr) => {
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
  };
  ```

## ▶ 157. The find Method

- `find` method는 `filter` method처럼 callback function을 통과하는 것만 반환해줌
- `filter` method와의 차이점
  - `filter` method: callback function을 통과하는 모든 요소들은 배열에 담아 반환
  - `find` method: callback function을 통과하는 첫번째 요소 하나만 반환

### 🔹 `find` method

```js
arr명.find(callback(currentValue[, index[, array]])[, thisArg])
```

- 배열의 각 요소에 대해 주어진 함수를 만족하는 첫 번째 요소의 값을 반환

  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: find()를 호출한 배열
  - `thisArg`: callback function이 호출될 때 this로 사용할 객체

- 반환값: 함수를 만족하는 첫 번째 요소의 값

  - 함수를 만족하는 요소가 하나도 없으면 undefined를 반환
  - 원본 array는 변하지 x

  ```js
  const firstWithdrawal = movements.find(mov => mov < 0);

  console.log(firstWithdrawal); // -400
  ```

  ```js
  const account = accounts.find(acc => acc.owner === 'Jessica Davis');

  console.log(account);
  // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222}
  ```

## ▶ 158. Implementing Login

- username과 pin 작성 후, login button을 눌렀을 때 기존 accounts 데이터에 존재하는지 확인하고 UI를 display하자

  - 이때, login한 현재 계정은 다른 곳에서도 사용해야하므로 global scope에 정의해야 함

  ```js
  let currentAccount;

  btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
      acc => acc.username === inputLoginUsername.value
    );

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      // Display UI and message
      labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = 100;

      // Clear input fields
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      // Display movements
      displayMovements(currentAccount.movements);

      // Display balance
      calcDisplayBalance(currentAccount.movements);

      // Display summary
      calcDisplaySummary(currentAccount);
    }
  });
  ```

- 'calcDisplaySummary()'에서 하드코딩된 interestRate를 각 계정에 맞게 계산할 수 있도록 수정하자

  ```js
  const calcDisplaySummary = function (acc) {
    ...
    const interest = acc.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => {
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    ...
  }
  ```

## ▶ 159. Implementing Transfers

- balance 계산 후, account에 저장되도록 'calcDisplayBalance()' 리팩토링

  ```js
  const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`;
  };
  ```

- movements, balance, summary를 display하는 함수들을 'updateUI()' 함수를 따로 생성해서 모아두고 재사용하기

  ```js
  const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
  };
  ```

  ```js
  btnLogin.addEventListener('click', function (e) {
    ...
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      ...
      // Update UI
      updateUI(currentAccount);
    }
  });
  ```

- transfer할 username과 송금액 작성 후, button을 눌렀을 때 아래 조건에 만족할 경우 transfer되도록 해보자

  - 조건 1) 송금액은 0 이상이어야 함
  - 조건 2) 송금액을 보낼만큼 balance를 보유해야 함
  - 조건 3) 송금할 username은 데이터에 등록된 상태여야 함
  - 조건 4) 자기 자신에게 송금을 보내선 안됨

  ```js
  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // Update UI
      updateUI(currentAccount);
    }
  });
  ```

## ▶ 160. The findIndex Method

- `findIndex` method는 `find` method처럼 callback function을 통과하는 것만 반환해줌
- `find` method와의 차이점
  - `find` method: callback function을 통과하는 첫번째 요소 하나만 반환
  - `findIndex` method: callback function을 통과하는 첫번째 요소의 인덱스 하나만 반환

### 🔹 `findIndex` method

```js
arr명.findIndex(callback(currentValue[, index[, array]])[, thisArg])
```

- 배열의 각 요소에 대해 주어진 함수를 만족하는 첫 번째 요소에 대한 인덱스를 반환

  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: filterIndex()를 호출한 배열
  - `thisArg`: callback function이 호출될 때 this로 사용할 객체

- 반환값: 함수를 만족하는 첫 번째 요소에 대한 인덱스

  - 함수를 만족하는 요소가 하나도 없으면 -1을 반환
  - 원본 array는 변하지 x

- 계정을 삭제하는 이벤트를 작성해보자

  - `findIndex` method를 사용해 삭제하려고하는 계정의 index 위치를 찾은 후, `splice` method를 사용해 accounts array 원본에서 해당 계정을 삭제하면 됨

  ```js
  btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
      inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );

      // Delete account
      accounts.splice(index, 1);

      // Hide UI
      containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = '';
  });
  ```

## ▶ 161. some and every

### 🔹 `some` method

```js
arr명.some(callback(currentValue[, index[, array]])[, thisArg])
```

- 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트

  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: some()를 호출한 배열
  - `thisArg`: callback function이 호출될 때 this로 사용할 객체

- 반환값: boolean

  - 콜백 함수가 적어도 배열 중 하나의 요소에 대해 참이면 true를 반환
  - 그렇지 않으면 false를 반환
  - 원본 array는 변하지 x

  ```js
  console.log(movements.some(mov => mov === -130));
  // true (movements.includes(mov => mov === -130)와 동일)

  console.log(movements.some(mov => mov > 0));
  // true
  ```

- 대출해주는 이벤트를 작성해보자

  - 본인의 deposit 내역 중 대출 금액의 10% 이상 입금한 사례가 있으면 대출 가능

  ```js
  btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
      amount > 0 &&
      currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
      // Add movement
      currentAccount.movements.push(amount);

      // Update UI
      updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
  });
  ```

### 🔹 `every` method

```js
arr명.every(callback(currentValue[, index[, array]])[, thisArg])
```

- 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트

  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: every()를 호출한 배열
  - `thisArg`: callback function이 호출될 때 this로 사용할 객체

- 반환값: boolean

  - 콜백 함수가 모든 배열 요소에 대해 참을 반환하면 true를 반환
  - 그렇지 않으면 false를 반환
  - 원본 array는 변하지 x

  ```js
  console.log(movements.every(mov => mov > 0)); // false
  ```

- callback function을 분리해서 사용하면 더 효율적으로 코드 작성 가능 (DIY 원칙)

  ```js
  const deposit = mov => mov > 0;

  console.log(movements.some(deposit)); // true
  console.log(movements.every(deposit)); // false
  console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300]
  ```

## ▶ 162. flat and flatMap

- ES2019에 도입된 문법

### 🔹 `flat` method

```js
arr명.flat([depth]);
```

- 모든 하위 배열 요소를 지정한 깊이까지 재귀적으로 이어붙인 새로운 배열을 생성

  - `flat`: nested array 구조를 평탄화할 때 사용할 깊이 값 (기본값 = 1)

- 반환값: 하위 배열을 이어붙인 새로운 배열

  - 원본 array는 변하지 x

  ```js
  const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
  const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

  console.log(arr.flat());
  // [1, 2, 3, 4, 5, 6, 7, 8]
  console.log(arrDeep.flat());
  // [Array(2), 3, 4, Array(2), 7, 8]
  console.log(arrDeep.flat(2));
  // [1, 2, 3, 4, 5, 6, 7, 8]
  ```

  ```js
  const overallBalance = accounts
    .map(acc => acc.movements) // [Array(8), Array(8), Array(8), Array(5)]
    .flat() // [200, 450, -400, ..., 90]
    .reduce((acc, mov) => acc + mov, 0);

  console.log(overallBalance); // 17840
  ```

### 🔹 `flatMap` method

```js
arr명.flatMap(callback(currentValue[, index[, array]])[, thisArg])
```

- 먼저 callback function을 사용해 각 요소에 대해 map 수행 후, 결과를 새로운 배열로 평탄화

  - `currentValue`: 처리할 현재 요소
  - `index`: 처리할 현재 요소의 인덱스
  - `array`: flatMap()를 호출한 배열
  - `thisArg`: callback function이 호출될 때 this로 사용할 객체

- 반환값: 각 요소가 callback 함수의 결과이고, 깊이 1로 평탄화된 새로운 배열

  - 원본 array는 변하지 x

  ```js
  const overallBalance2 = accounts
    .flatMap(acc => acc.movements) // [200, 450, -400, ..., 90]
    .reduce((acc, mov) => acc + mov, 0);

  console.log(overallBalance2); // 17840
  ```

## ▶ 163. Sorting Arrays

### 🔹 `sort` method

```js
arr명.sort([compareFunction]);
```

- 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환

  - `compareFunction`: 정렬 순서를 정의하는 함수 (생략하면 배열은 각 요소의 문자열 변환에 따라 각 문자의 유니 코드 코드 포인트 값에 따라 정렬)

- 반환값: 하위 배열을 이어붙인 새로운 배열

  - 주의) 기본 정렬 순서는 문자열의 유니코드에 따름
  - 즉, array가 숫자이면 문자열로 변환해 정렬한 후 다시 숫자로 변환
  - 원본 array가 바뀜 (mutate)

  ```js
  // Strings 정렬
  const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

  console.log(owners.sort()); //  ['Adam', 'Jonas', 'Martha', 'Zach']
  console.log(owners); //  ['Adam', 'Jonas', 'Martha', 'Zach']
  ```

  ```js
  // Numbers 정렬 - 잘못된 숫자 정렬!
  console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70]
  ```

- 배열 요소는 compareFunction의 반환 값에 따라 정렬됨

  - compareFunction(a, b) < 0 👉 a, b 순으로 정렬됨 (keep order)
  - compareFunction(a, b) > 0 👉 b, a 순으로 정렬됨 (switch order)
  - compareFunction(a, b) == 0 👉 순서를 변경하지 않음

- Numbers 정렬 ⇒ 오름차순 정렬(Ascending)

  ```js
  // 방법1
  movements.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
  });

  console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]
  ```

  ```js
  // 방법2)
  movements.sort((a, b) => a - b);

  console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]
  ```

- Numbers 정렬 ⇒ 내림차순 정렬(Descending)

  ```js
  // 방법1
  movements.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
  });

  console.log(movements); // [3000, 1300, 450, 200, 70, -130, -400, -650]
  ```

  ```js
  // 방법2)
  movements.sort((a, b) => b - a);

  console.log(movements); // [3000, 1300, 450, 200, 70, -130, -400, -650]
  ```

- sorted 버튼을 클릭할 때, movements를 오름차순 정렬하는 이벤트를 만들자

  - 먼저, 오름차순에 따라 정렬할 수 있게 'displayMovements()' 함수 수정

  ```js
  const displayMovements = function (movements, sort = false) {
    ...
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
      ...
    });
  };
  ```

  ```js
  let sorted = false;

  btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
  });
  ```

## ▶ 164. More Ways of Creating and Filling Arrays

### 🔹 `Array()` 생성자

```js
new Array(element0, element1[, ...[, elementN]]);
new Array(arrayLength);
```

- 새로운 Array 객체를 생성

  - `elementN`: JavaScript 배열을 초기화할 때 채워넣을 요소
  - `arrayLength`: 배열은 arrayLength 만큼의 빈 슬롯을 가짐

- arrayLength 만큼의 빈 슬롯을 가진 배열은 map() 함수를 사용해 값을 채워넣으려고 해도 채울 수 없음

  - 유일하게 `fill` method를 사용하면 빈 슬롯을 지정한 값으로 채울 수 있음

  ```js
  console.log(new Array(1, 2, 3, 4, 5, 6, 7));
  // [1, 2, 3, 4, 5, 6, 7]
  ```

  ```js
  const x = new Array(7);

  console.log(x); // [empty × 7]
  console.log(x.map(() => 5)); // [empty × 7]
  ```

### 🔹 `fill` method

```js
arr명.fill(value[, start[, end]]);
```

- 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채움

  - `value`: 배열을 채울 값
  - `start`: 시작 인덱스 (기본값 = 0)
  - `end`: 끝 인덱스 (기본값 = this.length)

- 반환값: 변형한 배열

  - 원본 array가 바뀜 (mutate)

  ```js
  x.fill(1);

  console.log(x); // [1, 1, 1, 1, 1, 1, 1]
  ```

  ```js
  x.fill(1, 3, 5);

  console.log(x); // [empty × 3, 1, 1, empty × 2]
  ```

  ```js
  const arr = [1, 2, 3, 4, 5, 6, 7];

  arr.fill(23, 2, 6);
  console.log(arr); // [1, 2, 23, 23, 23, 23, 7]
  ```

### 🔹 `Array.from()`

```js
Array.from(arrayLike[, mapFn[, thisArg]]);
```

- 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운 Array 객체를 만듦

  - `arrayLike`: 배열로 변환하고자 하는 유사 배열 객체나 반복 가능한 객체
    - 유사 배열 객체: length 속성과 인덱싱 된 요소를 가진 객체 (document.querySelectorAll()의 반환값인 NodeList 등)
    - 반복 가능한 객체: 객체의 요소를 얻을 수 있는 객체 (set, map 등)
  - `mapFn`: 배열의 모든 요소에 대해 호출할 맵핑 함수
  - `thisArg`: mapFn 실행 시에 this로 사용할 값

- 반환값: 새로운 Array 인스턴스

  - `Array.from(obj).map(mapFn, thisArg)`와 같은 기능

  ```js
  const y = Array.from({ length: 7 }, () => 1);

  console.log(y); // [1, 1, 1, 1, 1, 1, 1]
  ```

  ```js
  const z = Array.from({ length: 7 }, (_, i) => i + 1);

  console.log(z); // [1, 2, 3, 4, 5, 6, 7]
  ```

  ```js
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
  // [200, 450, -400, 3000, -650, -130, 70, 1300]
  ```

## ▶ 166. Array Methods Practice

- `reduce` method는 primitive value뿐만 아니라 array, object 등도 반환 가능

  ```js
  const { deposits, withdrawals } = accounts
    .flatMap(acc => acc.movements)
    .reduce(
      (sums, cur) => {
        sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
        return sums;
      },
      { deposits: 0, withdrawals: 0 }
    );

  console.log(deposits, withdrawals); // 25180 -7340
  ```
