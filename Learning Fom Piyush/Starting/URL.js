const http = require("http");
const fs = require("fs");
const url = require("url");



const myServer = http.createServer((req,res) => {

    if(req.url === "/favicon.ico") return res.end();

const log = `${Date.now()}: ${req.url} New Req Received\n`;
const myURL = url.parse(req.url, true);
console.log(myURL);

    fs.appendFile('url.txt',log, (err,data)=> {      
switch(myURL.pathname){

    case '/': res.end("HomePage")
    break
    case '/about':
        const username = myURL.query.name;
    res.end(`Hi, ${username}`);
    break;
    default:
        res.end("404 Not Found")
}


    });
console.log("New req receive", req.url);


});

myServer.listen(8001, () => console.log("HARI BOLE"));

