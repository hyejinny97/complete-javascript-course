# ✔ '06-Modal' 이론 정리

## ▶ 79. PROJECT #2: Modal Window

- `PROJECT #2: Modal Window`에 대한 설명

  - 세 개의 'show modal' 버튼을 각각 클릭하면, 모달 창이 뜸
  - 모달 창의 close 버튼이나 모달 창 밖을 클릭하거나, esc 키를 누르면 모달 창이 사라짐

- modal, overlay, close-modal elements를 가져와 변수에 저장하자

  ```js
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.close-modal');
  ```

- open-modal elements를 가져와 변수에 저장하자

  - open-modal 클래스를 가지는 elements는 총 3개
  - `document.querySelector()`를 사용하면, 첫번째인 단 하나의 요소만 가져오게 됨
  - `document.querySelectorAll()`을 사용하면, 해당 클래스를 가지는 요소 전부를 가져와 NodeList에 담아 반환해 줌
  - NodeList는 array와 비슷하기 때문에, 반복문을 사용해서 각 요소를 순회 가능하고 인덱싱을 통해 각 요소를 뽑아낼 수 있음

  ```js
  const btnsOpenModal = document.querySelectorAll('.show-modal');
  ```

## ▶ 80. Working With Classes

- JS를 이용해 직접 특정 element를 스타일링하는 방법 대신, CSS 파일에 미리 특정 selector에 적용할 여러 스타일들을 적어놓은 후 클래스를 추가/삭제하는 방식으로 스타일에 변화를 줄 수 있음

  - `element.classList.add()`: element의 클래스에 클래스명 추가
  - `element.classList.remove()`: element의 클래스에 클래스명 삭제

- 세 개의 'show modal' 버튼을 각각 클릭할 때 모달 창이 뜨게 하자

  ```js
  const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);
  ```

- 모달 창의 close 버튼이나 모달 창 밖을 클릭하면 모달 창이 사라지게 하자

  ```js
  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  ```

## ▶ 81. Handling an "Esc" Keypress Event

- esc 키를 누를 때 모달 창이 사라지게 하자

  - 키보드 키를 누르는 event는 global event이므로, 특정 요소가 아닌 document에 `addEventListener()`를 달아줘야 함

  ```
  document.addEventListener('keydown', Event handler)
  ```

- 어떤 키를 눌렀는지 구분하려면 어떻게 해야할까?

  - 이벤트에 관한 모든 정보는 event object에 담겨있음
  - event object의 `key` property는 어떤 키를 눌렀는지 알려줌 ex) Enter
  - event handler 첫 번째 인자로 event object를 받아서 사용할 수 있음

- 모달 창이 화면에 나타난 상태에서 'esc' 키를 클릭할 때, 모달 창을 hidden 처리해야 함

  ```js
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
  ```
