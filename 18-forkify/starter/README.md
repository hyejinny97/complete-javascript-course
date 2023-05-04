# ✔ '18-forkify' 이론 정리

## ▶ 286. Project Overview and Planning (I)

- [데모 사이트](https://forkify-v2.netlify.app/)
- `forkify`
  : User Stories → Features → Flowchart → Architecture

### 🔹 User Stories

|       | As a [type of user] | I want [an action]                                            | so that [a benefit]                        |
| ----- | ------------------- | ------------------------------------------------------------- | ------------------------------------------ |
| **1** | user                | search for recipes                                            | find new ideas for meals                   |
| **2** | user                | update the number of servings                                 | cook a meal for different number of people |
| **3** | user                | bookmark recipes                                              | review them later                          |
| **4** | user                | create my own recipes                                         | organize in the same app                   |
| **5** | user                | see my bookmarks/own recipes when i leave and come back later | close the app safely after cooking         |

### 🔹 Features

1. Search for recipes

   - Search functionality 👉 Search input field에 키워드를 넣어 검색하면 API를 통해 관련된 데이터 전달받음
   - pagination과 함께 recipes list 결과를 화면에 나타냄
   - cooking time, servings, ingredients와 함께 레시피를 화면에 나타냄

2. Update the number of servings

   - Change servings functionality 👉 현재 servings 수에 따라 모든 재료 수정

3. Bookmark recipes

   - Bookmarking functionality 👉 북마크한 모든 레시피를 화면에 나타냄

4. Create my own recipes

   - 사용자가 자신의 레시피를 업로드함
   - 사용자의 레시피는 자동으로 북마크됨
   - 본인의 레시피는 오직 사용자 자신만 볼 수 있음

5. See my bookmarks and own recipes when I leave the app and come back later

   - local storage를 통해 브라우저에 bookmark 데이터를 저장
   - 페이지 로드 시 local storage에 저장된 bookmark 데이터를 모두 읽어옴

### 🔹 Flowchart

- User stories 1번(Search for recipes)의 Features에 대한 flowchart만 일단 작성

  ![](./forkify-flowchart-part-1.png)

## ▶ 288. Loading a Recipe from API

- Forkify API: <https://forkify-api.herokuapp.com/v2>
- Forkify API를 통해 특정 키워드에 대한 recipe 데이터 가져오기

  ```js
  const showRecipe = async function () {
    try {
      const res = await fetch(
        'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      );
      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);

      let { recipe } = data.data;
      recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
    } catch (err) {
      alert(err);
    }
  };
  ```

## ▶ 289. Rendering the Recipe

- 특정 키워드에 대한 recipe 데이터를 가져오는데 성공하면, 해당 데이터를 화면에 나타내기

  - 데이터를 가져오는 동안 화면에 spinner가 돌아가게 하자

- 문제점) 현 JS 파일에서 `<use href="src/img/icons.svg#icon-clock"></use>`과 같은 url을 사용할 경우, parcel에 의해 bundling되면 dist 폴더로 경로가 달라지기 때문에 `icons.svg` 파일에 있는 아이콘을 가져오지 못함

  - 해결책) 현 JS 파일에서 `icons.svg` 파일을 import해서 url을 변수에 저장한 후 사용하면 됨
  - Parcel 버전 1의 경우, static files(image/audio file 등)을 import할 때 상대경로만 적어주면 됨
  - Parcel 버전 2의 경우, static files을 import할 때 상대경로 앞에 `url:../`을 추가로 적어줘야 함

  ```js
  // import icons from '../img/icons.svg'; // Parcel 1
  import icons from 'url:../../img/icons.svg'; // Parcel 2
  ```

  ```js
  const renderSpinner = function (parentEl) {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    parentEl.innerHTML = '';
    parentEl.inserAdjancentHTML('afterbegin', markup);
  };
  ```

  ```js
  const showRecipe = async function () {
    try {
      // 1) Loading recipe
      renderSpinner()
      ...

      // 2) Rendering recipe
      const markup = `
      <figure class="recipe__fig">
        <img src="${data.image}" alt="${data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${data.ingredients.map(ing => {`
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `}).join('')}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
      `;
      recipeContainer.innerHTML = '';
      recipeContainer.inserAdjancentHTML('afterbegin', markup);
    } catch (err) {
      alert(err);
    }
  };
  ```

## ▶ 290. Listening For load and hashchange Events

- 사용자가 recipe list에 특정 recipe를 선택하거나 특정 recipe ID를 가진 페이지를 로드할 때, 위에서 작성한 showRecipe 함수가 호출되도록 event 설정을 해보자

  - 특정 recipe를 선택하거나 특정 recipe ID를 가진 페이지를 로드할 때, `https://forkify-v2.netlify.app/#5ed6604591c37cdc054bcb34`와 같이 `#`(hash) 뒤에 recipe ID가 들어가게 됨
  - 따라서 hashchange event가 일어나거나 페이지가 로드될 때, showRecipe 함수가 호출되도록 작성하자

  ```js
  const showRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;

        // 1) Loading recipe
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        ...
    } catch(err) {
      ...
    }
  }

  ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
  ```

