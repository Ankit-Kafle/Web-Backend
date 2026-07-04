//Import the Mongoose library:
const mongoose = require("mongoose");


const dotenv = require('dotenv');
//load env configuration
dotenv.config();

// Create a connectDB function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

 module.exports = connectDB;
