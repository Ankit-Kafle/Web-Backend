// const http = require("http");

const express = require("express");
const app= express();  //this app is basically a handler function


app.get('/',(req,res) =>{
    return res.send("HELLO FROM HOME PAGE")
})
app.get('/about',(req,res) =>{
    return res.send("HELLO FROM ABOUT PAGE" + "hey" + req.query.name);
})

app.listen(8000, () => console.log("Server Started"));






//inside this myHandler function for many different things like for parsing a queue we need to URL module , for header, for json we need to introduce many module. for everything we need to do from scratch, so we need a library to handle everything for myHandler easily without doing from scratch i.e Express js

//EXPRESS JS Fast, unopinionated,minimalist web framework for node.js
// function myHandler(req, res) {


//     if(req.url === "/favicon.ico") return res.end();

// const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
// const myURL = url.parse(req.url, true);
// console.log(myURL);

//     fs.appendFile('Method.txt',log, (err,data)=> {      
// switch(myURL.pathname){

//     case '/': 
//     if(req.method ==='GET') res.end("HomePage");
//     break;

//     case '/about':
//         const username = myURL.query.name;
//     res.end(`Hi, ${username}`);
//     break;

// case '/signup':
//     if(req.method === "GET") res.end('This is a signup form');   //first of all there will be get method request and we will give the form page. The user will fill the form and Submit it. The Submit is a POST request .Then we will put the user data in database and after that we respond the user with "Sucess".
//     else if (req.method === "POST" ){
//         //DB query
//         res.end("Success")
//     }

//     default:
//         res.end("404 Not Found")
// }
//     });

// console.log("New req receive", req.url);


    
// }

// const myServer = http.createServer(myHandler);


