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
router.get('/:id', (req, res) => {
    Invites.getById(req.params.id)
        .then(([invite]) => {
            if(invite) {
                res.status(200).json({invite: invite})
            } else {
                res.status(404).json({message: "Invite not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving invite", error: err})
        })
})

// POST /invites | Create a new invite {user_id, potluck_id}

router.post('/', validateBody, (req, res) => {
    Invites.insert(req.body)
        .then(([id]) => {
            Invites.getById(id)
                .then(invite => {
                    res.status(200).json({message: "Invite", potluck: invite})
            })
        })
        .catch(err => {
            res.status(500).json({message: "Error creating invite", error: err})
        })
})
// PUT /invites/:id | Edit an existing invite

// DELETE /invites/:id | Delete an existing invite

//middleware

function validateBody(req, res, next) {
    if(req.body.user_id && req.body.potluck_id) {
        next();
    } else {
        res.status(400).json({message: "Please include a user_id and a potluck_id in the body of your request."})
    }
}

module.exports = router;