   //import{hello} from "../main.js";
let num = 25; 
let str = "Hello world";
let isAvailable = true; 
let notDefined;
let isNull = null; 
let obj = {firstName: "John", lastName: "Smith"};

let condition = true; 
if(condition) {
    console.log("Condition is true");
} else {
    console.log("Condition is false");
}

for(let i = 0; i<5; i++){
    console.log(i);
}
//this is a while loop 
let j = 0; 
while(j<5){
    console.log(j);
    j++;
}

function greet(name){
    console.log("hello " + name)
}

greet("Alice");

let fruits = [];
fruits[0] = "apple";
fruits[1] = "pear";
fruits[2] = "strawberry";
console.log(fruits[1]);

let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
};
console.log(person.firstName);

var varVariable = "I'm a var variable";
let letVariable = "I'm a let variable";
const constVariable = "I'm a const variable";

varVariable = 25;
letVariable = "Updated let Variable";
//constVariable = "Updated const Variable";

console.log(varVariable);
console.log(letVariable);
console.log(constVariable);

class Car{
    constructor(brand,model){
        this.brand = brand;
        this.model = model;
    }
    displayCar(){
        return this.brand + " " + this.model;
    }
}
let myCar = new Car("Toyota", "Corolla");
console.log(myCar.displayCar());

class Model extends Car {
    constructor(brand, model, year){
        super(brand, model);
        this.year = year;  
    }
    displayModel(){
        return this.displayCar() + " " + this.year;
    }
}
    let myModel = new Model("Toyota", "Corolla", "2023");
    console.log(myModel.displayModel());

    const arr = [1,2,3,4,5];
    const squares = arr.map((x) => x*x);
    console.log(squares);

    //template literals 
    let nameGirl = "Alice";
    console.log(`Hello ${nameGirl}!`); 

    //import{hello} from "../main.js";