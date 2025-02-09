// ----- Coding Challenge #1 -----
// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
}
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw.speed);
bmw.accelerate();
bmw.brake();


// ----- Coding Challenge #2 -----
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
    return this
  };

  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this
  };

  // 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
  get speedUS() {
    return this.speed / 1.6
  }

  // 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
// 4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.
const ford = new CarCl('Ford', 120);

ford.accelerate();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 150
console.log(ford.speed);


// ----- Coding Challenge #3 -----
// 1. Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
}
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`);
};
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism
const tesla = new EV('Tesla', 120, 23);

tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);
console.log(tesla.charge);


// ----- Coding Challenge #4 -----
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    // 2. Make the 'charge' property private
    this.#charge = charge;
  }

  getCharge() {
    return this.#charge
  }

  // 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    return this
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this
  }
}

const rivian = new EVCl('Rivian', 120, 23);

rivian.chargeBattery(50).accelerate().brake();
console.log(rivian.speed, rivian.getCharge());