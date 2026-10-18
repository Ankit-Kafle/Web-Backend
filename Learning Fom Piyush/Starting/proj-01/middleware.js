const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs')
const app = express();
const PORT = 8006;
const path = require("path");

// Middleware-plugin
app.use(express.urlencoded({ extended: false }));

// app.use((req,res,next) =>{                        //2nd middleware
// console.log("Hello from middleware 2"); // if i leave this function with this console.log then it will do some processing but it neither end the process nor pass the process to other middleware
// req.myUSerName = 'AnkitKafle.dev';  // i have define a function in req which can be used in another middleware req or routes req also
//
// next();
//
// })
//
//
// app.use((req,res,next) =>{                        //3rd middleware
// console.log("Hello from middleware 3",req.myUSerName);
// return res.end("hey");
//
// })

// One of the middleware funxtion is that it make changes to the request and the response objects

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
app.get("/users", (req,res) =>{
    const html = `
    <ul>
    ${users.map((user) => `<li> ${user.first_name}`).join("")}
    </ul>
    `;
res.send(html);
})

app.get('/api/users', (req,res) => {
  res.setHeader("X-myName","Ankit kafle");   //setting up the custom response header
  //Good practise: Always add x to coustom headers
  console.log(req.headers)
  console.log('I am in get route', req.myUserName);
    return res.json(users);
})


app.route('/api/users/:id')
.get( (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})



.patch((req, res) => {
  // Get the ID from the URL, for example /api/users/3.
  const id = Number(req.params.id);

  // Find the user in the array.
  const user = users.find((user) => user.id === id);

  // Stop if no user has that ID.
  if (!user) {
    return res.status(404).json({ status: "User not found" });
  }

  // Copy the supplied fields onto the user.
  // For example, { "first_name": "Alex" } changes only first_name.
  Object.assign(user, req.body);

  // Keep the original ID, even if the request body included an id.
  user.id = id;

  // Save the updated array beside middleware.js.
  const dataFile = path.join(__dirname, "MOCK_DATA.json");

  fs.writeFile(dataFile, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ status: "Could not save users" });
    }

    return res.json({ status: "success", updatedUser: user });
  });
})




.delete((req, res) => {
  // 1. Get the ID from the URL.
  // For /api/users/3, req.params.id is the string "3".
  const id = Number(req.params.id);

  // 2. Find the position of the user with that ID in the array.
  const index = users.findIndex((user) => user.id === id);

  // 3. If no user has that ID, send a 404 response and stop.
  if (index === -1) {
    return res.status(404).json({ status: "User not found" });
  }

  // 4. Remove that user from the array and keep a copy for the response.
  const [deletedUser] = users.splice(index, 1);

  // 5. Save the updated array to the JSON file.
  // __dirname makes sure the file is saved beside middleware.js.
  const dataFile = path.join(__dirname, "MOCK_DATA.json");

  fs.writeFile(dataFile, JSON.stringify(users, null, 2), (err) => {
    // 6. If saving failed, send an error response.
    if (err) {
      return res.status(500).json({ status: "Could not save users" });
    }

    // 7. If saving worked, confirm which user was deleted.
    return res.json({ status: "success", deletedUser });
  });
})

app.post("/api/users", (req,res) => {
const body = req.body;
// console.log('Body',body)
users.push({...body, id: users.length+1});
fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
return res.json({status:"Success", id: users.length });
});
    
});


app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
