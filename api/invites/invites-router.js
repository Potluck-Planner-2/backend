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

//get invites by potluck id

router.get('/potlucks/:id', validatePotluckParam, (req, res) => {
    Invites.getByPotluck(req.params.id)
    .then(invites => {
        res.status(200).json({invites: invites})
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving invites by potluck", error: err})
    })
})

//get invites by potluck id but only mine

router.get('/potlucks/:id/mine', validatePotluckParam, (req, res) => {
    Invites.getMineByPotluck(req.params.id, req.jwt.subject)
    .then(invites => {
        res.status(200).json({invites: invites})
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving invites by potluck", error: err})
    })
})

//get invites by user id

router.get('/users/:id', validateUserParam, (req, res) => {
    Invites.getByUser(req.params.id)
    .then(invites => {
        res.status(200).json({invites: invites})
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving invite by user id", error: err})
    })
})
// POST /invites | Create a new invite {user_id, potluck_id}

router.post('/', validateBody, validateUserId, validatePotluckId, (req, res) => {

    Invites.insert(req.body)
        .then(([id]) => {
            Invites.getById(id)
                .then(([invite]) => {
                    res.status(200).json({message: "Invite successfully created", invite: invite})
            })
        })
        .catch(err => {
            res.status(500).json({message: "Error creating invite", error: err})
        })
})
// PUT /invites/:id | Edit an existing invite

router.put('/:id', validateId, validateUserId, validatePotluckId,(req, res) => {
    

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
router.delete('/:id', validateId, (req, res) => {
    Invites.remove(req.params.id)
        .then(success => {
            res.status(200).json({message: "Invite successfully deleted", num_of_records: success})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting invite", error: err})
        })
})
//middleware
function validatePotluckId(req, res, next) {
    if(req.body.potluck_id) {
        Potlucks.getById(req.body.potluck_id)
            .then(([potluck]) => {
                if(!potluck){
                    res.status(400).json({message: "Please use a valid potluck_id"})
                } else {
                    next();
                }
            })
            .catch(err => {
                res.status(500).json({message: "Error validating potluck id of invite", error: err})
            })
    } else {
        next();
    }
}
function validateUserId(req, res, next) {

    //if there's a userid, validate it
    if(req.body.user_id || req.body.user_id === 0) {
        Users.getByid(req.body.user_id)
            .then(([user]) => {
                if(!user){
                    res.status(400).json({message: "Please use a valid user_id"})
                } else {
                    next();
                }
            })
            .catch(err => {
                res.status(500).json({message: "Error validating user id of invite", error: err})
            })
    } else {
        next();
    }
}
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

function validatePotluckParam(req, res, next) {
    Potlucks.getById(req.params.id)
        .then(([potluck]) => {
            if(potluck) {
                next();
            } else {
                res.status(404).json({message: "Potluck not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Error validating potluck id", error: err})
        })
}

function validateUserParam(req, res, next) {
    Users.getByid(req.params.id)
        .then(([user]) => {
            if(user) {
                next();
            } else {
                res.status(404).json({message: "User not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Error validating user id", error: err})
        })
}

module.exports = router;