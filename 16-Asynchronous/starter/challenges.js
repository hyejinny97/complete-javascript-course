// ----- Coding Challenge #1 -----
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below)
const whereAmI = function (lat, lng) {
  // 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then(response => {
      console.log(response);
      // 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
      if (!response.ok) {
        throw new Error('This API allows you to make only 3 requests per second.')
      }

      return response.json()
    })
    .then(data => {
      // 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
      console.log(data);
      console.log(`You are in ${data.country}, ${data.region}`);
      return data.country
    })
    .then(country => {
      // 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
      return fetch(`https://restcountries.com/v3.1/name/${country}`)
    })
    .then(response => {
      if (!response.ok) {
        renderError('해당 country에 대한 데이터를 가져올 수 없음')
        throw new Error('해당 country에 대한 데이터를 가져올 수 없음')
      }

      return response.json()
    })
    .then(data => {
      console.log(data);
      // 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
      renderCountry(data[0]);
    })
    .catch((err) => {
      // 4. Chain a .catch method to the end of the promise chain and log errors to the console
      console.log(err);
    });
}

// whereAmI(52.508, 13.381)



// ----- Coding Challenge #2 -----
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// 1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path
// let img;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    img = document.createElement('img');
    img.src = imgPath;
    // 2. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise
    img.addEventListener('load', function () {
      img.classList.add('images');
      document.body.appendChild(img);
      resolve(img);
    })
    img.addEventListener('error', function () {
      reject(new Error('해당 이미지를 불러올 수 없음'));
    })
  })
}

/* // 4. Consume the promise using .then and also add an error handler
createImage('./img/img-1.jpg')
  .then(() => {
    // 5. After the image has loaded, pause execution for 2 seconds using the 'wait' function we created earlier
    return wait(2)
  })
  .then(() => {
    // 6. After the 2 seconds have passed, hide the current image (set display CSS property to 'none'), and load a second image (Hint: Use the image element returned by the 'createImage' promise to hide the current image. You will need a global variable for that)
    console.log(img);
    img.classList.add('hidden');
    return createImage('./img/img-2.jpg')
  })
  .then(() => {
    // 7. After the second image has loaded, pause execution for 2 seconds again
    return wait(2)
  })
  .then(() => {
    // 8. After the 2 seconds have passed, hide the current image
    console.log(img);
    img.classList.add('hidden');
  })
  .catch(err => console.error(err)) */



// ----- Coding Challenge #3 -----
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before)
const loadNPause = async function () {
  try {
    let img = await createImage('./img/img-1.jpg');

    await wait(2);

    img.classList.add('hidden');
    img = await createImage('./img/img-2.jpg');

    await wait(2);

    img.classList.add('hidden');
  } catch (err) {
    console.error(err)
  }
}

// loadNPause()

// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
const loadAll = async function (imgArr) {
  const imgs = imgArr.map(async imgPath => await createImage(imgPath));
  console.log(imgs);
  const imgEls = await Promise.all(imgs);
  console.log(imgEls);
}

loadAll(['./img/img-1.jpg', './img/img-2.jpg'])