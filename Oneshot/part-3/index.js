const express = require('express');
const app =express();

const PORT= 3000;

//Import the Mongoose library:
const mongoose = require("mongoose");

// Create a connectDB function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(``,{
        useNewUrlParser: true;
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;



app.get('/',(req,res)=>{
    console.log("i am inside the home page route handler")

res.send("Hello bro welecome to my coding world");
})

app.listen(PORT,()=>{
    console.log("Server is running")
})