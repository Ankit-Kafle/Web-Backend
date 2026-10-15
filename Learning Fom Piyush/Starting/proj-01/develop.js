const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8004;


// ROUTES 

// 1st task is done

// this is my hybrid system 


//this is for server side rendering
app.get("/users", (req,res) =>{
    const html = `
    <ul>
    ${users.map((user) => `<li> ${user.first_name}`).join("")}
    </ul>
    `;
res.send(html);
})

// REST API

//this is for future react app, flutter mobile application, alexa smart device interaction then they will request in /api/users
app.get('/api/users', (req,res) => {
    return res.json(users);
})



//this is the shortcut way for similar route . if i have to change something in route then i don't need to change individually for all. from one place i change then everything will be setup automatically due to grouping

app.route('/api/users/:id')
.get( (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req,res) =>{
     // TODO : Edit the user with id
     return req.json({status:"pending"});
})
.delete((req,res) =>{ 
    // TODO : Delete the user id
    return req.json({status:"pending"});
})





// app.get('/api/users/:id', (req,res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })




app.post("/api/users", (req,res) => {
    // TODO : Create new user
    return res.json({status:"pending"});
});



//we can also merge api methods which have the same route i.e "/api/users/:id"

// app.post("/api/users/:id", (req,res) => {
//     // TODO : Edit the user with id
//     return req.json({status:"pending"});
// });

// app.post("/api/users/:id", (req,res) => {
//     // TODO : Delete the user id
//     return req.json({status:"pending"});
// });






app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))