## ▶ 291. The MVC Architecture

### 🔹 Architecture을 고려해야하는 이유

- architecture의 중요성은 Structure, Maintainability, Expandability 세 가지로 설명할 수 있음

  - Structure: 코드를 어떻게 organize할지 구조화하는 것이 필요
  - Maintainability: 미래에 코드를 쉽게 수정하기 위해 필요
  - Expandability: 미래에 쉽게 새로운 기능을 추가하기 위해 필요

- 자신의 스타일대로 architecture를 만들어 app을 구현해나갈 수 있음
- `MVC`, `MVP`, `Flux` 등 잘 알려진 architecture를 이용해 app을 구현해나갈 수도 있음

### 🔹 Architecture의 components

1. Business Logic

   - 실제 business problem을 푸는 code
   - 어떤 business이고 어떤 것을 필요로 하는냐에 따라 직접적으로 연관이 있음
   - ex) 메시지 보내기, 세금 계산 등

2. State

   - app과 관련된 모든 데이터들은 필수로 저장되어야 함
   - single source of truth
   - state가 변하면 UI가 변해야 하고, UI가 변하면 state가 변해야 함 (즉, UI와 state는 항상 싱크가 맞아야 함)
   - Redux 등과 같은 state 라이브러리가 존재

3. HTTP Library

   - AJAX requests를 만들고 받는 역할

4. Application Logic (Router)

   - application 자체를 실행하는 것과 관련된 코드
   - navigation이나 UI events를 handle

5. Presentation Logic

   - application의 화면에 관환 모든 코드
   - state를 화면에 나타냄

### 🔹 MVC Architecture

- Model-View-Controller

  - `Model`: **Business Logic, State, HTTP Library**를 담당
  - `View`: **Presentation Logic**을 담당
  - `Controller`: **Application Logic**을 담당

    - model과 view를 연결시켜주는 다리 역할
    - UI events를 다루고, model과 view에게 일을 전달하게 됨

- 지금까지의 코드에 MVC pattern을 적용해보자

  - user가 recipe를 선택하거나 recipe ID로 페이지를 로드함 👉 Controller
  - async하게 recipe 데이터를 load함 👉 Model
  - Controller가 Model로부터 데이터를 받아 View로 넘겨줌
  - recipe를 화면에 render함 👉 View

- MVC Architecture를 사용해 Forkify project를 설계해보자

  ![](./forkify-architecture-recipe-loading.png)

## ▶ 292. Refactoring for MVC

