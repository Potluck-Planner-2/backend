const express = require('express');
const Invites = require('./invites-model.js');
const Users = require('../users/users-model.js');
const Potlucks = require('../potlucks/potluck-model');
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
                    res.status(200).json({message: "Invite successfully created", potluck: invite})
            })
        })
        .catch(err => {
            res.status(500).json({message: "Error creating invite", error: err})
        })
})
// PUT /invites/:id | Edit an existing invite

router.put('/:id', validateId, (req, res) => {
    //if there's a userid, validate it
    if(req.body.user_id) {
        Users.getByid(req.body.user_id)
            .then(([user]) => {
                if(!user){
                    res.status(404).json({message: "Please use a valid user id when updating this record"})
                }
            })
            .catch(err => {
                res.status(500).json({message: "Error validating user id of invite", error: err})
            })
    }

    //if there's a potluck id, validate it

    if(req.body.potluck_id) {
        Potlucks.getById(req.body.potluck_id)
            .then(([potluck]) => {
                if(!potluck){
                    res.status(404).json({message: "Please use a valid potluck id when updating this record"})
                }
            })
            .catch(err => {
                res.status(500).json({message: "Error validating potluck id of invite", error: err})
            })
    }

    Invites.update(req.params.id, req.body)
        .then(records => {
            Invites.getById(req.params.id)
                .then(([invite]) => {
                    res.status(200).json({message: "Invite successfully updated", invite: invite})
                })
                .catch(err => {
                    res.status(500).json({message: "Invite updated successfully, but record retrieval failed. Proceed with caution."})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error updating invite", error: err})
        })
})
// DELETE /invites/:id | Delete an existing invite

//middleware



function validateId(req, res, next) {
    Invites.getById(req.params.id)
        .then(([invite]) => {
            if(invite) {
                next();
            } else {
                res.status(404).json({message: "Invite not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Error validating id of invite", error: err})
        })
}

function validateBody(req, res, next) {
    if(req.body.user_id && req.body.potluck_id) {
        next();
    } else {
        res.status(400).json({message: "Please include a user_id and a potluck_id in the body of your request."})
    }
}

module.exports = router;