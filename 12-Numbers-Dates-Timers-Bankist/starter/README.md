# ✔ '12-Numbers-Dates-Timers-Bankist' 이론 정리

## ▶ 170. Converting and Checking Numbers

- js에서 모든 numbers는 floating point numbers임

  ```js
  console.log(23 === 23.0); // true
  ```

- numbers는 내부적으로 64 base 2 format으로 나타냄

  - 즉, binary format으로 numbers가 저장됨

  ```js
  console.log(0.1 + 0.2); // 0.30000000000000004
  console.log(0.1 + 0.2 === 0.3); // false
  ```

### 🔹 string을 number로 전환하는 법

1. `Number(value)` 함수 이용

   - 단, 인수를 숫자로 변환할 수 없으면 NaN을 리턴

   ```js
   console.log(Number('23')); // 23
   ```

2. `+` operator 사용

   - 단, string을 숫자로 변환할 수 없으면 NaN을 리턴

   ```js
   console.log(+'23'); // 23
   ```

### 🔹 string에서 number/float를 parsing하는 법

1. `Number.parseInt(string[, radix])`

   - 문자열 인자를 파싱하여 특정 진수의 정수를 반환
     - `string`: 파싱할 값 (문자열의 선행 공백은 무시)
     - `radix`: string의 진수 (2 ~ 36 사이의 정수, 기본값 = 10)
   - 다음과 같은 경우에는 NaN을 반환
     - `radix`가 2보다 작거나 36보다 큰 경우
     - 공백이 아닌 첫 문자를 숫자로 변환할 수 없는 경우
   - 전역 객체 `parseInt()`와 동일한 값을 반환

   ```js
   console.log(Number.parseInt('30px', 10)); // 30
   console.log(Number.parseInt('e23', 10)); // NaN
   console.log(Number.parseInt('  2.5rem  ')); // 2
   ```

2. `Number.parseFloat(string)`

   - 문자열을 파싱하여 부동소수점 실수를 반환
     - `string`: 파싱할 값 (문자열의 선행 공백은 무시)
   - 다음과 같은 경우에는 NaN을 반환
     - 공백이 아닌 첫 문자를 숫자로 변환할 수 없는 경우
   - 전역 객체 `parseFloat()`와 동일한 값을 반환

   ```js
   console.log(Number.parseFloat('  2.5rem  ')); // 2.5
   ```

### 🔹 value가 NaN/finite/정수인지 확인하는 법

1. `Number.isNaN(value)`

   - 주어진 값이 NaN인지 판별
     - `value`: NaN인지 판별할 값
   - 반환값: 1)주어진 값의 유형이 Number이고 2)값이 NaN이면, true를 반환
   - 전역 함수 `isNaN()`와 달리, `Number.isNaN()`은 강제로 매개변수를 숫자로 변환하지 않음

   ```js
   console.log(Number.isNaN(20)); // false (type: Number, value: 20)
   console.log(Number.isNaN('20')); // false (type: String, value: '20')
   console.log(Number.isNaN(+'20X')); // true (type: Number, value: NaN)
   console.log(Number.isNaN(23 / 0)); // false (type: Number, value: Infinity)
   ```

   ```js
   // Number.isNaN()
   Number.isNaN('NaN'); // false (type: String, value: 'NaN')
   Number.isNaN(undefined); // false (type: Undefined, value: Undefined)
   Number.isNaN({}); // false (type: Object, value: Object)

   // 전역 isNaN()
   isNaN('NaN'); // true
   isNaN(undefined); // true
   isNaN({}); // true
   ```

2. `Number.isFinite(value)`

   - 주어진 값이 유한수인지 판별
     - `value`: 유한수인지 판별할 값
   - 반환값: 1)주어진 값의 유형이 Number이고 2)값이 유한수이면, true를 반환
   - 전역 함수 `isFinite()`와 비교했을 때, `Number.isFinite()`은 매개변수를 숫자로 변환하지 않음

   ```js
   console.log(Number.isFinite(20)); // true
   console.log(Number.isFinite('20')); // false
   console.log(Number.isFinite(+'20X')); // false
   console.log(Number.isFinite(23 / 0)); // false
   console.log(Number.isFinite(0.1)); // true
   ```

