# ✔ '03-Developer-Skills' 이론 정리

## ▶ 55. Setting up Prettier and VS Code

### 🔹 Prettier

-   Prettier: Code formatter 중 하나
-   VS code editor의 extension으로 Prettier 설치 가능
    -   VS code의 settings에서 `Default Formatter`를 Prettier로 바꿔주기
    -   저장할 때마다 Prettier로 formatting하기 위해 VS code의 settings에서 `Format On Save` 반드시 체크해주기
-   일부 Prettier formatting이 마음에 안든다면, 선택적으로 바꿀 수 있음

    -   [Prettier docs > Configuring > Options](https://prettier.io/docs/en/options.html)를 보고 원하는대로 format를 바꾸면 됨
    -   Prettier options을 적용하는 가장 쉬운 방법은 `.prettierrc` 파일을 만든 후 key-value 형식으로 적는 방법임
    -   ex) 큰 따옴표 → 작은 따옴표, 화살표함수 매개변수 괄호 없앰

    ```
    {
      "singleQuote": true,
      "arrowParens": "avoid"
    }
    ```

### 🔹 Snippet

-   반복 타이핑을 안해도 되게 자동완성해주는 기능
-   File > Preferences > Configure User Snippets 클릭
    -   New Snippet File 클릭 후 snippets 파일명을 정하면 새 파일이 열림
    -   파일 내 적힌 예제대로, `prefix` 부분에 단축어를 적고 `body` 부분에 불러오고 싶은 코드를 적으면 됨
-   ex) `cl` + enter만 해도 `console.log()`가 자동으로 나타나게 설정

    -   body 부분에 `console.log('$1')`처럼 적으면, 커서가 log 괄호 안에 위치하게 됨
    -   하지만, 이렇게 설정하면 log 안에서 변수 자동완성이 실행되지 않아 불편함

    ```
    "Print to console": {
    	"scope": "javascript,typescript",
    	"prefix": "cl",
    	"body": ["console.log();],
    	"description": "Log output to console"
    }
    ```

### 🔹 이외 추천하는 VS code Extensions

-   Auto Code Tag
-   ESLint
-   Image preview
-   Monokai Pro
-   Settings Sync
-   TODO Highlight

## ▶ 56. Installing Node.js and Setting Up a Dev Environment

-   `Live Server` 패키지를 이용하면 직접 브라우저를 새로고침하지 않고 파일을 수정해서 저장하기만 해도 자동으로 브라우저 화면이 변경됨
-   `Live Server` 패키지를 설치하는 2가지 방법
    1. VS Code Extension 이용
    2. npm을 이용해 설치

### 🔹 npm을 이용한 Live Server 설치

-   우선 node.js를 먼저 설치해야 함

    -   node.js: 브라우저가 아닌 컴퓨터 서버에서도 JS를 사용할 수 있게 해주는 JS runtime
    -   터미널에서 아래 코드를 통해 설치 여부를 알 수 있음

    ```bash
    $ node -v
    ```

-   npm(node package manager)를 이용해 live-server 설치

    ```bash
    $ npm install live-server -g
    ```

-   live-server 실행

    ```bash
    $ live-server
    ```

## ▶ 58. How to Think Like a Developer: Become a Problem Solver!

-   문제를 해결하기 위한 4가지 steps

1. 문제를 제대로 이해하자

    - 문제를 명확히 이해하기 위해 몇 가지 적절한 질문을 해보자

2. 문제를 작게 쪼개어 해결해나가자 (Divide and Conquer)

3. 인터넷의 도움을 받자

    - 구글링, Stack Overflow, MDN

4. 실제 코드를 적기 전에, pseudo-code를 먼저 적어보자

## ▶ 60. Debugging (Fixing Errors)

-   Software Bug: computer program에서 예상치 못한 (의도하지 않은) 결과가 나타난 모든 것을 의미
-   Debugging을 위한 4가지 steps: Identify → Find → Fix → Prevent

1. Identify

    - 개발 중에, 소프트웨어 테스트 중에, 배포 후 user report에 의해 발견될 수 있음

2. Find

    - Developer Console이나 Debugger를 이용해서 찾을 수 있음
    - Debugger: 개발자 도구의 source 탭에서 breakpoint를 찍은 후 코드를 한 줄씩 실행시키면서 버그 원인을 파악할 수 있음

3. Fix

4. Prevent
    - Testing software를 이용해서 tests를 적어 같은 bug가 발생하는 것을 방지할 수 있음
