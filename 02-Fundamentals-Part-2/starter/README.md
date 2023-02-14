# ✔ '02-Fundamentals-Part2' 이론 정리


## ▶ 32. Activating Strict Mode

```js
'use strict';
```

- 스크립트 가장 첫 줄에 적어야 활성화됨
- 스크립트 코드에서 발생하는 버그들을 알려줌

- ex) `let` / `const` / `var` 키워드로 사용하지 않았을 때
  
  ```js
  hasDriversLicense = false;

  // Uncaught ReferenceError: hasDriversLicense is not defined
  ```

- ex) 키워드(예약어)를 변수로 선언했을 때

  ```js
  const interface = 'Audio';

  // Uncaught SyntaxError: Unexpected strict mode reserved word
  ```


## ▶ 33. Functions

```js
// 함수 정의
function 함수명(parameter1, parameter2) {
  return 반환값
}

// 함수 호출
함수명(argument);
```

- 한 줄 이상의 코드 블록들을 재사용 가능하게 함
- `함수명()`을 통해 함수를 호출(call, invoke, run)할 수 있음
- 입력값에 따라 서로 다른 값을 반환해줄 수 있음
  - parameter가 없어도 됨
  - 반환값이 없어도 됨


## ▶ 34. Function Declarations vs. Expressions

1. Function Declarations (함수 선언식)

   ```js
   // 함수 정의
   function 함수명(parameter1, parameter2) {
     return 반환값
   }
 
   // 함수 호출
   함수명(argument);
   ```

2. Function Expressions (함수 표현식)
   
   ```js
   // 함수 정의
   const 함수명 = function (parameter1, parameter2) {
     return 반환값
   }
 
   // 함수 호출
   함수명(argument);
   ```

   - Function Declarations와의 공통점
     - Input을 받고 Output을 반환할 수 있다는 점이 동일
     - 함수명 + 소괄호 `()`를 사용해 함수를 호출할 수 있음
   - Function Declarations와의 차이점
     - Function Declarations의 경우, 함수 정의 전 함수 호출 가능
     - Function Expressions의 경우, 함수 정의 전 함수 호출 불가


## ▶ 35. Arrow Functions

```js
// 함수 정의
const 함수명 = parameter => 반환값;

// 함수 호출
함수명();
```
- function body가 정말 단순할 경우 Arrow Function을 사용해 한 줄로 간단하게 작성 가능
- Traditional Functions(Function Declarations, Function Expressions)과의 공통점
   - Input을 받고 Output을 반환할 수 있다는 점이 동일
   - 함수명 + 소괄호 `()`를 사용해 함수를 호출할 수 있음
- 다만, Traditional Functions과 달리 function body에서 `this` 키워드 사용 불가

1. parameter 1개, 한 줄 코드인 경우

   ```js 
   const 함수명 = parameter => 반환값;
   ```
 
   - parameter에 괄호 생략 가능
   - `return` 키워드 생략 가능 

2. parameter 여러개, 한 줄 코드인 경우

   ```js
   const 함수명 = (parameter1, parameter2) => 반환값;
   ```
 
   - parameter들을 반드시 괄호로 감싸야 함
   - `return` 키워드 생략 가능 

3. parameter 여러개, 여러 줄 코드인 경우

   ```js
   const 함수명 = (parameter1, parameter2) => {
       ...
       return 반환값
     };
   ```
 
   - parameter들을 반드시 괄호로 감싸야 함
   - 중괄호 `{}`로 코드 블록을 감싸야 함
   - `return` 키워드 작성해야 함 


## ▶ 36. Functions Calling Other Functions

