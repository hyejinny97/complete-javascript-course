# ✔ '09-Data-Structures-Operators' 이론 정리

## ▶ 103. Destructuring Arrays

- Destructure 방식을 통해 Array의 각 values를 한번에 변수에 할당할 수 있음

  ```js
  const arr = [2, 3, 4];

  const [x, y, z] = arr;
  console.log(x, y, z); // 2, 3, 4
  ```

- array 중간에 있는 요소를 건너띄고 싶을 땐, 단순히 `,`만 추가해주면 됨

  ```js
  // restaurant 데이터
  const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  };
  ```

  ```js
  let [main, , secondary] = restaurant.categories;
  console.log(main, secondary); // 'Italian', 'Vegetarian'
  ```

- 변수명을 다른 변수명과 바꾸고 싶을 때도 Destructure 방식을 이용하면 손쉽게 변경 가능함

  ```js
  [main, secondary] = [secondary, main];
  console.log(main, secondary); // 'Vegetarian', 'Italian'
  ```

- Nested destructuring을 통해 nested array를 할당하자

  ```js
  const nested = [2, 4, [5, 6]];

  const [i, , [j, k]] = nested;
  console.log(i, j, k); // 2, 5, 6
  ```

- default value 할당 가능

  ```js
  const [p = 1, q = 1, r = 1] = [8, 9];

  console.log(p, q, r); // 8, 9, 1
  ```

## ▶ 104. Destructuring Objects

- Destructure 방식을 통해 Objects에서 원하는 key에 해당하는 values만 가져올 수 있음

  - 이때, objects 내 기존 property명과 동일하게 작성해야 해당 value를 가져올 수 있음
  - objects에 없는 property명 사용 시, undefined가 할당됨

  ```js
  // restaurant 데이터
  const restaurant = {
    ...
    openingHours = {
      'thu': {
        open: 12,
        close: 22,
      },
      'fri': {
        open: 11,
        close: 23,
      },
      'sat': {
        open: 0, // Open 24 hours
        close: 24,
      },
    };
  };
  ```

  ```js
  const { name, openingHours, categories } = restaurant;

  console.log(name, openingHours, categories); // 'Classico Italiano', Objects(3), Array(4)
  ```

- 아래와 같이 작성하면 property 명을 바꿀 수도 있음

  ```js
  const {
    name: restaurantName,
    openingHours: hours,
    categories: tags,
  } = restaurant;

  console.log(restaurantName, hours, tags); // 'Classico Italiano', Objects(3), Array(4)
  ```

- default value 할당 가능

  ```js
  const { menu = [], starterMenu: starters = [] } = restaurant;

  console.log(menu, starters); // [], Array(4)
  ```

- Nested destructuring을 통해 nested object 할당 가능

  ```js
  const {
    fri: { open, close: c },
  } = openingHours;

  console.log(open, c); // 11, 23
  ```

- destructuring을 통해 변수의 값을 변경할 수 있음

  - 단 JS engine에서 키워드 없이 `{}`를 작성하면 코드 블록으로 인식하기 때문에, 키워드 없이 `{}` 작성 후 `=`가 나오면 Error 발생
  - 따라서, 아래처럼 `()`을 사용해서 한 겹 더 감싸줘야 함

  ```js
  let a = 111;
  let b = 999;
  const obj = { a: 23, b: 7, c: 14 };

  ({ a, b } = obj);
  console.log(a, b); // 23, 7
  ```

