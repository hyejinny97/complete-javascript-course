# ✔ '08-Behind-the-Scenes' 이론 정리

## ▶ 89. An High-Level Overview of JavaScript

### 🔹 JavaScript의 특징

1. High-level

   - c언어와 같은 Low-level 언어를 사용할 땐, 개발자들이 직접 resources(메모리 등)를 관리해야 함
   - 하지만, JS와 파이썬과 같은 High-level 언어를 사용하면, 자동으로 resources 관리를 해줌

2. Garbage-collected

   - 더이상 사용하지 않는 메모리를 자동으로 청소해줌

3. Interpreted or just-in-time compiled

   - JS engine 이 JS 코드를 컴퓨터 언어(0과 1)로 변환해줌(compile)

4. Multi-paradigm

   - paradigm: 코드를 구조화하는 방법 (즉, 코딩 스타일 및 기술)
   - JS는 아래 3가지 프로그래밍이 모두 가능
     - Procedural programming
     - Object-oriented programming (OOP)
     - Functional programming (FP)
   - Imperative vs Declarative

5. Prototype-based object-oriented

   - JS의 대부분은 object임
   - 따라서, 우리가 사용하는 array도 기존 object으로부터 만들어지고, 다양한 methods 상속받기 때문에 push, indexOf와 같은 메소드를 사용가능했던 것임

6. First-class function

   - 함수를 변수처럼 사용 가능
   - 따라서, 함수를 다른 함수의 인자로 넣어줄 수도 있고 함수가 함수를 반환할 수도 있음

7. Dynamic

   - 데이터 타입을 개발자가 직접 정해줄 필요가 없음
   - 이미 특정 타입의 값이 할당된 변수를 다른 타입의 값으로 재할당 가능
   - Dynamic 특징은 bug를 많이 일으킨다는 단점이 있기 때문에, JS 대신 TypeScript 를 사용해 타입을 명시해줄 수 있음

8. Single-threaded / Non-blocking event loop

   - JS는 single thread로 실행되기 때문에, 한번에 오직 하나의 일만 처리함
   - 따라서, 처리하는데 오랜 시간이 걸리는 일을 만났을 때 single thread가 block되는 문제점이 있음
   - event loop을 사용하면 위 문제점 해결 가능
     - 처리하는데 오랜 시간이 걸리는 일은 background에서 처리한 후, 처리 완료되면 main thread에 다시 합침
   - 즉, JS는 Concurrency model에 따라 JS engine이 다수의 일을 한번에 처리가 가능함

## ▶ 90. The JavaScript Engine and Runtime

- Javascript Engine
  - JS code를 실행하는 프로그램
  - ex) V8 Engine (구글 크롬, node.js) 등
  - Call stack, Heap으로 구성
    - Call Stack: code가 실행되는 곳
    - Heap: objects가 저장되는 곳

### 🔹 Compilation vs Interpretation

1. Compilation

   - 전체 code가 한번에 machine code로 변환되어 binary file이 생성된 후, 컴퓨터에 의해 실행됨
   - 즉, compilation된 후 execution이 일어남

   ```
   Source Code --1️⃣Compilation-→ Machine code(Portable file) --2️⃣Execution-→ Program running
   ```

2. Interpretation

   - interpreter가 source code를 한줄한줄 machine code로 변환한 즉시 실행됨

   ```
   Source Code --1️⃣Execution line by line-→ Program running
   ```

3. Just-in-time (JIT) Compilation

   - 전체 code가 한번에 machine code로 변환된 후 즉시 실행됨
   - Portable file을 생성하진 않음
   - Modern Javascript는 Just-in-time (JIT) Compilation 방식을 채택함

   ```
   Source Code --1️⃣Compilation-→ Machine code --2️⃣Execution-→ Program running
   ```

### 🔹 Modern Javascript의 Just-in-time Compilation

```
JS Code --1️⃣Parsing(Read)-→ AST(Abstract Syntax Tree) --2️⃣Compilation-→ Machine code --3️⃣Execution-→ Program running
```

