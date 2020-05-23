const express = require('express');
const Invites = require('./invites-model.js');

const router = express.Router();

// GET /invites | View a list of all invites 

router.get('/', (req, res) => {
    Invites.getAll()
        .then(invites => {
            res.status(200).json({invites: invites})
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving invites", error: err})
        })
})
// Get /invites/:id | Get an invite by id


// POST /invites | Create a new invite {user_id, potluck_id}

// PUT /invites/:id | Edit an existing invite

// DELETE /invites/:id | Delete an existing invite

module.exports = router;