- 위에서 설계한 MVC Architecture에 따라 지금까지의 코드를 리팩토링해보자

  - recipe 재료의 용량을 나타낼 때, `0.5` 대신 `1/2` 분수 형태로 표현하기 위해 [fractional 라이브러리](https://www.npmjs.com/package/fractional)를 install한 후 recipeView.js에서 import해 사용하자
  - View는 각 요소 별로 파일을 나누는데, 이때 각 view 파일은 class로 구현
    - 이유1) 공통된 methods를 한 파일로 묶어 나중에 상속받기 위함
    - 이유2) private properties/methods를 두기 위함

  ```js
  // model.js
  export const state = {
    recipe: {},
  };

  export const loadRecipe = async function (id) {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);

      const { recipe } = data.data;
      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
    }
  };
  ```

  ```js
  // controller.js
  import * as model from './model.js';
  import recipeView from './views/recipeView.js';

  const controlRecipes = async function () {
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;

      recipeView.renderSpinner();

      // 1) Loading recipe
      await model.loadRecipe(id);

      // 2) Rendering recipe
      recipeView.render(model.state.recipe);
    } catch (err) {
      console.error(err);
    }
  };

  ['hashchange', 'load'].forEach(ev =>
    window.addEventListener(ev, controlRecipes)
  );
  ```

  ```js
  // recipeView.js
  import icons from 'url:../../img/icons.svg';
  import { Fraction } from 'fractional';

  class RecipeView {
    _parentElement = document.querySelector('.recipe');
    _data;

    render(data) {
      this._data = data;
      const markup = this._generateMarkup();
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
      this._parentElement.innerHTML = '';
    }

    renderSpinner() {
      const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _generateMarkup() {
      return `
        ...
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient)
              .join('')}
        </div>
        ...
      `;
    }

    _generateMarkupIngredient(ing) {
      return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
    `;
    }
  }

  export default new RecipeView();
  ```

## ▶ 293. Helpers and Configuration Files

- `config.js` 파일과 `helper.js` 파일을 생성하고, 위 코드 리팩토링 하기

  - `config.js`: project에서 constant하거나 재사용해야하는 'variables'을 모아두는 파일으로, 쉽게 변수를 찾아 재사용하고 유지보수하기에 좋음
    - constant variables는 모두 대문자로 표시 (ex) API_URL, TIMEOUT_SEC)
  - `helper.js`: project에서 재사용해야하는 'functions'을 모아두는 파일으로, 쉽게 재사용하고 유지보수하기에 좋음

  ```js
  // config.js
  export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
  export const TIMEOUT_SEC = 10;
  ```

  ```js
  // helper.js
  import { TIMEOUT_SEC } from './config.js';

  const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  export const getJSON = async function (url) {
    try {
      const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  ```

  ```js
  import { API_URL } from './config.js';
  import { getJSON } from './helpers.js';

  export const loadRecipe = async function (id) {
    try {
      const data = await getJSON(`${API_URL}${id}`);
      ...
    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
      throw err;
    }
  };
  ```

## ▶ 294. Event Handlers in MVC: Publisher-Subscriber Pattern

- 문제점) 아래와 같은 DOM과 관련된 event listener는 'controller.js' 파일이 아닌 'recipeView.js' 파일에 존재해야 함

  - `events listener`는 **view**에 존재해야 함
  - `events handler`는 **controller**에 존재해야 함

  ```js
  // controller.js
  ['hashchange', 'load'].forEach(ev =>
    window.addEventListener(ev, controlRecipes)
  );
  ```

- 해결책) `Publisher-Subscriber Pattern`을 사용해 events listener와 events handler를 view, controller에 각각 분리시킬 수 있음

  - Publisher: 언제 반응해야하는지 알고 있는 코드
  - Subscriber: 반응하기를 원하는 코드
  - Publisher에 Subscriber function을 인자로 전달함으로써 subscribe할 수 있음
  - events listener인 `addHandlerRender()` 👉 Publisher
  - events handler인 `controlRecipes()` 👉 Subscriber

  ```js
  // controller.js
  import recipeView from './views/recipeView.js';

  const init = function () {
    recipeView.addHandlerRender(controlRecipes);
  };

  init();
  ```

  ```js
  // recipeView.js
  class RecipeView {
    ...
    addHandlerRender(handler) {
      ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }
    ...
  }
  ```

## ▶ 295. Implementing Error and Success Messages

- 잘못된 recipe ID로 접근했을 때와 같이 model로부터 데이터를 가져오는데 실패하면, 화면에 Error message를 띄워 사용자들이 확인할 수 있게끔 하자

  - 일반적인 message를 render하는 기능도 넣어보자
  - Error message/일반 message를 render하는 기능 모두 view에 포함되어야 함

  ```js
  // recipeView.js
  class RecipeView {
    ...
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';
    ...
    renderError(message = this._errorMessage) {
      const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
      const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  }
  ```

  ```js
  // controller.js
  const controlRecipes = async function () {
    try {
      ...
    } catch (err) {
      recipeView.renderError();
      console.error(err);
    }
  };
  ```

## ▶ 296. Implementing Search Results - Part 1

- 검색창에 recipe를 얻고자 하는 요리를 검색했을 때, API를 통해 해당 요리와 관련된 모든 레시피 데이터를 가지고 오자

  - Publisher-Subscriber pattern을 이용해, view에 검색창 submit에 대한 event listener를 두고 controller에 event handler를 둔 후, event handler를 event listener의 인자로 넣어줘 subscribe하게 하자
  - 즉, 검색창에서 submit event(publish)가 일어날 때마다 subscribe한 event handler가 실행되게 됨

  ```js
  // model.js
  export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
    },
  };

  export const loadSearchResults = async function (query) {
    try {
      state.search.query = query;

      const data = await getJSON(`${API_URL}?search=${query}`);

      state.search.results = data.data.recipes.map(rec => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
        };
      });
    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
      throw err;
    }
  };
  ```

  ```js
  // searchView.js
  class SearchView {
    _parentEl = document.querySelector('.search');

    getQuery() {
      const query = this._parentEl.querySelector('.search__field').value;
      this._clearInput();
      return query;
    }

    _clearInput() {
      this._parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
      this._parentEl.addEventListener('submit', function (e) {
        e.preventDefault();
        handler();
      });
    }
  }

  export default new SearchView();
  ```

  ```js
  // controller.js
  import searchView from './views/searchView.js';

  const controlSearchResults = async function () {
    try {
      // 1) Get search query
      const query = searchView.getQuery();
      if (!query) return;

      // 2) Load search results
      await model.loadSearchResults(query);
    } catch (err) {
      console.log(err);
    }
  };

  const init = function () {
    ...
    searchView.addHandlerSearch(controlSearchResults);
  };

  init();
  ```

## ▶ 297. Implementing Search Results - Part 2

- search 결과 얻은 데이터들을 화면에 나타내자

  - 일단 먼저 대부분의 view 파일에서 공통으로 사용되는 render(), \_clear(), renderSpinner(), renderError(), renderMessage()과 같은 일부 함수들은 따로 `View.js`에 모아서 다른 view 파일들이 상속 받아 사용할 수 있음

  ```js
  // View.js
  import icons from 'url:../../img/icons.svg';

  export default class View {
    _data;

    render(data) {
      if (!data || (Array.isArray(data) && data.length === 0))
        return this.renderError();
      ...
    }

    _clear() {...}

    renderSpinner() {...}

    renderError(message = this._errorMessage) {...}

    renderMessage(message = this._message) {...}
  }
  ```

  ```js
  // resultsView.js
  import View from './View.js';

  class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again ;)';
    _message = '';

    _generateMarkup() {
      return this._data.map(result => this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
      return `
        <li class="preview">
          <a class="preview__link href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
        </li>
      `;
    }
  }

  export default new ResultsView();
  ```

  ```js
  // controller.js
  import resultsView from './views/resultsView.js';

  const controlSearchResults = async function () {
    try {
      resultsView.renderSpinner();
      ...
      // 3) Render results
      resultsView.render(model.state.search.results);
    } catch (err) {
      console.log(err);
    }
  };
  ```

## ▶ 298. Implementing Pagination - Part 1

- Search 결과 results 중 화면에 한 페이지당 10개의 results만 보여지도록 해보자

  - 페이지당 results 개수는 constant하므로 `config.js` 파일에 기록한 후, 가져와 사용하자
  - 특정 페이지에 해당하는 10개의 results를 반환하는 getSearchResultsPage() 함수를 만들자

  ```js
  // config.js
  ...
  export const RES_PER_PAGE = 10;
  ```

  ```js
  // model.js
  import { API_URL, RES_PER_PAGE } from './config.js';

  export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
      page: 1,
      resultsPerPage: RES_PER_PAGE,
    },
  };

  ...

  export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage; // 0
    const end = page * state.search.resultsPerPage; // 9

    return state.search.results.slice(start, end);
  };
  ```

  ```js
  // controller.js
  const controlSearchResults = async function () {
    try {
      ...
      // 3) Render results
      resultsView.render(model.getSearchResultsPage());
    } catch (err) {
      console.log(err);
    }
  };
  ```

## ▶ 299. Implementing Pagination - Part 2

- 페이지네이션을 구현하고, 페이지를 클릭할 때마다 각 페이지에 해당하는 results를 화면에 나타내보자

  ```js
  // paginationView.js
  import View from './View.js';
  import icons from 'url:../../img/icons.svg'; // Parcel 2

  class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
      this._parentElement.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn--inline');
        if (!btn) return;

        const goToPage = +btn.dataset.goto;
        handler(goToPage);
      });
    }

    _generateMarkup() {
      const curPage = this._data.page;
      const numPages = Math.ceil(
        this._data.results.length / this._data.resultsPerPage
      );

      // Page 1, and there are other pages
      if (curPage === 1 && numPages > 1) {
        return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
      }

      // Last page
      if (curPage === numPages && numPages > 1) {
        return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
        `;
      }

      // Other page
      if (curPage < numPages) {
        return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
      }

      // Page 1, and there are NO other pages
      return '';
    }
  }

  export default new PaginationView();
  ```

  ```js
  // controller.js
  import paginationView from './views/paginationView.js';

  const controlSearchResults = async function () {
    try {
      ...
      // 4) Render initial pagination buttons
      paginationView.render(model.state.search);
    } catch (err) {
      console.log(err);
    }
  };

  const controlPagination = function (goToPage) {
    // 1) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 2) Render NEW pagination buttons
    paginationView.render(model.state.search);
  };

  const init = function () {
    ...
    paginationView.addHandlerClick(controlPagination);
  };

  init();
  ```

## ▶ 300. Project Planning II

### 🔹 Flowchart

- User stories 2,3,5번(Update the number of servings, Bookmark recipes, See my bookmarks when I leave the app and come back later)의 Features에 대한 flowchart만 일단 작성

  ![](./forkify-flowchart-part-2.png)

## ▶ 301. Updating Recipe Servings

- serving 수를 바꾸면 recipe 내 각 재료들의 quantity가 바뀌도록 구현하자

  ```js
  // model.js
  export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
  };
  ```

  ```js
  // controller.js
  const controlServings = function (newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    recipeView.render(model.state.recipe);
  };

  const init = function () {
    ...
    recipeView.addHandlerUpdateServings(controlServings);
  };

  init();
  ```

  ```js
  // recipeView.js
  class RecipeView extends View {
    ...
    addHandlerUpdateServings(handler) {
      this._parentElement.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn--update-servings');
        if (!btn) return;

        const { updateTo } = btn.dataset;
        if (+updateTo > 0) handler(+updateTo);
      });
    }

    _generateMarkup() {
      return `
        <div class="recipe__details">
          ...
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
        ...
        </div>
      `;
    }
  }
  ```

## ▶ 302. Developing a DOM Updating Algorithm

- 문제점) servings 수를 변경했을 때, `recipeView.render(model.state.recipe)`을 통해 전체 recipe html을 render하는 것은 사실 비효율적이고 이미지가 깜빡거리는 현상이 생김

  - 해결책) '현재 actual DOM'과 '새로운 virtual DOM'을 비교해가며 차이가 있는 text, attribute 부분만 변경해 수정해보자
  - generateMarkup()은 string 형태의 html을 반환하므로, `document.createRange().createContextualFragment()`을 사용해 string 형태의 html을 DOM node objects로 변환한 '새로운 virtual DOM'을 생성하자
    - `document.createRange()`: 새로운 Range 객체를 반환
    - `Range객체.createContextualFragment(tagString)`: text를 document fragment object로 변환 후 반환시켜줌
  - `Node1.isEqualNode(Node2)` method를 통해 node1과 node2가 같은지 비교 가능
  - `Node.firstChild?.nodeValue`을 통해 첫번째 노드가 text node를 확인하고 empty string이 아닌지 확인함으로써, 변경된 text가 있는 바로 그 node인지 찾을 수 있음

  ```js
  // View.js
  export default class View {
    ...
    update(data) {
      this._data = data;
      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));

      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];

        // Updates changed TEXT
        if (
          !newEl.isEqualNode(curEl) &&
          newEl.firstChild?.nodeValue.trim() !== ''
        ) {
          curEl.textContent = newEl.textContent;
        }

        // Updates changed ATTRIBUTES
        if (!newEl.isEqualNode(curEl))
          Array.from(newEl.attributes).forEach(attr =>
            curEl.setAttribute(attr.name, attr.value)
          );
      });
    }
  }
  ```

  ```js
  // controller.js
  const controlServings = function (newServings) {
    ...
    // Update the recipe view
    recipeView.update(model.state.recipe);
  };
  ```

