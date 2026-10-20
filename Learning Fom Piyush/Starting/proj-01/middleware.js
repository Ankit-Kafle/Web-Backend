const express = require("express");

const fs = require('fs')
const app = express();
const PORT = 8006;
const path = require("path");
const { default: mongoose } = require("mongoose");


//connection with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/LearningBackend')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error("Mongo Error:", err));

// defining Schema
const userSchema = new mongoose.Schema({
  
  firstName:{
    type: String,
    required: true,
  },


   lastName:{
    type: String,
  },

  email:{
    type: String,
    required: true,
    unique: true,
  },

  jobTitle:{
    type:String,
  }

}, {timestamps: true})

//Making model after defining schema
const User = mongoose.model('user',userSchema); //giving name for model -> user and schema -> userSchema
// using this (user) class i can interact with my mongo

// Middleware-plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use((req, res, next) => {
  const logFile = path.join(__dirname, "gol.txt");
  const log = `${Date.now()}:${req.ip}:${req.method}:${req.path}\n`;

  fs.appendFile(logFile, log, (err) => {
    if (err) {
      console.error("Could not write request log:", err);
      return res.status(500).send("Could not write request log");
    }

    next();
  });

});


//Routes 
app.get("/users", async (req,res) =>{
  const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li> ${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
res.send(html);
})

app.get('/api/users', async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
});


app.route('/api/users/:id')
.get(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ status: "Invalid user ID" });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ status: "User not found" });
  return res.json(user);
})


.patch(async (req, res) => {
 await User.findByIdAndUpdate(req.params.id, { lastName: "Changed"});
 return res.json({status:"Success"});
})

.delete(async (req, res) => {
 await User.findByIdAndDelete(req.params.id);
 return res.json({status:"Success"});
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.email || !body.job_title) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const user = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ status: "success", user });
});


app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
