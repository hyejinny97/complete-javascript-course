# ✔ '04-HTML-CSS' 이론 정리

## ▶ 64. Basic HTML Structure and Elements

-   HTML의 기본 큰 틀은 `<html></html>`,`<head></head>`, `<body></body>`로 구성되어 있음
    -   `! + enter`를 통해 한번에 HTML 틀을 구축할 수 있음
-   `<head></head>`는 문서를 설명하는 부분임
    -   `<title></title>`: 문서의 제목 지정
-   `<body></body>`는 실제 브라우저에 보여지는 요소를 작성하는 부분임
    -   `<h1></h1>` ~ `<h6></h6>`: heading
    -   `<p></p>`: paragraph

## ▶ 65. Attributes, Classes and IDs

-   Attributes: elements를 설명하기 위한 속성

    -   각 elements마다 사용 가능한 attributes가 다름

    ```html
    <a href="https://www.udemy.com/user/jonasschmedtmann/">on Udemy</a>
    <img
    	id="course-image"
    	src="https://img-a.udemycdn.com/course/480x270/437398_46c3_9.jpg"
    />
    ```

-   CSS로 스타일링하거나 JS에 의해 DOM을 조작하기 위해 elements를 select하는 것이 필요
    -   `class`나 `id` 속성을 이용하면 elements를 select할 수 있음
    -   `id`는 페이지에서 단 하나의 elements를 선택하기 위해 사용되지만, `class`는 여러 elements에 사용 가능

## ▶ 66. Basic Styling with CSS

-   elements selector

    ```css
    h1 {
    	font-size: 35px;
    }
    ```

-   class selector

    ```css
    .first {
    	color: red;
    }
    ```

-   id selector

    ```css
    #your-name {
    	background-color: rgb(255, 220, 105);
    	border: 5px solid #444;
    }
    ```

-   font-size, font-family 등 일부 property는 inherited되어 child elements에도 영향을 미침

## ▶ 67. Introduction to the CSS Box Model

-   Box Model: content < padding < border < margin
-   CSS 초기화

    ```css
    * {
    	margin: 0;
    	padding: 0;
    	box-sizing: border-box;
    }
    ```

-   여러 selectors 동시에 스타일링

    ```css
    input,
    button {
    	padding: 10px;
    	font-size: 16px;
    }
    ```

-   Child selector

    ```css
    #your-name h2 {
    	color: olivedrab;
    }
    ```
