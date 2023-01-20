# ✔ '01-Fundamentals-Part1' 이론 정리


## ▶ 27. Statement and Expressions

1. Expressions (표현식)
   
   - value를 반환하는 식
   - template literal 안에 표현식 작성 가능
   - ex)

      ```js
      3 + 4           // 7
      '23 is bigger'  // '23 is bigger'
      true && false   // false
      ```

2. Statement (문)

   - value를 반환하지 않음
   - action을 나타내는 완전한 문장
   - ex) if/else statement 등

      ```js
      if (23 > 10) {
        const str = '23 is bigger';
      }
      ```


## ▶ 28. The Conditional (Ternary) Operator

```js
condition ? exprIfTrue : exprIfFalse
```

- if/else statement과 달리 한 줄에 조건식 작성 가능
- conditional operator는 expression이기 때문에 value를 반환함
- 따라서, template literal 안에 작성 가능


## ▶ 30. JavaScript Releases: ES5, ES6+ and ESNext

### 🔹 JS 역사
- 1995년: Brendan Eich에 의해 JS의 첫번째 버전(Mocha)이 만들어짐
- 1996년: Mocha에서 LiveScript, JavaScript로 이름이 바뀜
- 1997년: JS 표준화를 위해 ECMAScript1(ES1)이 release됨
- 2009년: ECMAScript5(ES5)이 release됨
- 2015년: ECMAScript6(ES6, ES2015)이 매우 큰 update를 가지고 release됨
- 2016년 ~ 현재: 매년 ECMAScript가 release 되고 있음

### 🔹 Modern JavaScript Engine 특징
- Backwards Compatible(이전 버전과의 호환성) 특징을 가짐
- 즉, 오래된 기능들은 절대로 없어지지 않고 계속해서 update(추가)될 뿐임

### 🔹 오늘날 Modern JavaScript 사용하는 방법
1. 개발 단계(Development)일 때
    - 최신 구글 크롬을 사용해서 개발하면 됨

2. 배포 단계(Production)일 때
    - `Babel`을 사용해서 코드를 transpile 및 polyfill 해야함
    - 브라우저 호환성을 위해 ES5로 전환해야 함
    - [호환성 표](http://kangax.github.io/compat-table/es6/)
    - `ES5`
      - 모든 브라우저에서 완벽하게 지원 함
    - `ES6+` (`ES6/ES2015`~`ES2020`)
      - 모든 **modern** 브라우저에서 대부분 지원 함
      - transpile/polyfill된 배포 상태(production)에서 대부분의 기능 사용 가능
    - `ESNext` (`ES2021`~)
      - 미래 버전
      - transpile/polyfill된 배포 상태(production)에서 일부 기능을 이미 사용 가능함