- function의 인자로 object를 받을 때, parameter에서 바로 Destructuring 방식을 사용하면 손쉽게 받을 수 있음

  ```js
  const restaurant = {
    ...
    orderDelivery: function({
      starterIndex = 1,
      mainIndex = 0,
      time = '20:00',
      address,
    }) {
      console.log(
        `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
      );
    },
  };
  ```

  ```js
  restaurant.orderDelivery({
    address: 'Via del Sole, 21',
    starterIndex: 1,
  });
  // Order received! Bruschetta and Pizza will be delivered to Via del Sole, 21 at 20:00
  ```

## ▶ 105. The Spread Operator (...)

- Spread Operator `...`을 사용하면, Iterables의 각 elements를 꺼내 분리해줌

  - Iterables의 elements를 unpacking함
  - Iterables: arrays, strings, maps, sets (Objects는 해당 안됨!!)
  - 하지만, ES 2018년부터 Objects도 spread operator 적용 가능해짐

- Array에 Spread Operator를 사용해 각 elements 분리 가능

  - 얕은 복사 가능
  - 일부 elements을 추가한 새로운 array 생성 가능
  - 두 array를 합친 새로운 array 생성 가능

  ```js
  const arr = [7, 8, 9];

  console.log(...arr); // 7 8 9 (console.log(7, 8, 9)와 결과 동일)
  ```

  ```js
  const newArr1 = [...arr];

  console.log(newArr1); // [7, 8, 9]
  ```

  ```js
  const newArr2 = [1, 2, ...arr];

  console.log(newArr2); // [1, 2, 7, 8, 9]
  ```

  ```js
  const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

  console.log(menu); // Array(7)
  ```

- String에 Spread Operator를 사용해 각 character 분리 가능

  ```js
  const str = 'Jonas';

  console.log(...str); // 'J', 'o', 'n', 'a', 's'
  ```

  ```js
  const letters = [...str, ' ', 'S.'];

  console.log(letters); // ['J', 'o', 'n', 'a', 's', ' ', 'S.']
  ```

- Spread Operator를 사용하면 function의 인자들을 손쉽게 넣어줄 수 있음

  ```js
  // restaurant 데이터
  const restaurant = {
    ...
    orderPasta: function(ing1, ing2, ing3) {
      console.log(
        `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
      );
    },
  };
  ```

  ```js
  const ingredients = [
    prompt("Let's make pasta! Ingredient 1?"),
    prompt('Ingredient 2?'),
    prompt('Ingredient 3'),
  ];

  restaurant.orderPasta(...ingredients);
  // 'Here is your delicious pasta with salt, tomato and butter'
  ```

- Object에 Spread Operator를 사용해 각 property 분리 가능

  - 얕은 복사 가능
  - 일부 property를 추가한 새로운 Object 생성 가능

  ```js
  const restaurantCopy = { ...restaurant };
  restaurantCopy.name = 'Ristorante Roma';

  console.log(restaurant.name); // 'Classico Italiano'
  console.log(restaurantCopy.name); // 'Ristorante Roma'
  ```

  ```js
  const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };

  console.log(newRestaurant);
  // {foundedIn: 1998, name: 'Classico Italiano', location: 'Via Angelo Tavanti 23, Firenze, Italy', categories: Array(4), starterMenu: Array(4), founder: 'Guiseppe', …}
  ```

## ▶ 106. Rest Pattern and Parameters

- Rest Pattern/Parameters도 Spread Operator처럼 `...`으로 표시함

  - Destructure 구조에서 values로 사용된 `...`는 Spread Operator
  - Destructure 구조에서 variables로 사용된 `...`는 Rest Pattern/Parameters

- Destructuring Array에서 Rest Pattern `...`은 변수에 할당되지 않은 나머지 모든 values를 모아 새로운 array에 넣어줌

  - Spread Operator와 반대로 elements를 packing함
  - Rest Pattern은 항상 제일 마지막에 위치해야함

  ```js
  // SPREAD, because on RIGHT side of =
  const arr = [1, 2, ...[3, 4]];

  // REST, because on LEFT side of =
  const [a, b, ...others] = [1, 2, 3, 4, 5];
  console.log(a, b, others); // 1 2 [3, 4, 5]
  ```

- Destructuring Array에서 건너뛴 요소는 Rest Pattern도 고려하지 않음

  ```js
  const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
  ];

  console.log(pizza, risotto, otherFood); // pizza risotto Array(4)
  ```

- Destructuring Object에서도 Rest Pattern `...`은 변수에 할당되지 않은 나머지 모든 properties를 모아 새로운 object에 넣어줌

  ```js
  const { sat, ...weekdays } = restaurant.openingHours;

  console.log(weekdays); // { fri: Object(2), sat: Object(2) }
  ```

- function의 parameter로 rest pattern `...`을 사용하면, 인자로 들어온 모든 값들을 모아 array로 packing 해줌

  ```js
  const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(sum);
  };

  add(2, 3); // 5
  add(5, 3, 7, 2); // 17
  add(8, 2, 5, 3, 2, 1, 4);

  const x = [23, 5, 7];
  add(...x); // 35
  ```

- 변수에 할당되지 않은 나머지 values가 하나도 없으면, 빈 array만 생성됨

  ```js
  // restaurant 데이터
  const restaurant = {
    ...
    orderPizza: function(mainIngredient, ...otherIngredients) {
      console.log(mainIngredient);
      console.log(otherIngredients);
  },
  };
  ```

  ```js
  restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
  // 'mushrooms'
  // ['onion', 'olives', 'spinach']
  restaurant.orderPizza('mushrooms');
  // 'mushrooms'
  // []
  ```

## ▶ 107. Short Circuiting (&& and ||)

- AND operator `&&`와 OR operator `||`의 피연산자로 boolean 이외의 다양한 type이 올 수 있고, boolean 이외의 다양한 타입을 반환할 수 있음
- falsy value: undefined, null, 0, '', NaN

### 🔹 OR operator `||`

- 특징

  - 1. 첫 번째 truthy value를 반환
  - 2. 모두 falsy value일 때, 마지막 falsy value를 반환

  ```js
  console.log(3 || 'Jonas'); // 3
  console.log('' || 'Jonas'); // 'Jonas'
  console.log(true || 0); // true
  console.log(undefined || null); // null
  console.log(undefined || 0 || '' || 'Hello' || 23 || null); // 'Hello'
  ```

- 첫 번째 operand가 falsy value일 때, default value를 지정하기 위해서 OR operator를 사용하기도 함

  - 비교 대상인 앞의 operand가 undefined인 경우, default value인 뒤의 operand가 반환됨
  - 아래 코드 단점: 'restaurant.numGuests = 0'일 때도 10을 반환

  ```js
  // 방법1) 삼항 연산자 사용 (restaurant.numGuests = undefined)
  const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
  console.log(guests1); // 10

  // 방법2) OR operator 사용
  const guests2 = restaurant.numGuests || 10;
  console.log(guests2); // 10
  ```

### 🔹 AND operator `&&`

- 특징

  - 1. 첫 번째 falsy value를 반환
  - 2. 모두 truthy value일 때, 마지막 truthy value를 반환

  ```js
  console.log(0 && 'Jonas'); // 0
  console.log(7 && 'Jonas'); // 'Jonas'
  console.log('Hello' && 23 && null && 'jonas'); // null
  ```

- 첫 번째 operand가 truthy value일 때, 어떤 코드를 실행시키기위해 AND operator를 사용하기도 함

  - 아래 코드에서 'restaurant.orderPizza'가 존재하면, 해당 메소드를 실행시킴

  ```js
  // 방법1) if state 사용
  if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'spinach');
  }

  // 방법2) AND operator 사용
  restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
  ```

## ▶ 108. The Nullish Coalescing Operator (??)

- ES2020에 도입된 Short Circuiting Operator `??`
- OR operator `||`과 유사하게 아래 특징을 가지고 있음

  - 1. 첫 번째 truthy value를 반환
  - 2. 모두 falsy value일 때, 마지막 falsy value를 반환

- 단, Nullish Coalescing Operator `??`는 undefined와 null만 falsy value로 판단

  - 즉, 0과 ''는 truthy value로 판단

  ```js
  console.log(3 ?? 'Jonas'); // 3
  console.log('' ?? 'Jonas'); // ''
  console.log(true ?? 0); // true
  console.log(undefined ?? null); // null
  console.log(undefined ?? 0 ?? '' ?? 'Hello' ?? 23 ?? null); // 0
  ```

  ```js
  restaurant.numGuests = 0;
  const guests2 = restaurant.numGuests ?? 10;
  console.log(guests2); // 0
  ```

## ▶ 109. Logical Assignment Operators

- ES2021에 도입된 Logical Assignment Operators
- OR Assignment operator: `||=` 왼쪽에 위치한 값이 falsy value일 때, 오른쪽 값을 왼쪽 변수에 할당함

  ```js
  // 데이터
  const rest1 = {
    name: 'Capri',
    numGuests: 20,
  };

  const rest2 = {
    name: 'La Piazza',
    owner: 'Giovanni Rossi',
  };
  ```

  ```js
  rest1.numGuests ||= 10;
  // rest1.numGuests = rest1.numGuests || 10; 👉 20
  rest2.numGuests ||= 10;
  // rest2.numGuests = rest2.numGuests || 10; 👉 10
  ```

- Nullish Assignment operator: `??=` 왼쪽에 위치한 값이 null, undefined인 falsy value일 때, 오른쪽 값을 왼쪽 변수에 할당함

  ```js
  const rest1 = {
    ...
    numGuests: 0,
  };

  const rest2 = {
    ...
  };
  ```

  ```js
  rest1.numGuests ??= 10;
  // rest1.numGuests = rest1.numGuests ?? 10; 👉 0
  rest2.numGuests ??= 10;
  // rest2.numGuests = rest2.numGuests ?? 10; 👉 10
  ```

- AND Assignment operator: `&&=` 왼쪽에 위치한 값이 truthy value일 때, 오른쪽 값을 왼쪽 변수에 할당함

  ```js
  rest1.owner &&= '<ANONYMOUS>';
  // rest1.owner = rest1.owner && '<ANONYMOUS>'; 👉 nothing
  rest2.owner &&= '<ANONYMOUS>';
  // rest2.owner = rest2.owner && '<ANONYMOUS>'; 👉 '<ANONYMOUS>'
  ```

## ▶ 111. Looping Arrays: The for-of Loop

- ES6에 도입된 문법
- Array 내 각 elements를 쉽게 반복할 수 있음

  ```js
  const menu = [...restaurant.mainMenu];

  for (const item of menu) console.log(item); // 'Pizza' 'Pasta' 'Risotto'
  ```

- `array.entries()` 메소드를 이용하면 각 elements의 index에 대한 정보도 같이 얻을 수 있음

  - for-of Loop에 destructure를 같이 적용하면, 각 elements의 index와 value 정보를 반복해서 원하는 변수에 할당할 수 있음

  ```js
  console.log(menu.entries()); // Array Iterator {}
  console.log([...menu.entries()]); // [[0, 'Pizza'], [1, 'Pasta'], [2, 'Risotto']]
  ```

  ```js
  for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
  }
  // 1: 'Pizza'
  // 2: 'Pasta'
  // 3: 'Risotto'
  ```

- for-of Loop에서 `continue`, `break` 키워드 사용 가능

## ▶ 112. Enhanced Object Literals

- ES6에 도입된 문법

- object 내 property name과 property value가 같을 때, property name만 적어도 됨

  ```js
  const openingHours = {
    ...
  };

  const restaurant = {
    ...
    openingHours, // openingHours: openingHours
    ...
  };
  ```

- object 내 methods는 `functionName() {}` 형태로만 적어도 됨

  ```js
  const restaurant = {
    ...
    order(starterIndex, mainIndex) {
      return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
    ...
  };
  ```

- object 내 property name도 대괄호 `[]`를 사용해서 compute 가능

  ```js
  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const openingHours = {
    [weekdays[3]]: {
      open: 12,
      close: 22,
    },
    [weekdays[4]]: {
      open: 11,
      close: 23,
    },
    [`day-${2 + 6}`]: {
      open: 0, // Open 24 hours
      close: 12 + 12,
    },
  };

  const restaurant = {
    ...
    openingHours,
    ...
  };
  ```

## ▶ 113. Optional Chaining (?.)

- ES2020에 도입된 문법

- undefined/null인 값에 어떤 요소를 찾으면 Error 발생

  - 아래처럼 if문으로 해결 가능

  ```js
  console.log(restaurant.openingHours.mon.open);
  // Error! (restaurant.openingHours.mon = undefined 이므로)
  ```

  ```js
  // Optional Chaining 문법을 적용하지 않았을 경우
  if (restaurant.openingHours && restaurant.openingHours.mon)
    console.log(restaurant.openingHours.mon.open);
  ```

- Optional Chaining `?.` 앞에 위치한 변수의 값 존재 여부에 따라, 다음 코드를 실행시킬지말지 결정함

  - undefined, null인 경우, 다음 코드를 실행시키지 않고 undefined나 null을 반환시킴
  - undefined, null이 아닌 모든 경우(0, '' 포함), 다음 코드를 실행시킴

  ```js
  // Optional Chaining 문법을 적용한 경우
  console.log(restaurant.openingHours?.mon?.open); // undefined
  ```

- Optional Chaining `?.`는 Nullish Coalescing Operator `??`와 자주 함께 사용됨

  - Optional Chaining `?.` 앞에 위치한 변수가 undefined/null인 경우, Nullish Coalescing Operator `??` 뒤에 위치한 default value를 반환함

  ```js
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open at ${open}`);
  }
  // On mon, we open at closed
  // On tue, we open at closed
  // On wed, we open at closed
  // On thu, we open at 12
  // On fri, we open at 11
  // On sat, we open at 0
  // On sun, we open at closed
  ```

- method에도 Optional Chaining `?.` 사용 가능

  ```js
  console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
  // ['Focaccia', 'Pasta']
  console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');
  // 'Method does not exist'
  ```

- array에도 Optional Chaining `?.` 사용 가능

  ```js
  let users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
  console.log(users[0]?.name ?? 'User array empty'); // 'Jonas'

  let users = [];
  console.log(users[0]?.name ?? 'User array empty'); // 'User array empty'
  ```

## ▶ 114. Looping Objects: Object Keys, Values, and Entries

- `Object.keys(객체명)`

  - object 내 모든 key들을 모아 array 형태로 반환

  ```js
  const properties = Object.keys(openingHours);

  console.log(properties); // ['thu', 'fri', 'sat']
  ```

- `Object.values(객체명)`

  - object 내 모든 value들을 모아 array 형태로 반환

  ```js
  const values = Object.values(openingHours);

  console.log(values);
  // [{open: 12, close: 22}, {open: 11, close: 23}, {open: 0, close: 24}]
  ```

- `Object.entries(객체명)`

  - object 내 key, value 여러 쌍을 각각 array에 담은 후, array 형태로 반환
  - object는 iterable하지 않으므로 for-of loop을 사용해 반복할 수 없음
  - 대신, entries() 함수를 이용하면 for-of loop을 사용해 key, value를 추출해낼 수 있음

  ```js
  const entries = Object.entries(openingHours);

  console.log(entries);
  // [['thu', {…}], ['fri', {…}], ['sat', {…}]]
  ```

  ```js
  for (const [day, { open, close }] of entries) {
    console.log(`On ${day} we open at ${open} and close at ${close}`);
  }
  ```

## ▶ 116. Sets

- ES6에 도입된 자료형
- Set 자료형은 오직 unique elements만 담고 있음
  - 즉, 중복된 elements가 없음

1. Set 정의하는 법

   - 인자로 iterable한 자료형 모두 가능
   - 중복을 제거한 unique elements만 반환
   - Set 자료형은 iterable하므로 looping 가능, Spread Operator 사용 가능

   ```js
   const ordersSet = new Set([
     'Pasta',
     'Pizza',
     'Pizza',
     'Risotto',
     'Pasta',
     'Pizza',
   ]);

   console.log(ordersSet); // {'Pasta', 'Pizza', 'Risotto'}
   ```

   ```js
   console.log(new Set('Jonas')); // {'J', 'o', 'n', 'a', 's'}
   ```

   ```js
   // for-of loop
   for (const order of ordersSet) console.log(order);
   ```

   ```js
   // Spread Operator
   const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
   const staffUnique = [...new Set(staff)];

   console.log(staffUnique); // ['Waiter', 'Chef', 'Manager']
   ```

2. Set 내 element 추가하는 법

   - `add()` 메소드 이용

   ```js
   ordersSet.add('Garlic Bread');

   console.log(ordersSet); // {'Pasta', 'Pizza', 'Risotto', 'Garlic Bread'}
   ```

3. Set 자료형은 순서가 없기 때문에, 인덱스를 사용해 특정 요소를 가져올 수 없음

4. Set 내 element 삭제하는 법

   - 특정 element를 삭제하고 싶을 때, `delete()` 메소드 이용
   - elements 전부 삭제하고 싶을 때, `clear()` 메소드 이용

   ```js
   ordersSet.delete('Risotto');

   console.log(ordersSet); // {'Pasta', 'Pizza', 'Garlic Bread'}
   ```

   ```js
   ordersSet.clear();

   console.log(ordersSet); // Set(0)
   ```

5. Set 내 특정 element 찾는 법

   - `has()` 메소드 이용

   ```js
   console.log(ordersSet.has('Pizza')); // true
   console.log(ordersSet.has('Bread')); // false
   ```

6. Set 내 요소 개수 세는 법

   ```js
   console.log(ordersSet.size); // 3
   ```

## ▶ 117. Maps: Fundamentals

- ES6에 도입된 자료형
- Objects처럼 key-value 쌍으로 구성되어있음
- Objects와의 차이점
  - Objects: key에는 **string** 데이터 타입만 올 수 있음
  - Maps: key에 **모든** 데이터 타입이 올 수 있음

1. Map 정의하는 법

   ```js
   const rest = new Map();
   ```

2. Map 내 element 추가하는 법

   - `set(key, value)` 메소드 이용
   - set() 메소드는 Map 요소를 update할 뿐만 아니라, map을 반환해 줌
   - 따라서, set() 메소드를 연속해서 쓸 수 있음

   ```js
   rest.set('name', 'Classico Italiano');
   rest.set(1, 'Firenze, Italy');
   rest.set(document.querySelector('h1'), 'Heading');
   console.log(rest.set(2, 'Lisbon, Portugal'));
   // Map(4) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisbon, Portugal'}
   ```

   ```js
   rest
     .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
     .set('open', 11)
     .set('close', 23)
     .set(true, 'We are open :D')
     .set(false, 'We are closed :(');

   console.log(rest);
   // Map(9) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisbon, Portugal', 'categories' => Array(4), 'open' => 11, …}
   ```

3. Map 내 element 가져오는 법

   - key로 boolean이 가능하기 때문에 아래와 같은 코드 가능

   ```js
   console.log(rest.get('name')); // Classico Italiano
   console.log(rest.get(true)); // We are open :D
   console.log(rest.get(1)); // Firenze, Italy
   ```

   ```js
   const time = 8;

   console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
   // We are closed :(
   ```

   - key가 reference type(array 등)일 때, 주의할 점

   ```js
   // 주의) 아래 두 array는 서로 다른 array
   rest.set([1, 2], 'Test');

   console.log(rest.get([1, 2])); // undefined
   ```

   ```js
   const arr = [1, 2];
   rest.set(arr, 'Test');

   console.log(rest.get(arr)); // 'Test'
   ```

4. Map 내 element 삭제하는 법

   - 특정 element를 삭제하고 싶을 때, `delete(key명)` 메소드 이용
   - elements 전부 삭제하고 싶을 때, `clear()` 메소드 이용

   ```js
   rest.delete(2);

   console.log(rest);
   // Map(8) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 'categories' => Array(4), 'open' => 11, 'close' => 23, …}
   ```

   ```js
   rest.clear();

   console.log(rest); // Map(0)
   ```

5. Map 내 특정 element 찾는 법

   - `has(key명)` 메소드 이용

   ```js
   console.log(rest.has('categories')); // true
   ```

6. Map 내 요소 개수 세는 법

   ```js
   console.log(rest.size);
   ```

## ▶ 118. Maps: Iteration

- Map을 정의하는 또 다른 방법

  - Map()에 Array 안의 Array 형태의 인자를 넣어준다
  - Array 안의 첫번째 요소는 key, 두번째 요소는 value 값을 넣어준다

  ```js
  const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct 🎉'],
    [false, 'Try again!'],
  ]);

  console.log(question);
  // Map(7) {'question' => 'What is the best programming language in the world?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'correct' => 3, …}
  ```

- Object를 Map 자료구조로 변환하는 법

  - `Object.entries()`는 array of array를 반환하므로, 이를 Map()의 인자로 넣어주면 됨

  ```js
  console.log(Object.entries(openingHours));
  // [['thu', {…}], ['fri', {…}], ['sat', {…}]]
  ```

  ```js
  const hoursMap = new Map(Object.entries(openingHours));

  console.log(hoursMap);
  // {'thu' => {…}, 'fri' => {…}, 'sat' => {…}}
  ```

- iterable 하지 않는 Object와 달리, Map은 iterable함

  ```js
  for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
  }

  const answer = Number(prompt('Your answer'));
  console.log(question.get(question.get('correct') === answer));
  ```

- Map을 Array 자료구조로 변환하는 법

  ```js
  console.log([...question]);
  // [Array(2), [1, 'C'], [2, 'Java'], [3, 'JavaScript'], Array(2), Array(2), Array(2)]
  ```

- `Map명.keys()` 메소드

  ```js
  console.log([...question.keys()]);
  // ['question', 1, 2, 3, 'correct', true, false]
  ```

- `Map명.values()` 메소드

  ```js
  console.log([...question.values()]);
  // ['What is the best programming language in the world?', 'C', 'Java', 'JavaScript', 3, 'Correct 🎉', 'Try again!']
  ```

- `Map명.entries()` 메소드

  ```js
  console.log(question.entries());
  // MapIterator {'question' => 'What is the best programming language in the world?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'correct' => 3, …}
  ```

## ▶ 119. Summary: Which Data Structure to Use?

```
Source of Data → Collection of Data → Data Structure
                                        ↳ (simple list인 경우) Array or Set
                                        ↳ (key/value pair인 경우) Object or Map