3. `Number.isInteger(value)`

   - 주어진 값이 정수인지 판별
     - `value`: 정수인지 판별할 값
   - 반환값: 1)주어진 값의 유형이 Number이고 2)값이 정수이면, true를 반환

   ```js
   console.log(Number.isInteger(23)); // true
   console.log(Number.isInteger(23.0)); // true
   console.log(Number.isInteger(23 / 0)); // false
   console.log(Number.isInteger(0.1)); // false
   ```

## ▶ 171. Math and Rounding

1. `Math.sqrt(num)`

   - 숫자의 제곱근을 반환
   - 만약, 숫자가 음수이면 NaN를 반환

   ```js
   // 방법1) 제곱근
   console.log(Math.sqrt(25)); // 5

   // 방법2) n 제곱근
   console.log(25 ** (1 / 2)); //5
   console.log(8 ** (1 / 3)); // 2
   ```

2. `Math.max(val1, ..., valN)`

   - 입력값으로 받은 0개 이상의 숫자 중 가장 큰 숫자를 반환
   - 입력값 중에 type이 number가 아닌게 있다면, 자동으로 타입을 변환 (type coercion)
   - 만약, 인수 중 하나라도 숫자로 변환하지 못한다면 NaN로 반환

   ```js
   console.log(Math.max(5, 18, 23, 11, 2)); // 23
   console.log(Math.max(5, 18, '23', 11, 2)); // 23
   console.log(Math.max(5, 18, '23px', 11, 2)); // NaN
   ```

3. `Math.min(val1, ..., valN)`

   - 입력값으로 받은 0개 이상의 숫자 중 가장 작은 숫자를 반환
   - 입력값 중에 type이 number가 아닌게 있다면, 자동으로 타입을 변환 (type coercion)
   - 만약, 인수 중 하나라도 숫자로 변환하지 못한다면 NaN로 반환

   ```js
   console.log(Math.min(5, 18, 23, 11, 2)); // 2
   ```

4. `Math.PI`

   - 원의 둘레와 지름의 비율, 약 3.14159의 값을 가짐

   ```js
   console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793
   ```

5. `Math.random()`

   - 0 이상 1 미만의 부동소숫점 난수를 반환

   ```js
   console.log(Math.trunc(Math.random() * 6) + 1); // 1 ~ 6까지의 랜덤 수
   ```

   ```js
   const randomInt = (min, max) =>
     Math.floor(Math.random() * (max - min) + 1) + min; // min ~ max까지의 랜덤 수
   ```

6. `Math.round(num)`

   - 입력값을 반올림한 수와 가장 가까운 정수 값을 반환

   ```js
   console.log(Math.round(23.3)); // 23
   console.log(Math.round(23.9)); // 24
   console.log(Math.round(-20.5)); // -20
   console.log(Math.round(-20.51)); // -21
   ```

7. `Math.ceil(num)`

   - 주어진 숫자보다 크거나 같은 정수 중 가장 작은 정수를 반환

   ```js
   console.log(Math.ceil(23.3)); // 24
   console.log(Math.ceil(23.9)); // 24
   ```

8. `Math.floor(num)`

   - 주어진 숫자보다 크거나 작은 정수 중 가장 큰 정수를 반환

   ```js
   console.log(Math.floor(23.3)); // 23
   console.log(Math.floor('23.9')); // 23
   console.log(Math.floor(-23.3)); // -24
   ```

9. `Math.trunc(num)`

   - 주어진 숫자의 소수부분을 제거하고 숫자의 정수부분을 반환

   ```js
   console.log(Math.trunc(23.3)); // 23
   console.log(Math.trunc(-23.3)); // -23
   ```