- 한 함수 내에서 다른 함수를 호출하는 방식
- DRY(Don't Repeat Yourself) 원칙에 따라 반복 사용되는 코드는 함수로 만들어놓고 재사용하는 것이 유지보수에 좋음


## ▶ 39. Introduction to Arrays

- 여러 개의 data(요소)를 담는 container 데이터 구조
- 요소에는 expression이 들어감
  - 따라서, 요소로 string, number, variable, function 등 가능

1. Array 정의하는 방법
   - Array는 원시타입이 아니므로 mutable함
   - 따라서, const로 생성해도 요소를 바꿀 수 있음
   - 다만, const로 생성할 경우 Array 자체를 변경하는 것은 불가
   
   ```js
   // 방법1
   const 변수명 = [ele1, ele2];
 
   // 방법2
   const 변수명 = new Array(ele1, ele2);
   ```

2. Array 내 특정 요소 가져오는 법
   - zero-based이므로 인덱스가 0부터 시작함
   - `length` property를 통해 배열의 길이를 알 수 있음
 
   ```js
   // 첫번째 요소
   변수명[0]
 
   // 마지막 요소
   변수명[변수명.length - 1]
   ```

3. Array 내 특정 요소 변경하는 방법

   ```js
   변수명[0] = ele3
   ```


## ▶ 40. Basic Array Operations (Methods)

### 🔹 element 추가

1. `push()`
   
   - element를 input값으로 넣음
   - array 가장 끝에 요소를 추가해 줌
   - 새로운 배열의 length를 반환해 줌
 
   ```js
   const friends = ['Michael', 'Steven', 'Peter'];
   friends.push('Jay');
   console.log(friends);   // ['Michael', 'Steven', 'Peter', 'Jay']
   ```

2. `unshift()`
   
   - element를 input값으로 넣음
   - array 가장 앞에 요소를 추가해줌
   - 새로운 배열의 length를 반환해 줌
  
   ```js
   const friends = ['Michael', 'Steven', 'Peter'];
   friends.unshift('Jay');
   console.log(friends);   // ['Jay', 'Michael', 'Steven', 'Peter']
   ```

### 🔹 element 제거

1. `pop()`

   - argument를 넣지 않은 경우, array 가장 끝에 요소를 제거해 줌
   - 제거한 요소를 반환해 줌

   ```js
   const friends = ['Michael', 'Steven', 'Peter'];
   friends.pop();
   console.log(friends);   // ['Michael', 'Steven']
   ```

2. `shift()`

   - argument를 넣지 않은 경우, array 가장 앞에 요소를 제거해 줌
   - 제거한 요소를 반환해 줌

   ```js
   const friends = ['Michael', 'Steven', 'Peter'];
   friends.pop();
   console.log(friends);   // ['Michael', 'Steven']
   ```

### 🔹 element 찾기

1. `indexOf()`
   
   - element를 input값으로 넣음
   - 찾고자하는 요소의 index 위치를 반환해 줌
   - 찾고자하는 요소가 없으면 `-1`을 반환해 줌

   ```js
   const friends = ['Michael', 'Steven', 'Peter'];
   console.log(friends.indexOf('Peter'));   // 2
   console.log(friends.indexOf('Bob'));     // -1
   ```

2. `includes()`
   
   - element를 input값으로 넣음
   - 찾고자하는 요소가 array에 있으면 true, 없으면 false를 반환해 줌

   ```js
   const friends = ['Michael', 'Steven', 'Peter'];
   console.log(friends.includes('Peter'));   // true
   console.log(friends.includes('Bob'));     // false
   ```


## ▶ 42. Introduction to Objects

- 각 요소를 특정 변수에 할당시켜 담는 container 데이터 구조
- JS의 대부분은 사실 object로 이루어져 있음
- `key` - `value` 형태
- `value`값으로 모든 데이터 타입 가능
- `key`는 property임

1. Object 정의하는 방법
   
   ```js
   const jonas = {
      firstName: 'Jonas',
      lastName: 'Schmedtmann',
      age: 2037 - 1991,
      job: 'teacher',
      friends: ['Michael', 'Peter', 'Steven']
    }
   ```


## ▶ 43. Dot vs. Bracket Notation

1. Object 내 특정 요소 가져오는 법
   
   1. 방법1) Dot Notation
      - `.` 뒤에 정확한 property(key) 값을 적어야 함
      - 해당 property가 없으면 undefined를 반환해 줌
 
      ```js
      jonas.lastName;
      ```
  
   2. 방법2) Bracket Notation
      - `[]` 안에 expression(연산값, 변수 등) 적을 수 있음
      - 해당 property가 없으면 undefined를 반환해 줌

      ```js
      jonas['lastName'];
      ```

2. Object 내 특정 요소 변경/추가하는 방법

   1. 방법1) Dot Notation
 
      ```js
      jonas.lastName = 'John';
      jonas.location = 'Portugal';
      ```
  
   2. 방법2) Bracket Notation

      ```js
      jonas['lastName'] = 'John';
      jonas['twitter'] = '@jonasschmedtman';
      ```



## ▶ 44. Object Methods

- object 내 property의 value로 string, number, boolean, array, object, function 모두 가능
- 그 중 function을 value로 가지는 property를 `method`라고 부름
- array도 사실 object이기 때문에, 위에서 설명한 `push`, `pop`를 method라고 불렀음

### 🔹 method 호출 방법

- 아래 calcAge는 jonas라는 object의 method

   ```js
   const jonas = {
      birthYear: 1991,
      calcAge: function (birthYear) {
         return 2037 - birthYear;
      }
   };
   ```

1. 방법1) Dot Notation 
   
   ```js
   console.log(jonas.calcAge(1991));  // 46
   ```

2. 방법2) Bracket Notation

   ```js
   console.log(jonas['calcAge'](1991));  // 46
   ```

### 🔹 calcAge 메소드 리팩토링

- calcAge의 인자를 직접 적는 방법
  - DRY 원칙에 어긋남 (비효율적이고 유지/보수에 좋지 않음)

   ```js
   const jonas = {
      birthYear: 1991,
      calcAge: function (birthYear) {
         return 2037 - birthYear;
      }
   };

   console.log(jonas.calcAge(1991));  // 46
   ```

- `this` 키워드를 사용해 object 내 property를 가져와 활용
  - `this`: method를 호출한 object 자기 자신
  - 아래 예제에서 `this`는 jonas object를 가리킴

   ```js
   const jonas = {
      birthYear: 1991,
      calcAge: function () {
         return 2037 - this.birthAge;
      }
   };

   console.log(jonas.calcAge());  // 46
   ```

- 다만, 위 예제에서는 calcAge 메소드를 호출할 때마다 계속 새롭게 계산한 후 반환해 주기 때문에 비효율적임
  - 따라서, calcAge 메소드를 한번 호출할 때 jonas object 내에 age property를 만들어 주면 반복 계산할 필요없이 age를 바로 가져와 사용할 수 있음

   ```js
   const jonas = {
      birthYear: 1991,
      calcAge: function () {
         this.age = 2037 - this.birthAge;
         return this.age;
      }
   };

   console.log(jonas.calcAge());  // 46
   console.log(jonas.age);        // 46
   ```