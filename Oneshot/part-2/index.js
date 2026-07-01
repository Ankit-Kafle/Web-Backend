const express = require("express");
const app = express();
const port = 3000;

//loading middleware into the app

app.use(express.json()); //inbuilt middleware

//Its job is:

// Read JSON data sent by the client.
// Convert it into a JavaScript object.
// Store it inside




//middleware -logging,auth, validation

//Order is important in middleware, this middleware should be located above the route where it is located


//creation of a middleware
// const loggingMiddleware = function (req, res, next) {
//   console.log("Doing loging");
//   next(); //moving to next middleware after completing this loging middleware
// };
// // loading middleware into application
// app.use(loggingMiddleware); //now we have lying middleware type in application level



// const authMiddleware = function (req, res, next) {
//   console.log("Auth middleware");
//   next();
//   //  res.send("Chalo siddha ghar");
// };
// app.use(authMiddleware);




// const validationMiddleWare = function (req, res, next) {
//   console.log("doing vallidation");
//   next();
// };
// app.use(validationMiddleWare);





const route = require('./Route/route')
//mounting the routes
app.use('/api',route)

// --> /api/student
// --> /api/admin







// request aauney betekai poila yoo route hit hudaina. At first , in case any middleware are attached then they will run and then at last this routehandler is going to be hit 
app.get("/", (req, res) => {
  console.log("I am router handler");
  console.log(req.body);
  res.send("Hello World!");
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