```

1. Source of Data

   - Program에서의 Data: source code에서 작성한 데이터
   - UI 데이터: user input 데이터나 DOM 데이터
   - 외부 데이터: Web API을 통해 가져온 데이터

2. Data Structure

   - JS Built-In Data Types: Array, Object, Set, Map
   - Not-Built-In Data Types: Stacks, Queues, Linked Lists, Trees, Hash Tables

3. Array

- 순서가 있고 중복된 value list가 필요할 때 사용
- Array는 method가 다양해서, data를 조작할 필요가 있을 때 사용

4. Set

   - unique values가 필요할 때 사용
   - arrays에서 중복을 제거할 때 사용

5. Object

   - 전통적인 key/value pair 데이터 타입
   - `.`이나 `[]`을 사용해서 value에 쉽게 접근 가능
   - functions을 포함해야할 때 사용
   - JSON과 작업해야할 때 사용

6. Map

   - Keys에는 모든 데이터 타입이 가능
   - iterate하기 쉬움
   - size를 계산하기 쉬움
   - 단순히 key와 value를 mapping해야할 때 사용
   - key가 string이 아닌 타입을 넣을 때 사용

## ▶ 121. Working With Strings - Part 1

- string은 primitives type인데 왜 methods가 있을까?

  - 실제 string은 JS engine에서 object로 변환됨
  - 단, string methods는 string을 반환

  ```js
  console.log(new String('jonas')); // String {'jonas'}
  console.log(typeof new String('jonas')); // object
  console.log(typeof new String('jonas').slice(1)); // string
  ```

1. strings 내 특정 index에 위치한 character 가져오기

   ```js
   const airline = 'TAP Air Portugal';
   const plane = 'A320';

   console.log(plane[0]); // T
   ```

2. strings 내 특정 character의 index 값 찾기

   - `string명.indexOf(문자)`: string에서 문자가 나오는 가장 첫 번째 index 반환
   - `string명.lastIndexOf(문자)`: string에서 문자가 나오는 가장 마지막 index 반환
   - 찾고자하는 문자가 string에 없으면, -1을 반환

   ```js
   console.log(airline.indexOf('r')); // 6
   console.log(airline.indexOf('Portugal')); // 8
   console.log(airline.indexOf('portugal')); // -1
   ```

   ```js
   console.log(airline.lastIndexOf('r')); // 10
   ```

3. strings 내 substring 가져오기

   - `string명.slice(startIndex, [endIndex])`: startIndex부터 (endIndex - 1)까지의 문자를 반환해 줌
   - endIndex를 적지 않으면 마지막 인덱스의 문자까지 반환해 줌

   ```js
   console.log(airline.slice(4)); // Air Portugal
   console.log(airline.slice(4, 7)); // Air
   ```

   ```js
   console.log(airline.slice(0, airline.indexOf(' '))); // TAP
   console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal
   ```

   ```js
   console.log(airline.slice(-2)); // al
   console.log(airline.slice(1, -1)); // AP Air Portuga
   ```

4. string 길이 구하기

   ```js
   console.log(airline.length); // 16
   ```

## ▶ 122. Working With Strings - Part 2

1. string을 소문자/대문자로 변환

   - `string명.toLowerCase()`
   - `string명.toUpperCase()`

   ```js
   const airline = 'TAP Air Portugal';

   console.log(airline.toLowerCase()); // tap air portugal
   console.log(airline.toUpperCase()); // TAP AIR PORTUGAL
   ```

2. string 양 끝의 공백을 제거

   - 공백: 공백문자(space, tab, NBSP 등), 모든 개행문자(LF, CR 등)
   - `string명.trim()`

   ```js
   const loginEmail = '  Hello@Jonas.Io \n';
   const normalizedEmail = loginEmail.toLowerCase().trim();

   console.log(normalizedEmail); // hello@jonas.io
   ```

3. string 내 특정 substring을 다른 문자로 치환

   - `string명.replace(regexp|substr, newSubstr|function)`: 어떤 패턴에 일치하는 일부 또는 모든 부분이 교체된 새로운 문자열을 반환
   - `string명.replaceAll(regexp|substr, newSubstr|function)`: 어떤 패턴에 일치하는 모든 부분이 교체된 새로운 문자열을 반환

   ```js
   const priceGB = '288,97£';
   const priceUS = priceGB.replace('£', '$').replace(',', '.');

   console.log(priceUS); // 288.97$
   ```

   ```js
   const announcement =
     'All passengers come to boarding door 23. Boarding door 23!';

   console.log(announcement.replace('door', 'gate'));
   // All passengers come to boarding gate 23. Boarding door 23!
   console.log(announcement.replace(/door/g, 'gate'));
   // All passengers come to boarding gate 23. Boarding gate 23!
   console.log(announcement.replaceAll('door', 'gate'));
   // All passengers come to boarding gate 23. Boarding gate 23!
   ```

4. string 내 특정 substring이 포함되는지 확인

   - `string명.includes(substr)`
   - `string명.startsWith(substr)`
   - `string명.endsWith(substr)`

   ```js
   const plane = 'Airbus A320neo';

   console.log(plane.includes('A320')); // true
   console.log(plane.includes('Boeing')); // false
   console.log(plane.startsWith('Airb')); // true
   console.log(plane.endsWith('neo')); // true
   ```

## ▶ 123. Working With Strings - Part 3

1. string를 지정한 구분자로 여러 개의 substring으로 나누기

   - `string명.split(구분자)`: 구분자로 나눈 substring들을 array에 담아 반환

   ```js
   console.log('a+very+nice+string'.split('+'));
   // ['a', 'very', 'nice', 'string']
   console.log('Jonas Schmedtmann'.split(' '));
   // ['Jonas', 'Schmedtmann']
   ```

2. array의 모든 요소를 지정한 구분자로 연결해 하나의 string을 생성

   - `array명.join(구분자)`

   ```js
   const newName = ['Mr.', 'Jonas', 'Schmedtmann'].join(' ');

   console.log(newName); // Mr. Jonas Schmedtmann
   ```

3. string의 시작/끝을 주어진 길이를 만족하도록 다른 문자열로 채우기

   - `string명.padStart(targetLength [, padString])`
   - `string명.padEnd(targetLength [, padString])`
   - padString을 적지 않을 경우, 공백 `' '`이 default로 채워짐

   ```js
   console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));
   // +++++++++++++++Jonas++++++++++
   ```

4. string을 주어진 횟수만큼 반복해 붙이기

   - `string명.repeat(반복횟수)`

   ```js
   const planesInLine = function (n) {
     console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
   };

   planesInLine(5); // There are 5 planes in line 🛩🛩🛩🛩🛩
   ```