- 마찬가지로 `update()` method를 이용해서, search results에서 클릭한 result 부분만 mark해보자

  ```js
  // resultsView.js
  class resultsView extends View {
    ...
    _generateMarkup() {
      const id = window.location.hash.slice(1);

      return `
        <li class="preview">
          <a class="preview__link ${
            this._data.id === id ? 'preview__link--active' : ''
          }" href="#${this._data.id}">
            ...
          </a>
        </li>
      `;
    }
  }
  ```

  ```js
  // controller.js
  const controlRecipes = async function () {
    try {
      ...
      // 0) Update results view to mark selected search result
      resultsView.update(model.getSearchResultsPage());
      ...
    } catch (err) {
      recipeView.renderError();
      console.error(err);
    }
  };
  ```

## ▶ 303. Implementing Bookmarks - Part 1

- recipe view에서 bookmark를 클릭했을 때, state에 bookmark된 recipe를 기록하고 recipe view에 있는 북마크 아이콘이 변경되도록 해보자

  ```js
  // model.js
  export const state = {
    ...
    bookmarks: [],
  };

  export const loadRecipe = async function (id) {
    try {
      ...
      if (state.bookmarks.some(bookmark => bookmark.id === id))
        state.recipe.bookmarked = true;
      else state.recipe.bookmarked = false;
    } catch (err) {
      ...
    }
  };

  export const addBookmark = function (recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  };

  export const deleteBookmark = function (id) {
    // Delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;
  };
  ```

  ```js
  // controller.js
  const controlAddBookmark = function () {
    // 1) Add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    // 2) Update recipe view
    recipeView.update(model.state.recipe);
  };

  const init = function () {
    ...
    recipeView.addHandlerAddBookmark(controlAddBookmark);
  };

  init();
  ```

  ```js
  // recipeView.js
  class RecipeView extends View {
    ...
    addHandlerAddBookmark(handler) {
      this._parentElement.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn--bookmark');
        if (!btn) return;
        handler();
      });
    }

    _generateMarkup() {
      return `
        <div class="recipe__details">
          ...
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
        this._data.bookmarked ? '-fill' : ''
      }"></use>
            </svg>
          </button>
        </div>
        ...
      `;
    }
  }
  ```

