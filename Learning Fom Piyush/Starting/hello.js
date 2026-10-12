// in terminal doing (node hello.js ) or (node hello) it will compile only the js file not other
//we can also do npm start to run this file as we have done configuration in package.json

console.log("HEy there i am Js")


//DOM related or things related to UI which can be done by JS in a browser will not run for node js in terminal


//Module Eg

//In require function if we gave tha package name as it is then it will search in his node directory(the place where all the packages are located) and if we give ./ than it will searchn inside the current directory

const run = require("./math");   //require function is built in function use to import packages and modules
// console.log("run value is ", run);
console.log("run value is ", run.subFn(2,4));
// console.log("run value is ", run.addFn(2,4));


//even i can do destructure
// const {add,sub} = require("./math");
// console.log("run value is ", add(2,4));


