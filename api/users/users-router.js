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



// PUT /users/:id | Edit user {username, first_name, last_name, password}


// DELETE /users/:id | Delete user


module.exports = router;