## ▶ 304. Implementing Bookmarks - Part 2

- recipe view에서 bookmark를 클릭했을 때, '.bookmark\_\_list'에 북마크한 recipe를 저장하고 나타내보자

  ```js
  // bookmarksView.js
  import View from './View.js';
  import icons from 'url:../../img/icons.svg';

  class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    _message = '';

    _generateMarkup() {
      return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
      const id = window.location.hash.slice(1);

      return `
        <li class="preview">
          <a class="preview__link ${
            result.id === id ? 'preview__link--active' : ''
          }" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
              <div class="preview__user-generated ${
                result.key ? '' : 'hidden'
              }">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
      `;
    }
  }

  export default new BookmarksView();
  ```

  ```js
  // controller.js
  const controlRecipes = async function () {
    try {
      ...
      // 0) Update results view to mark selected search result
      resultsView.update(model.getSearchResultsPage());

      // 1) Updating bookmarks view
      bookmarksView.update(model.state.bookmarks);
      ...
    } catch (err) {
      recipeView.renderError();
      console.error(err);
    }
  };

  const controlAddBookmark = function () {
    ...
    // 3) Render bookmarks
    bookmarksView.render(model.state.bookmarks);
  };
  ```

- 현재 resultsView.js와 bookmarksView.js는 상당 부분 중복된 코드가 존재하므로, 겹치는 부분을 previewView.js 파일에 분리해 두는 방식으로 리팩토링하자

  ```js
  // previewView.js
  import View from './View.js';
  import icons from 'url:../../img/icons.svg'; // Parcel 2

  class PreviewView extends View {
    _parentElement = '';

    _generateMarkup() {
      const id = window.location.hash.slice(1);

      return `
        <li class="preview">
          <a class="preview__link ${
            this._data.id === id ? 'preview__link--active' : ''
          }" href="#${this._data.id}">
            <figure class="preview__fig">
              <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
      `;
    }
  }

  export default new PreviewView();
  ```

  ```js
  // View.js
  render(data, render = true) {
    ...
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    ...
  }
  ```

  ```js
  // resultsView.js
  import previewView from './previewView.js';

  class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again ;)';
    _message = '';

    _generateMarkup() {
      return this._data
        .map(result => previewView.render(result, false))
        .join('');
    }
  }
  ```

  ```js
  // bookmarksView.js
  import previewView from './previewView.js';

  class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    _message = '';

    _generateMarkup() {
      return this._data
        .map(bookmark => previewView.render(bookmark, false))
        .join('');
    }
  }
  ```

