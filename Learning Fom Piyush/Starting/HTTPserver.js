const http = require("http");
const fs = require("fs");



// const myServer = http.createServer((req,res) => {
// //console.log(req); // it will give all the information of request object or user req
// const log = `${Date.now()}: New Req Received\n`;
//     fs.appendFile('log.txt',log, (err,data)=> {});
//  console.log("New req receive");
//     res.end("Hello From the Server Again");  // it is also called serverside rendering

// });


const myServer = http.createServer((req,res) => {

    if(req.url === "/favicon.ico") return res.end();

const log = `${Date.now()}: ${req.url} New Req Received\n`;
    fs.appendFile('log.txt',log, (err,data)=> {        //always and always use non blocking req/task
switch(req.url){

    case '/': res.end("HomePage")
    break
    case '/about': res.end("I am Ankit Kafle");
    break;
    default:
        res.end("404 Not Found")
}


    });
console.log("New req receive", req.url);


});



//this function createserver will create us a web server 
// to handle our created web server for our handle our incoming request processes we need a handler function
// in this createserver function we can pass requestListener callback function to process our incoming request
//when the req come to the createserver than it run the callback function in first arguemnt it keep the object in which there will be all information of the req(who is the user, that user ip address, which thing that the user had requested)


// to run this server we need a port no . On that port no we make listen to the server for the incoming rew
myServer.listen(8000, () => console.log("HARI BOLE")); // 1 server runs on 1 port only.


