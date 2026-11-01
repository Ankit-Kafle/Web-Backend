const User = require('../models/user')

const { setUser, hashPassword, verifyPassword } = require("../service/auth");

async function handleUserSignup(req,res){
const { name, email, password } = req.body;
if (!name?.trim() || !email?.trim() || typeof password !== "string" || password.length < 8) {
    return res.status(400).render("signup", { error: "Enter your name, a valid email, and a password of at least 8 characters." });
}
try {
    await User.create({ name: name.trim(), email: email.trim().toLowerCase(), password: await hashPassword(password) });
    return res.redirect("/login");
} catch (error) {
    if (error.code === 11000) return res.status(409).render("signup", { error: "An account with that email already exists." });
    console.error("Signup failed:", error);
    return res.status(500).render("signup", { error: "Unable to create your account. Please try again." });
}
}


async function handleUserLogin(req,res){
const { email, password } = req.body;
const user = await User.findOne({ email: email?.trim().toLowerCase() });
if (!user || typeof password !== "string" || !(await verifyPassword(password, user.password))) {
    return res.status(401).render("login", { error: "Invalid email or password." });
}



const token =setUser(user);
res.cookie("uid", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 });
return res.redirect("/");
}

module.exports={
    handleUserSignup,
    handleUserLogin,

}