- JS engine이 Js code를 parsing해 AST 생성
- AST는 machine code로 compilation된 후, Call Stack에서 Execution됨
- Execution 중에 Optimization이 되어 다시 Compilation → Execution 과정이 반복됨

### 🔹 JavaScript Runtime

1. Browser에서의 JS Runtime

   - 구글 크롬, MS 엣지 등
   - JS 코드를 실행하는데 필요한 모든 것을 포함한 container
   - JS Runtime > JS Engine, Web API, CallBack Queue
   - JS Engine: Heap, Call Stack을 포함
   - Web API: Dom, Timers, Fetch API 등
   - CallBack Queue: event handler와 같은 Callback function
   - Event Loop: CallBack Queue에 쌓인 Callback function들을 차례로 JS Engine의 Call Stack으로 옮겨줘 실행시킴

2. Node.js에서의 JS Runtime

   - JS 코드를 실행하는데 필요한 모든 것을 포함한 container
   - JS Runtime > JS Engine, C++ Bindings & Thread Pool, CallBack Queue

## ▶ 91. Execution Contexts and The Call Stack

- Source Code는 machine code로 compilation된 후, Call Stack에서 Execution됨
  - 1. global execution context가 생성됨 (function 안은 아님)
  - 2. global execution context 내부의 top-level code가 execution 됨
  - 3. functions가 execution 됨, callback functions은 기다리다가 event loop에 의해 Call Stack으로 옮겨진 후 execution 됨

### 🔹 Execution Context

- 일부 JS 코드가 Execution되는 환경
- 일부 코드가 실행되기 위한 필요한 정보를 모두 담고 있음
- 오직 하나의 global execution context (EC)만 존재
  - global execution context: 어떠한 function 내부가 아닌 코드로 만들어진 default context
- function 당 하나의 execution context가 만들어짐
- execution context가 execution 전, 'creation phase'때 생성하는 것
  - 1. Variable Environment
    - let, const, var 선언 변수
    - functions
    - arguments object
  - 2. Scope chain
  - 3. `this` keyword
- 단, arrow functions의 경우 arguments object와 `this` keyword가 없음

### 🔹 Call Stack

- execution context가 Call Stack에 차곡차곡 쌓이고, 가장 최근에 들어온 것부터 실행됨
- Call Stack = [global EC, first() EC, second() EC]

## ▶ 92. Scope and The Scope Chain

### 🔹 Scope In JS

- Scoping: 특정 variables에 접근할 수 있는 영역을 조직함

- Lexical Scoping: functions과 blocks의 위치에 따라 scoping

- Scope: 특정 variables가 선언된 위치

  - `global` scope, `function` scope, `block` scope이 존재

- Scope of a variable: 특정 variable이 접근할 수 있는 영역

1. Global Scope

   - function/block 밖의 영역
   - global scope에 선언된 variables는 어디서든 접근이 가능함

2. Function Scope

   - variables는 오직 function 내에서만 접근이 가능
   - local scope이라고 부르기도 함

3. Block Scope (ES6)

   - variables는 오직 block 내에서만 접근이 가능
   - `let`, `const` variables는 block-scoped variables
   - `var` variables는 function-scoped variables
   - strict mode에서 functions도 또한 block scope이라 할 수 있음

### 🔹 Scope Chain

- Variable **Lookup** in Scope Chain
- 한 Scope는 parent(outer) scopes에 있는 모든 variables에 접근이 가능함
- 따라서, scope 내에 선언되지 않은 변수가 있다면 scope chain을 따라 parent scope에 해당 변수가 있는지 찾게 됨

### 🔹 Scope Chain vs Call Stack

- Call Stack: functions이 **호출**된 순서에 따라 EC가 쌓이게 됨
- Scope Chain: functions이 **작성**(선언)된 순서에 따라 만들어짐

## ▶ 93. Scoping in Practice

