// /api/login

const express = require('express');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Login = require('./login-model');

const router = express.Router();

//web token setup

function generateToken(user) {
    const payload = {
        subject: user.id
    };
    const secret = process.env.TOKEN_SECRET || "banana";
    const options = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, secret, options);
}

router.post('/', validateBody, (req, res) => {
    Login.getByUsername(req.body.username)
        .then(([user]) => {
            //if the username even exists
            if(user) {
                //check if the passwords match
                if(brcypt.compareSync(req.body.password, user.password)) {
                    const token = generateToken(user)
                    res.status(200).json({message: "Login Successful", token: token})
                } else {
                    res.status(401).json({message: "Invalid credentials. Username and password are not correct."})
                }
            } else {
                //if the username doesn't exist throw an error
              res.status(404).json({message: "This user does not exist"})
            } 
            
        })
        .catch(err => {
            res.status(500).json({message: "Error logging in", error: err})
        })
    
    
})

function validateBody(req, res, next) {
    if(req.body.username && req.body.password) {
        next();
    } else (
        res.status(200).json({message: "Please include a username and password in the body of your request."})
    )
}

module.exports = router;