10. `numObj.toFixed([digits])`

    - 숫자를 고정 소수점 표기법(fixed-point notation)으로 표시
      - `digits`: 소수점 뒤에 나타날 자릿수 (0 이상 20 이하의 값, 기본값 = 0)
    - 반환값: 고정 소수점 표기법을 사용하여 나타낸 수를 '문자열'로 바꾼 값

    ```js
    console.log((2.7).toFixed(0)); // '3'
    console.log((2.7).toFixed(3)); // '2.700'
    console.log((2.345).toFixed(2)); // '2.35'
    console.log(+(2.345).toFixed(2)); // 2.35
    ```

## ▶ 172. The Remainder Operator

- 나머지 연산자 `%`

  ```js
  console.log(5 % 2); // 1
  ```

  ```js
  const isEven = n => n % 2 === 0;

  console.log(isEven(8)); // true
  console.log(isEven(23)); // false
  ```

## ▶ 173. Numeric Separators

- ES2021에 도입된 문법
- 숫자 사이에 `_`를 두어 코드 가독성을 높임
  - underscores `_`를 separator처럼 사용해 개발자들이 숫자를 한눈에 보기 쉽게 할 수 있음
  - 단지 코드 가독성을 위한 것일 뿐, 숫자 자체의 값에는 영향을 미치지 않음
- 숫자 사이가 아닌 위치에는 `_` 사용 불가

  ```js
  const diameter = 287_460_000_000; // ≓ 287,460,000,000

  console.log(diameter); // 287460000000
  ```

  ```js
  const price = 345_99; // ≓ 345 dollar 99 cents;
  console.log(price); // 34599
  ```

- 다만, 숫자 String 내 `_`은 문자로 인식

  ```js
  console.log(Number('230_000')); // NaN
  console.log(parseInt('230_000')); // 230
  ```

## ▶ 174. Working with BigInt

- 숫자는 내부적으로 64 bit로 저장되는데, 소수부분이랑 부호를 제외하면 digit은 53 bit에 저장됨

  - 따라서, JS에서 안전한 최대 정수값은 9007199254740991(2^53 - 1)이 됨
  - 안전한 최대 정수값 이상의 값은 정확하지가 않음

  ```js
  console.log(2 ** 53 - 1); // 9007199254740991
  console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
  ```

  ```js
  console.log(2 ** 53 + 2); // 9007199254740994
  console.log(2 ** 53 + 3); // 9007199254740996
  console.log(2 ** 53 + 4); // 9007199254740996
  ```

### 🔹 BigInt

- ES2020에 도입된 문법
- '2^53 - 1'보다 큰 정수를 표현할 수 있는 내장 객체
- BigInt 생성 방법

  - 1. 정수 리터럴의 뒤에 n을 붙여서 생성
  - 2. `BigInt()`를 호출해 생성

  ```js
  console.log(4838430248342043823408394839483204n);
  // 4838430248342043823408394839483204n
  console.log(BigInt(48384302));
  // 48384302n
  ```

- BigInt에 `+`, `*`, `-`, `**`, `%` 연산자 사용 가능

  ```js
  console.log(10000n + 10000n);
  // 20000n
  console.log(36286372637263726376237263726372632n * 10000000n);
  //362863726372637263762372637263726320000000n
  ```

  ```js
  console.log(huge + ' is REALLY big!!!');
  // 20289830237283728378237 is REALLY big!!!
  ```

- BigInt에 `/` 연산자 사용 시, 소수점 이하를 버려 항상 정수로 나타냄

  ```js
  console.log(10n / 3n); // 3n
  console.log(10 / 3); // 3.3333333333333335
  ```

- BigInt와 비교 연산자

  ```js
  console.log(20n > 15); // true
  console.log(20n === 20); // false (bigInt 타입 != Number 타입이므로)
  console.log(20n == '20'); // true
  console.log(typeof 20n); // bigint
  ```

- BigInt는 Math 객체의 메서드와 함께 사용할 수 없음

  ```js
  console.log(Math.sqrt(16n)); // Error!
  ```

- BigInt는 연산에서 Number와 혼합해 사용할 수 없음

  ```js
  const huge = 20289830237283728378237n;
  const num = 23;

  console.log(huge * num); // Error!
  ```

## ▶ 175. Creating Dates

