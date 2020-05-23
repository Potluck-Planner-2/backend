
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET || "banana"
function auth(req, res, next) {
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization, secret, (error, decodedToken) => {
            if(!error) {
                req.jwt = decodedToken;
                next();
            } else {
                res.status(400).json({message: "You have been logged out. Please log in again."})
            }
        })
        next();
    } else {
        res.status(400).json({message: "Please include your token as the authorization in your header"});
    }
}

module.exports = auth;