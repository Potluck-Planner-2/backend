
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET || "banana";

function auth(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if(!error) {
                req.jwt = decodedToken;
                next();
            } else {
                res.status(400).json({message: "You have been logged out. Please log in again."})
            }
            
        })
        
    } else {
        res.status(400).json({message: "Please include your token as the authorization in your header"});
    }
}

module.exports = auth;