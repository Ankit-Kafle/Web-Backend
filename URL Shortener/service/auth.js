const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

function setUser(user) {
    if (!secret) throw new Error("JWT_SECRET must be configured before starting the server");
    return jwt.sign({ _id: user._id.toString(), email: user.email }, secret, { expiresIn: "7d" });
}

function getUser(token) {
    if (!secret || typeof token !== "string" || !token.trim()) return null;
    try {
        return jwt.verify(token.trim(), secret);
    } catch {
        return null;
    }
}

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex");
        crypto.scrypt(password, salt, 64, (error, derivedKey) => {
            if (error) return reject(error);
            resolve(`scrypt:${salt}:${derivedKey.toString("hex")}`);
        });
    });
}

function verifyPassword(password, storedPassword) {
    if (typeof storedPassword !== "string") return Promise.resolve(false);
    const [scheme, salt, hash] = storedPassword.split(":");
    if (scheme !== "scrypt" || !salt || !hash) return Promise.resolve(false);
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (error, derivedKey) => {
            if (error) return reject(error);
            const expected = Buffer.from(hash, "hex");
            resolve(expected.length === derivedKey.length && crypto.timingSafeEqual(expected, derivedKey));
        });
    });
}

module.exports = { setUser, getUser, hashPassword, verifyPassword };
