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