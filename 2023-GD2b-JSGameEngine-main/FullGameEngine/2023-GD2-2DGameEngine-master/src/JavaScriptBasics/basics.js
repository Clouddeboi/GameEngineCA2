/* JavaScript Basics */

/* 
 * Variables and Data Types
 * JavaScript has dynamic types. This means you don't have to specify the data type of a variable when you declare it.
 */
let num = 25; // Number
let str = "Hello, World!"; // String
let isAvailable = true; // Boolean
let notDefined; // Undefined
let isNull = null; // Null
let obj = { firstName: "John", lastName: "Doe" }; // Object

/*
 * Control Structures
 * JavaScript includes control structures to handle the flow of your code.
 */

// If-Else Statement
let condition = true;
if (condition) {
  console.log("Condition is true");
} else {
  console.log("Condition is false");
}

// For loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop
let j = 0;
while (j < 5) {
  console.log(j);
  j++;
}

/* 
 * Functions
 * Functions are blocks of code designed to perform a particular task.
 */
function greet(name) {
  console.log("Hello, " + name);
}

greet("Alice");

/* 
 * Arrays
 * JavaScript arrays are used to store multiple values in a single variable.
 */
let fruits = ["Apple", "Banana", "Mango"];
console.log(fruits[0]);

/* 
 * Objects
 * JavaScript objects are containers for named values, called properties and methods.
 */
let person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
};
console.log(person.firstName);

/* 
 * var, let, const
 * In JavaScript, you have three ways of declaring a variable — using 'var', 'let', or 'const'. 
 * 'var' variables are function scoped and can be updated and re-declared within its scope.
 * 'let' variables are block scoped and can be updated but not re-declared.
 * 'const' variables are block scoped, cannot be updated or re-declared.
 */
var varVariable = "I'm var variable"; // Can be redeclared and updated
let letVariable = "I'm let variable"; // Cannot be redeclared, can be updated
const constVariable = "I'm const variable"; // Cannot be redeclared, cannot be updated

console.log(varVariable);
console.log(letVariable);
console.log(constVariable);

varVariable = "Updated var variable";
letVariable = "Updated let variable";
// constVariable = "Updated const variable"; // Uncaught TypeError: Assignment to constant variable.

console.log(varVariable);
console.log(letVariable);
console.log(constVariable);

/* 
 * Constructors and 'this' keyword
 * Constructors are special methods that are used to create and initialize an object.
 * The 'this' keyword refers to the current instance of the object.
 */
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  displayCar() {
    return this.brand + " " + this.model;
  }
}

let myCar = new Car("Toyota", "Corolla");
console.log(myCar.displayCar());

/* 
 * 'super' keyword and Inheritance
 * The 'super' keyword is used to call the parent class with the 'this' value of its descendants.
 * JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.
 */
class Model extends Car {
  constructor(brand, model, year) {
    super(brand, model); // calls the parent constructor
    this.year = year;
  }
  
  displayModel() {
    return this.displayCar() + " - " + this.year;
  }
}

let myModel = new Model("Toyota", "Corolla", "2023");
console.log(myModel.displayModel());

/* 
 * Arrow Functions and Default Function Parameters
 * Arrow functions were introduced in ES6.
 * Arrow functions allow for a shorter syntax compared to function expressions and do not have their own 'this', arguments, super, or new.target.
 * Default function parameters allow formal parameters to be initialized with default values if no value or undefined is passed.
 */
const arr = [1, 2, 3, 4];
const squares = arr.map((x) => x * x); // Arrow function
console.log(squares);

function sayHello(name = "World") { // Default parameter
  console.log(`Hello, ${name}!`);
}

sayHello();
sayHello("Alice");

/* 
 * Template Literals
 * Template literals are string literals allowing embedded expressions. 
 */
let nameGirl = "Alice";
console.log(`Hello, ${nameGirl}!`); // Using template literals


/*
 * Modules (If supported in your environment)
 * ECMAScript 2015 introduced JavaScript Modules.
 * A module is a JavaScript file that exports some values, either as a default export or named exports. Other JavaScript files can then import these values.
 */
// import { hello } from './myModule.js';
// console.log(hello());
