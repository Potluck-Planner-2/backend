// /api/users

const express = require('express')

const router = express.Router();

const Users = require('./users-model')


//GET /users => view all users
router.get('/', (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json({users})
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving users", error: err})
        })
});


// GET /users/:id | View user by id

router.get('/:id', (req, res) => {
    Users.getByid(req.params.id)
        .then(([user]) => {
            if(user) {
                res.status(200).json({user})
            } else {
                res.status(404).json({message: "User not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving users", error: err})
        })
})

// POST /users | Add new user {username, first_name, last_name, password}

router.post('/', validateContent, (req, res) => {
    res.status(200).json({message: "Ready to add"})
})


// PUT /users/:id | Edit user {username, first_name, last_name, password}


// DELETE /users/:id | Delete user


//MIDDLEWARE

function validateContent(req, res, next) {
    if (req.body && req.body.username && req.body.first_name && req.body.last_name && req.body.password) {
        Users.getByUsername(req.body.username)
            .then(([user]) => {
                if(!user) {
                    next();
                } else {
                    res.status(400).json({message: "Username already taken."})
                }
            })
    } else {
        res.status(400).json({message: "Please include a username, first_name, last_name, and password in the body of your request."})
    }
}
module.exports = router;