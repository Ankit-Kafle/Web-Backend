const express = require('express'); 
const app =express();
// connecting the db with this file
const connectDB = require('./db');
const userRoutes = require('./Routes/Mohan');
const dotenv = require('dotenv')

//load
dotenv.config();
const port= process.env.PORT ;

//conncect to Db
connectDB();
 
//body parser
app.use(express.json());
app.use('/api', userRoutes);

// -> /api/users


app.get('/',(req,res)=>{
    console.log("i am inside the home page route handler")

res.send("Hello bro welecome to my coding world");
})

app.listen(PORT,()=>{
    console.log("Server is running")
})