- JavaScript `Date` 객체는 1970년 1월 1일 UTC 자정과의 시간 차이를 '밀리초(ms)' 단위로 나타냄
  - 단 Date 객체의 중심을 구성하는 시간 값은 UTC 기준이지만, 날짜와 시간 등 구성 요소를 가져오는 메서드는 모두 현지의 시간대를 사용함

### 🔹 생성자

1. `Date()`

   - 함수로 호출할 경우, `new Date().toString()`과 동일하게 현재 날짜와 시간을 나타내는 '문자열'을 반환

   ```js
   console.log(Date(), typeof Date());
   // 'Thu Mar 30 2023 15:23:20 GMT+0900 (한국 표준시)' 'string'
   ```

2. `new Date()`

   - 생성자로 호출할 경우, 새로운 Date '객체'를 반환
   - Date 객체를 만드는 방법은 여러 개 존재
   - JS에서 month는 0부터 시작 (0: Jan ~ 11: Dec)
   - 해당 month의 일 수를 초과하면 자동으로 수정해서 보여줌

   ```js
   const now = new Date();

   console.log(now, typeof now);
   // Thu Mar 30 2023 15:25:05 GMT+0900 (한국 표준시) 'object'
   ```

   ```js
   // 방법1) string
   console.log(new Date('Aug 02 2020 18:05:41'));
   // Sun Aug 02 2020 18:05:41 GMT+0900 (한국 표준시)
   console.log(new Date('December 24, 2015'));
   // Thu Dec 24 2015 00:00:00 GMT+0900 (한국 표준시)
   console.log(new Date('1995-12-17T03:24:00'));
   // Sun Dec 17 1995 03:24:00 GMT+0900 (한국 표준시)
   ```

   ```js
   // 방법2) numbers
   console.log(new Date(2037, 10, 19, 15, 23, 5));
   // Thu Nov 19 2037 15:23:05 GMT+0900 (한국 표준시)
   console.log(new Date(2037, 10, 31));
   // Tue Dec 01 2037 00:00:00 GMT+0900 (한국 표준시)
   ```

   ```js
   // 방법3) 타임스탬프 - 1970년 1월 1일 UTC 자정과의 시간 차이 (밀리초, ms)
   console.log(new Date(0));
   // Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)
   console.log(new Date(3 * 24 * 60 * 60 * 1000));
   // Sun Jan 04 1970 09:00:00 GMT+0900 (한국 표준시)
   ```

### 🔹 정적 메서드

1. `Date.now()`

   - 1970년 1월 1일 00:00:00 UTC로부터 지난 시간을 '밀리초' 단위의 숫자 값으로 반환 (타임스탬프)

   ```js
   console.log(Date.now()); // 1680158715779
   ```

### 🔹 인스턴스 메서드

1. `Date명.getFullYear()`

   - Date에서 현지 시간 기준 연도(네 자리 연도면 네 자리로)를 반환

   ```js
   const future = new Date(2037, 10, 19, 15, 23);

   console.log(future.getFullYear()); // 2037
   ```

2. `Date명.getMonth()`

   - Date에서 현지 시간 기준 월(0–11)을 반환

   ```js
   console.log(future.getMonth()); // 10
   ```

3. `Date명.getDate()`

   - Date에서 현지 시간 기준 일(1–31)을 반환

   ```js
   console.log(future.getDate()); // 19
   ```

4. `Date명.getDay()`

   - Date에서 현지 시간 기준 요일(0–6)을 반환
   - 0: sunday ~ 6: saturday

   ```js
   console.log(future.getDay()); // 4
   ```

5. `Date명.getHours()`

   - Date에서 현지 시간 기준 시(0–23)를 반환

   ```js
   console.log(future.getHours()); // 15
   ```

6. `Date명.getMinutes()`

   - Date에서 현지 시간 기준 분(0–59)을 반환

   ```js
   console.log(future.getMinutes()); // 23
   ```

7. `Date명.getSeconds()`

   - Date에서 현지 시간 기준 초(0–59)를 반환

   ```js
   console.log(future.getSeconds()); // 0
   ```

