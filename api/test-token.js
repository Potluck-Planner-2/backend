const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.id
    };
    const secret = "banana";
    const options = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, secret, options);
}

module.exports = generateToken;
