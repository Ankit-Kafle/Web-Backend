//Things needed before starting the backend
// const express = require('express');
// const app = express();
// const PORT = 8001;


// app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));


require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");
const { connectMongoDb } = require("./connection");

const app = express();
const PORT = process.env.PORT || 8006;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/LearningMVL";

//connection
connectMongoDb(MONGODB_URI).then(() => console.log("Mongodb connected"));

// Middleware-plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
