const { getUser } = require("../service/auth");

function getToken(req) {
    const authorization = req.get("authorization");
    if (authorization) {
        const match = authorization.match(/^Bearer\s+(.+)$/i);
        if (match) return match[1].trim();
    }
    return req.cookies?.uid || null;
}

function restrictToLoggedinUserOnly(req, res, next) {
    const user = getUser(getToken(req));
    if (!user) return res.redirect("/login");
    req.user = user;
    return next();
}

function checkAuth(req, res, next) {
    req.user = getUser(getToken(req));
    return next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
