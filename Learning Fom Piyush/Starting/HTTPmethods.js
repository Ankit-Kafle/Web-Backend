const http = require("http");
const fs = require("fs");
const url = require("url");



const myServer = http.createServer((req,res) => {

    if(req.url === "/favicon.ico") return res.end();

const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
const myURL = url.parse(req.url, true);
console.log(myURL);

    fs.appendFile('Method.txt',log, (err,data)=> {      
switch(myURL.pathname){

    case '/': 
    if(req.method ==='GET') res.end("HomePage");
    break;

    case '/about':
        const username = myURL.query.name;
    res.end(`Hi, ${username}`);
    break;

case '/signup':
    if(req.method === "GET") res.end('This is a signup form');   //first of all there will be get method request and we will give the form page. The user will fill the form and Submit it. The Submit is a POST request .Then we will put the user data in database and after that we respond the user with "Sucess".
    else if (req.method === "POST" ){
        //DB query
        res.end("Success")
    }

    default:
        res.end("404 Not Found")
}
    });

console.log("New req receive", req.url);


});

myServer.listen(8002, () => console.log("HARI BOLE"));