## ▶ 305. Storing Bookmarks With localStorage

- recipe를 북마크로 설정/취소할 때마다 localStorage에 모든 bookmarks을 저장하고, 페이지가 reload될 때마다 localStorage에 저장된 모든 bookmarks를 가져와 화면에 나타내자

  ```js
  // model.js
  const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  };

  export const addBookmark = function (recipe) {
    ...
    persistBookmarks();
  };

  export const deleteBookmark = function (id) {
    ...
    persistBookmarks();
  };

  const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
  };
  init();
  ```

  ```js
  // bookmarksView.js
  class BookmarksView extends View {
    ...
    addHandlerRender(handler) {
      window.addEventListener('load', handler);
    }
    ...
  }
  ```

  ```js
  // controller.js
  const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
  };

  const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    ...
  };
  init();
  ```

## ▶ 306. Project Planning III

### 🔹 Flowchart

- User stories 4번(Create my own recipes)의 Features에 대한 flowchart 작성

  ![](./forkify-flowchart-part-3.png)

## ▶ 307. Uploading a New Recipe - Part 1

- 'Add Recipe' 버튼을 클릭했을 때 모달 창이 뜨고, close 버튼이나 overlay를 클릭했을 때 모달창이 사라지게 해보자

  ```js
  // addRecipeView.js
  import View from './View.js';
  import icons from 'url:../../img/icons.svg'; // Parcel 2

  class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
      super();
      this._addHandlerShowWindow();
      this._addHandlerHideWindow();
    }

    toggleWindow() {
      this._overlay.classList.toggle('hidden');
      this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
      this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
      this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
      this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }
  }

  export default new AddRecipeView();
  ```