- inner scope에서 outer scope와 동일한 이름의 변수 선언 및 할당 가능

  ```js
  function first() {
    let job = 'developer';
    console.log(job); // 'developer'

    if (true) {
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'John';
      console.log(firstName); // 'John'

      // Reassigning outer scope's variable
      job = 'NEW job!';
    }
    console.log(job); // 'NEW job!'
  }

  const firstName = 'Steven';
  first();
  console.log(firstName); // 'Steven'
  ```

## ▶ 94. Variable Environment: Hoisting and The TDZ

### 🔹 Hoisting in JS

- Hoisting: 특정 타입의 variable을 선언하기 전에 접근/사용이 가능하게 하는 것

  - 변수들이 그들의 scope 최상단으로 끌어당겨짐
  - execution 전에 먼저 변수 선언을 확인하고 variable environment object로 만들어지기 때문에 Hoisting이 발생함

- Temporal Dead Zone (TDZ): `const`, `let` 변수 선언 시, scope 시작부터 선언 전 영역은 해당 변수에 대해서 TDZ임

  |                                      | Hoisted                                | Initial Value       | Scope                    |
  | ------------------------------------ | -------------------------------------- | ------------------- | ------------------------ |
  | function declarations                | O                                      | Actual function     | (strict mode일 때) Block |
  | `var` variables                      | O                                      | undefined           | Function                 |
  | `let`, `const` variables             | X                                      | (uninitialized) TDZ | Block                    |
  | function expressions, arrow function | `var`, `let`, `const` 사용에 따라 다름 |

## ▶ 95. Hoisting and TDZ in Practice

- 항상 `var` 대신 `let`, `const`를 사용하자
- function declarations로 함수를 정의한다면, 반드시 함수 선언 후에 호출하자
- `var`로 선언한 변수는 global window object에 저장됨

## ▶ 96. The this Keyword

- `this` Keyword/Variable: 모든 Execution Context (또는 모든 function)마다 만들어지는 특별한 변수
- `this` 변수의 값은 오로지 function이 호출될 때 할당되고, **호출된 함수에 따라 달라지므로** static하지 않음
- 주의) `this`는 function 자체도 아니고, variable environment도 아님

1. Method

   - method에서의 `this`: method를 호출한 object 자체

2. Simple Function Call

   - function에서의 `this`: strict mode에서 undefined
   - strict mode가 아닌 경우, `this`는 global window object 자체

3. Arrow Function

   - arrow function은 `this`를 가질 수 없음
   - arrow function에서 `this` 변수를 사용하면, parent function(또는 parent scope)에서의 `this`를 상속받게 됨
   - lexical `this`

4. Event Listener

   - event listener에서의 `this`: handler가 붙어진 DOM 요소

5. new, call, apply, bind

## ▶ 97. The this Keyword in Practice

- `this` 키워드는 호출한 대상에 따라 값이 달라짐

  ```js
  const jonas = {
    year: 1991,
    calcAge: function () {
      console.log(this);
    },
  };
  jonas.calcAge(); // { year: 1991, calcAge: f };
  ```

  ```js
  const matilda = {
    year: 2017,
  };

  matilda.calcAge = jonas.calcAge;
  matilda.calcAge(); // { year: 2017, calcAge: f };
  ```

  ```js
  const f = jonas.calcAge;
  f(); // undefined
  ```

## ▶ 98. Regular Functions vs. Arrow Functions

- object method로 regular function이 아닌 arrow function을 사용하는 경우

  - `this` 키워드를 사용할 수 없으므로 regular function을 사용하는 것이 좋음

  ```js
  const jonas = {
    greet: () => {
      console.log(this); // window object
    },
  };
  jonas.greet();
  ```

- object method 안에 함수를 사용하는 경우, `this` 키워드는 함수 자신을 가리키게 되므로 undefined를 나타냄

  ```js
  const jonas = {
    firstName: 'Jonas',
    year: 1991,
    calcAge: function () {
      const isMillenial = function () {
        console.log(this); // undefined
        console.log(this.year >= 1981 && this.year <= 1996); // Error
      };
      isMillenial();
    },
  };
  jonas.calcAge();
  ```

