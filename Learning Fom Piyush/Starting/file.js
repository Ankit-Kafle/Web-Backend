const fs = require("fs");


// this was a synchronous call
//fs.writeFileSync("./file_writing.txt",'Hare Krishna World. Jay Gour sri Radha Ramano Vijayate..') //if i again add something inside the '' than it will replace the old one and override new one
// blocking and non blocking request/task

//Asynchronous
// fs.writeFile("./test.txt","Hello World",(err) => {});



// sync method send the result in a variable
//const result=fs.readFileSync("./file_reading.txt","utf-8") // in second part we included one of the encoding i.e utf-8
//console.log(result);

// async does not return but instead it uses a call back function which ask where there is error or result 
// fs.readFile("./file_reading.txt","utf-8", (err, result) =>{
//     if(err) {
//         console.log("Error",err);
//     }
//     else{
//         console.log(result);
//     }
// })


// fs.appendFileSync("./file_writing.txt", ' My priya bandhu\n'); //appending the text in the file content
// fs.appendFileSync("./file_writing.txt", ' ${Date.now()} My priya bandhu\n');


// fs.cpSync("./file_writing.txt","./copy.txt"); //copying the ./file_writing.txt
// fs.unlinkSync("./file_writing.txt","./copy.txt"); //deleting the ./copy.txt

// console.log(fs.statSync("./file_reading.txt")); //looking status of the file
console.log(fs.statSync("./file_reading.txt").isFile()); 


// fs.mkdirSync("my-docs") // creating a new folder
// fs.mkdirSync("my-docss/a/b",{recursive:true});