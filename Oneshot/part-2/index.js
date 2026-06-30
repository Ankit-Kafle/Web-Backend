const express = require("express");
const app = express();
const port = 3000;

//loading middleware into the app

app.use(express.json()); //inbuilt middleware

//middleware -logging,auth, validation

//Order is important in middleware, this middleware should be located above the route where it is located


//creation of a middleware
const loggingMiddleware = function (req, res, next) {
  console.log("Doing loging");
  next(); //moving to next middleware after completing this loging middleware
};
// loading middleware into application
app.use(loggingMiddleware); //now we have lying middleware type in application level

const authMiddleware = function (req, res, next) {
  console.log("Auth middleware");
  next();
};
app.use(authMiddleware);

const validationMiddleWare = function (req, res, next) {
  console.log("doing vallidation");
  next();
};
app.use(validationMiddleWare);

app.get("/", (req, res) => {
  console.log("I am router handler");
  console.log(req.body);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