- 해결책 1) ES6 이전에는 함수 밖의 self/that 변수에 `this` 변수의 값을 할당해서 대신 사용했음

  ```js
  const jonas = {
    firstName: 'Jonas',
    year: 1991,
    calcAge: function () {
      const self = this; // self or that
      const isMillenial = function () {
        console.log(self); // jonas object
        console.log(self.year >= 1981 && self.year <= 1996); // true
      };
      isMillenial();
    },
  };
  jonas.calcAge();
  ```

- 해결책 2) ES6 이후에는 arrow function을 사용해서 해결함

  ```js
  const jonas = {
    firstName: 'Jonas',
    year: 1991,
    calcAge: function () {
      const isMillenial = () => {
        console.log(this); // jonas object
        console.log(this.year >= 1981 && this.year <= 1996); // true
      };
      isMillenial();
    },
  };
  jonas.calcAge();
  ```

### 🔹 Arguments Keyword

1. Regular Function

   - function에서의 `arguments`: 함수로 들어온 모든 인자들

   ```js
   const addExpr = function (a, b) {
     console.log(arguments); // Arguments(2) [2, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
     return a + b;
   };
   addExpr(2, 5);
   ```

2. Arrow Function

   - arrow function은 `arguments` 키워드를 가질 수 없음

   ```js
   var addArrow = (a, b) => {
     console.log(arguments); // Error!
     return a + b;
   };
   addArrow(2, 5);
   ```

## ▶ 99. Primitives vs. Objects (Primitive vs. Reference Types)

### 🔹 Primitives

- Primitive Types
- 종류: Number, String, Boolean, Undefined, Null, Symbol, BigInt
- Immutable
- JS Engine에서 Call Stack에 저장됨

  - Primitives 변수는 Call Stack 내에서 값의 주소를 가리킴
  - 값을 변경하면 새로운 주소에 값이 생성되고, 변수는 새로운 주소를 가리키게 됨

  ```js
  let age = 30;
  let oldAge = age;
  age = 31;

  console.log(age); // 31
  console.log(oldAge); // 30
  ```

### 🔹 Objects

- Reference Types
- 종류: Object Literal, Arrays, Functions 등
- mutable
- JS Engine에서 Heap에 저장됨

  - Heap에서 값과 주소가 생성되고, Call Stack 내에서 objects 변수가 해당 Heap 주소를 값으로 가지는 주소를 가리킴
  - 값을 변경하면 Heap 내에 해당 주소의 값이 변경되고, Call Stack에서 이 주소를 참조하고 있던 objects 변수들은 모두 일제히 동일한 값이 변경된 것처럼 보임

  ```js
  const me = {
    name: 'Jonas',
    age: 30,
  };
  const friend = me;
  friend.age = 27;

  console.log(friend); // { name: 'Jonas', age: 27 }
  console.log(me); // { name: 'Jonas', age: 27 }
  ```

## ▶ 100. Primitives vs. Objects in Practice

- `const` 변수일지라도 objects의 properties 변경 가능
  - Call Stack이 아닌 Heap의 value를 변경하는 것이기 때문

### 🔹 objects 얕은 복사

- `Object.assign()`을 사용하면 인자 내의 두 object를 합쳐 새로운 object로 만들어줌

  - 즉, Heap 내에 새로운 주소의 object가 만들어지고 Call Stack 내에서 object 변수가 이 새로운 object 주소를 참조하게 됨
  - 단, objects 안의 objects는 기존의 주소를 reference하므로 얕은 복사라 할 수 있음

  ```js
  const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob'],
  };

  const jessicaCopy = Object.assign({}, jessica);
  jessicaCopy.lastName = 'Davis';

  jessicaCopy.family.push('Mary');
  jessicaCopy.family.push('John');

  console.log('Before marriage:', jessica);
  // {firstName: 'Jessica', lastName: 'Williams', age: 27, family: Array(4)}
  console.log('After marriage: ', jessicaCopy);
  // {firstName: 'Jessica', lastName: 'Davis', age: 27, family: Array(4)}
  ```
