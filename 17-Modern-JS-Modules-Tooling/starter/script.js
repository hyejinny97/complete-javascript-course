import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

import 'regenerator-runtime/runtime';

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));