## ▶ 308. Uploading a New Recipe - Part 2

- recipe form을 작성한 후 제출하면, 아래의 일이 진행되도록 구현해보자

  - 1. forkify API에 작성한 recipe 데이터를 forkify 사이트에서 발급받은 key와 함께 보내자
  - 2. model 내 state에 새로 작성한 recipe 데이터를 저장하자
  - 3. bookmark list에 추가하자
  - 4. 화면에서 form 모달창이 사라지고, 작성한 recipe가 나타나게 하자

  ```js
  // addRecipeView.js
  class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded :)';
    ...
    addHandlerUpload(handler) {
      this._parentElement.addEventListener('submit', function (e) {
        e.preventDefault();
        const dataArr = [...new FormData(this)]; // [['title', 'pizza'], ...]
        const data = Object.fromEntries(dataArr); // {'title': 'pizza', ...}
        handler(data);
      });
    }
  }
  ```

  ```js
  // config.js
  ...
  export const KEY = 'e045ba94-1cc0-4c85-916c-b5d9a17ca3f3';
  export const MODAL_CLOSE_SEC = 2.5;
  ```

  ```js
  // helpers.js
  ...
  export const sendJSON = async function (url, uploadData) {
    try {
      const fetchPro = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });

      const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  ```

  ```js
  // model.js
  import { API_URL, RES_PER_PAGE, KEY } from './config.js';
  import { getJSON, sendJSON } from './helpers.js';

  const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    };
  };

  export const loadRecipe = async function (id) {
    try {
      ...
      state.recipe = createRecipeObject(data);
      ...
    } catch (err) {
      ...
    }
  };

  export const uploadRecipe = async function (newRecipe) {
    try {
      const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
          const ingArr = ing[1].split(',').map(el => el.trim());
          if (ingArr.length !== 3)
            throw new Error(
              'Wrong ingredient fromat! Please use the correct format :)'
            );

          const [quantity, unit, description] = ingArr;

          return { quantity: quantity ? +quantity : null, unit, description };
        });

      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      };

      const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
      state.recipe = createRecipeObject(data);
      addBookmark(state.recipe);
    } catch (err) {
      throw err;
    }
  };
  ```

  ```js
  // controller.js
  import { MODAL_CLOSE_SEC } from './config.js';
  import addRecipeView from './views/addRecipeView.js';

  const controlAddRecipe = async function (newRecipe) {
    try {
      // Show loading spinner
      addRecipeView.renderSpinner();

      // Upload the new recipe data
      await model.uploadRecipe(newRecipe);

      // Render recipe
      recipeView.render(model.state.recipe);

      // Success message
      addRecipeView.renderMessage();

      // Close form window
      setTimeout(function () {
        addRecipeView.toggleWindow();
      }, MODAL_CLOSE_SEC * 1000);
    } catch (err) {
      console.error('💥', err);
      addRecipeView.renderError(err.message);
    }
  };

  const init = function () {
    ...
    addRecipeView.addHandlerUpload(controlAddRecipe);
  };
  init();
  ```