8. `Date명.getTime()`

   - 1970년 1월 1일 00:00:00 UTC로부터의 경과시간을 밀리초 단위로 반환 (타임스탬프)
   - 단, Date가 기준 시간 이전을 나타낼 경우 음수 값을 반환

   ```js
   console.log(future.getTime()); // 2142224580000
   ```

9. `Date명.toISOString()`

   - Date를 나타내는 문자열을 ISO 8601 확장 형식에 맞춰 반환

   ```js
   console.log(future.toISOString()); // 2037-11-19T06:23:00.000Z
   ```

10. `Date명.setFullYear()`

- 현지 시간 기준으로 연도(네 자리 연도면 네 자리로)를 설정

```js
future.setFullYear(2040);

console.log(future);
// Mon Nov 19 2040 15:23:00 GMT+0900 (한국 표준시)
```

## ▶ 176. Adding Dates to "Bankist" App

- 로그인했을 때, 현재 시각 나타내기

  ```js
  btnLogin.addEventListener("click", function (e) {
    ...
    if (currentAccount?.pin === +inputLoginPin.value) {
      ...
      // Create current date and time
      const day = `${now.getDate()}`.padStart(2, 0);
      const month = `${now.getMonth() + 1}`.padStart(2, 0);
      const year = now.getFullYear();
      const hour = `${now.getHours()}`.padStart(2, 0);
      const min = `${now.getMinutes()}`.padStart(2, 0);
      labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
      ...
    }
  });
  ```