- `new FormData(form)`

  - form 인자를 넣을 경우, form 데이터를 key/value 값으로 쉽게 얻을 수 있음
  - `form`: HTML <form> 요소
  - 반환값: FormData객체

- `Object.fromEntries(iterable)`

  - key/value pair의 목록을 객체로 바꿔줌

## ▶ 309. Uploading a New Recipe - Part 3

- recipe 작성 후 추가했을 때, bookmarksView에도 render되어 볼 수 있게 하자

  - 또한, 링크도 바꿔주어 reload해도 현재 작성한 recipe를 볼 수 있게 하자
  - `window.history`
    - History 객체로의 참조를 반환
    - History 객체는 브라우저의 세션 기록을 조작할 때 사용
  - `history.pushState(state, title[, url])`
    - 브라우저의 세션 기록 스택에 상태를 추가
    - `url`: 새로운 세션 기록 항목의 URL

  ```js
  // controller.js
  const controlAddRecipe = async function (newRecipe) {
    try {
      ...
      // Render bookmark view
      bookmarksView.render(model.state.bookmarks);

      // Change ID in URL
      window.history.pushState(null, '', `#${model.state.recipe.id}`);

      // Close form window
      ...
    } catch (err) {
      console.error('💥', err);
      addRecipeView.renderError(err.message);
    }
  };
  ```

- 새로 추가한 recipe는 recipeView, resultsView, bookmarksView 각각에 모두 사람 아이콘이 나타나게 하자

  - forkify API에서 recipe와 search results 데이터를 가지고 올 때, url에 user의 API key도 같이 넣어 request를 보내 본인이 생성한 데이터도 같이 받아올 수 있게끔 하자
  - 본인이 생성한 데이터만 받아오므로 key 값이 있는 recipe는 모두 사람 아이콘이 나타나게 하면 됨

  ```js
  // model.js
  export const loadRecipe = async function (id) {
    try {
      const data = await getJSON(`${API_URL}${id}?key=${KEY}`);
      ...
    } catch (err) {
      ...
    }
  };

  export const loadSearchResults = async function (query) {
    try {
      ...
      const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
      ...
      state.search.results = data.data.recipes.map(rec => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
          ...(rec.key && { key: rec.key }),
        };
      });
      ...
    } catch (err) {
      ...
    }
  };
  ```

  ```js
  // recipeView.js
  class RecipeView extends View {
    ...
    _generateMarkup() {
      return `
        ...
        <div class="recipe__details">
          ...
          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          ...
        </div>
        ...
      `;
    }
  }
  ```

  ```js
  // previewView.js
  class PreviewView extends View {
    ...
    _generateMarkup() {
      const id = window.location.hash.slice(1);

      return `
        <li class="preview">
          <a class="preview__link ${
            this._data.id === id ? 'preview__link--active' : ''
          }" href="#${this._data.id}">
            ...
            <div class="preview__data">
              ...
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
        </li>
      `;
    }
  }
  ```

- 'helpers.js'에서 getJSON() 함수와 setJSON() 함수의 코드가 유사하므로, 두 함수를 하나로 합한 AJAX() 함수를 만들어보자

  ```js
  // helpers.js
  export const AJAX = async function (url, uploadData = undefined) {
    try {
      const fetchPro = uploadData
        ? fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
          })
        : fetch(url);

      const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  ```

  ```js
  // model.js
  export const loadRecipe = async function (id) {
    try {
      const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
      ...
    } catch (err) {
      ...
    }
  };

  export const loadSearchResults = async function (query) {
    try {
      ...
      const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
      ...
    } catch (err) {
      ...
    }
  };
  ```

## ▶ 310. Wrapping Up: Final Considerations

- JSDoc을 이용하여 문서화(documentation) 작업을 해보자

  - [JSDoc 공식 문서](https://jsdoc.app/about-getting-started.html)
  - `/**`만 작성해도 자동완성기능에 의해 JSDoc comments를 작성할 수 있도록 변경됨

  ```js
  // View.js
  export default class View {
    /**
     * Render the received object to the DOM
     * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
     * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
     * @returns {undefined | string} A markup string is returned if render=false
     * @this {Object} View instance
     * @author Jonas Schmedtmann
     * @todo Finish implementation
     */
    render(data, render = true) {
      if (!data || (Array.isArray(data) && data.length === 0))
        return this.renderError();

      this._data = data;
      const markup = this._generateMarkup();

      if (!render) return markup;

      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  }
  ```