- 각 movement마다 출입금한 날짜 나타내기

  ```js
  const displayMovements = function (acc, sort = false) {
    ...
    movs.forEach(function (mov, i) {
      ...
      const date = new Date(acc.movementsDates[i]);
      const day = `${date.getDate()}`.padStart(2, 0);
      const month = `${date.getMonth() + 1}`.padStart(2, 0);
      const year = date.getFullYear();
      const displayDate = `${day}/${month}/${year}`;

      const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
      `;

      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  };
  ```

- 이체나 대출 시, 금액 정보뿐만 아니라 현재 날짜 정보도 함께 account 객체에 저장하기

  ```js
  btnTransfer.addEventListener("click", function (e) {
    ...
    if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      ...
      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());
      ...
    }
  });
  ```

  ```js
  btnLoan.addEventListener("click", function (e) {
    ...
    if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
      ...
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      ...
    }
    ...
  });
  ```

## ▶ 177. Operations With Dates

- Number에 사용 가능한 다양한 연산자를 Date 객체에도 적용 가능
- `Number()`이나 `+` 연산자를 이용해 Date 객체의 문자열 반환값을 TimeStamp로 전환 가능

  ```js
  const future = new Date(2037, 10, 19, 15, 23);

  console.log(Number(future)); // 2142224580000
  console.log(+future); // 2142224580000
  ```

- Date 객체 간 더하기/빼기 연산도 가능

  ```js
  const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

  console.log(calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14))); // 10
  ```

- 각 movement마다 출입금한 날짜 formatting 하기

  - 일단, 'displayMovements'안에 있는 display date 부분 코드를 뺴서 함수화

  ```js
  const displayMovements = function (acc, sort = false) {
    ...
    movs.forEach(function (mov, i) {
      ...
      const date = new Date(acc.movementsDates[i]);
      const displayDate = formatMovementDate(date);
      ...
    });
  };
  ```

  ```js
  const formatMovementDate = function (date) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  ```

## ▶ 178. Internationalizing Dates (Intl)

- `Intl` 객체는 각 언어에 맞는 문자비교, 숫자, 시간, 날짜비교를 제공하는, ECMAScript 국제화 API를 위한 namespace

### 🔹 Intl 객체의 생성자

1. `Intl.DateTimeFormat()`

   - 각 언어에 맞는 시간과 날짜 서식을 적용할 수 있는 객체의 생성자

2. `Intl.ListFormat()`

   - 각 언어에 맞는 목록 서식을 적용할 수 있는 객체의 생성자

3. `Intl.NumberFormat()`

   - 각 언어에 맞는 숫자 서식을 적용할 수 있는 객체의 생성자

### 🔹 Intl.DateTimeFormat()

- `Intl.DateTimeFormat([locales, options]).format(date)`

  - DateTimeFormat 객체의 locales과 options에 맞춰 date를 서식화해 반환

- `locales` parameter

  - 지역마다 다른 숫자 서식 방법에 따라 나타내줌
  - [BCP 47 Language Tags](https://www.techonthenet.com/js/language_tags.php)에 따라 `[language]-[region]` 형태인 language tags를 사용해 locales 지정
  - ex) 미국: es-US, 한국: ko-KR

  ```js
  const date = new Date();
  const locale = navigator.language; // browser's language

  console.log(new Intl.DateTimeFormat('ko-KR').format(date)); // 2023. 3. 30.
  console.log(new Intl.DateTimeFormat('en-US').format(date)); // 3/30/2023
  console.log(new Intl.DateTimeFormat('en-GB').format(date)); // 30/03/2023
  console.log(new Intl.DateTimeFormat(locale).format(date));
  ```

- `options` parameter

  - 날짜와 시간 서식 결과를 원하는 형태로 바꿀 수 있음
    - long, short, numeric 등

  ```js
  const date = new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  console.log(new Intl.DateTimeFormat('ko-KR', options).format(date));
  // 2023년 3월 30일 목요일 오후 9:07:47
  ```

- 로그인했을 때, 현재 시각을 지역마다 다르게 formatting해서 나타내기

  ```js
  btnLogin.addEventListener('click', function (e) {
    ...
    if (currentAccount?.pin === +inputLoginPin.value) {
      ...
      const now = new Date();
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      };

      labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(now);
      ...
    }
  });
  ```

- movement 출입금한 날짜를 지역에 따라 formatting 하기

  ```js
  const formatMovementDate = function (date, locale) {
    ...
    return new Intl.DateTimeFormat(locale).format(date);
  };
  ```

## ▶ 179. Internationalizing Numbers (Intl)

### 🔹 Intl.NumberFormat()

- `Intl.NumberFormat([locales, options]).format(number)`

  - NumberFormat 객체의 locales과 options에 맞춰 number를 서식화해 반환

- `locales` parameter

  ```js
  const num = 3884764.23;
  const locale = navigator.language; // browser's language

  console.log(new Intl.NumberFormat('en-US').format(num)); // 3,884,764.23
  console.log(new Intl.NumberFormat('de-DE').format(num)); // 3.884.764,23
  console.log(new Intl.NumberFormat('ar-SY').format(num)); // ٣٬٨٨٤٬٧٦٤٫٢٣
  console.log(new Intl.NumberFormat(navigator.language).format(num));
  ```

- `options` parameter

  - 결과를 원하는 형태로 바꿀 수 있음
    - unit(mile-per-hour, celsius 등), currency, percent

  ```js
  const options = {
    style: 'unit',
    unit: 'mile-per-hour',
  };

  console.log(new Intl.NumberFormat('en-US', options).format(num)); // 3,884,764.23 mph
  console.log(new Intl.NumberFormat('de-DE', options).format(num)); // 3.884.764,23 mi/h
  ```

  ```js
  const options = {
    style: 'percent',
  };

  console.log(new Intl.NumberFormat('en-US', options).format(num)); // 388,476,423%
  console.log(new Intl.NumberFormat('de-DE', options).format(num)); // 388.476.423 %
  ```

  ```js
  const options = {
    style: 'currency',
    currency: 'EUR',
  };

  console.log(new Intl.NumberFormat('en-US', options).format(num)); // €3,884,764.23
  console.log(new Intl.NumberFormat('de-DE', options).format(num)); // 3.884.764,23 €
  ```

- movements, balance, summary의 숫자도 지역에 따라 formatting 하기

  ```js
  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };
  ```

  ```js
  const displayMovements = function (acc, sort = false) {
    ...
    movs.forEach(function (mov, i) {
      ...
      const formattedMov = formatCur(mov, acc.locale, acc.currency);
      ...
    });
  };
  ```

  ```js
  const calcDisplayBalance = function (acc) {
    ...
    labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
  };
  ```

  ```js
  const calcDisplaySummary = function (acc) {
    ...
    labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
    ...
    labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
    ...
    labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
  };
  ```

## ▶ 180. Timers: setTimeout and setInterval

### 🔹 setTimeout()

```js
setTimeout(callback[, delay, arg1, arg2, ...]);
```

- 설정한 시간이 만료된 후 함수를 실행

  - `callback`: 타이머가 만료된 뒤 실행할 function
  - `delay`: 주어진 함수를 실행하기 전에 기다릴 밀리초 단위(ms) 시간
  - `arg1, ..., argN`: function에 전달할 추가 매개변수

- 반환값: timeoutID (`setTimeout()`이 생성한 타이머를 식별할 때 사용)
- setTimeout()은 비동기 함수로서, 함수 스택의 다른 함수 호출을 막지 않음

  ```js
  const ingredients = ['olives', 'spinach'];

  const pizzaTimer = setTimeout(
    (ing1, ing2) =>
      console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
    3000,
    ...ingredients
  );

  console.log('Waiting...');
  // Waiting...
  // (3초 후) Here is your pizza with olives and spinach 🍕
  ```

### 🔹 clearTimeout()

```js
clearTimeout(timeoutID);
```

- `setTimeout()`의 함수 호출을 취소함

  - `timeoutID`: 취소하고자 하는 `setTimeout()`의 ID

- 반환값: none

  ```js
  if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
  ```

### 🔹 setInterval()

```js
setInterval(callback[, delay, arg0, ..., argN]);
```

- 일정 시간마다 함수를 반복적으로 호출

  - `callback`: delay(밀리초)마다 실행되는 function
  - `delay`: 주어진 함수를 실행하기 전에 기다릴 밀리초 단위(ms) 시간
  - `arg1, ..., argN`: function에 전달할 추가 매개변수

- 반환값: intervalID

  - `clearInterval()`에 전달되어 interval을 취소할 수 있음

  ```js
  setInterval(function () {
    const now = new Date();
    console.log(now);
  }, 1000);
  ```

## ▶ 181. Implementing a Countdown Timer

- 특정 시간동안 활동하지 않으면 로그아웃되는 'startLogOutTimer'를 만들어보자

  - 이때 `setInterval()` 함수의 ID를 반환해줘서 다른 곳에서 `clearInterval()` 함수를 사용해 제거해줄 수 있도록 함

  ```js
  const startLogOutTimer = function () {
    const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);

      // In each call, print the remaining time to UI
      labelTimer.textContent = `${min}:${sec}`;

      // When 0 seconds, stop timer and log out user
      if (time === 0) {
        clearInterval(timer);
        labelWelcome.textContent = 'Log in to get started';
        containerApp.style.opacity = 0;
      }

      // Decrease 1s
      time--;
    };

    // Set time to 2 minutes
    let time = 120; // 단위: second

    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);

    return timer;
  };
  ```

- 지정한 시간이 끝나지 않은 상태에서 다른 아이디로 다시 로그인했을 때, `setInterval()` 함수가 중복해서 생성되는 것을 방지하기 위해 로그인할 때마다 기존 timer는 제거해주자

  ```js
  let timer;

  btnLogin.addEventListener('click', function (e) {
    ...
    if (currentAccount?.pin === +inputLoginPin.value) {
      ...
      // Timer
      if (timer) clearInterval(timer);
      timer = startLogOutTimer();
      ...
    }
  });
  ```

- transfer나 loan같은 활동이 일어날 때, timer를 reset해줘야함

  ```js
  btnTransfer.addEventListener("click", function (e) {
    ...
    if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      ...
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }
  });
  ```

  ```js
  btnLoan.addEventListener('click', function (e) {
    ...
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
      setTimeout(function () {
        ...
        // Reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
      }, 2500);
    }
    inputLoanAmount.value = '';
  });
  ```
