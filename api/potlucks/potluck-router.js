// /api/potlucks

const express = require('express');
// const auth = require('../auth/auth-middleware.js');
const router = express.Router();

const Potlucks = require('./potluck-model.js');
const Users = require('../users/users-model.js');
const Items = require('../items/items-model.js');

//GET /potlucks | View all potlucks that have been submitted

router.get('/', (req, res) => {
    Potlucks.getAll()
        .then(potlucks => {
            res.status(200).json({potlucks: potlucks})
        })
        .catch(err => {
            res.status(500).json({message: "Error retreiving potlucks", error: err})
        })
})

//GET /potlucks/:id | View individual potluck details

router.get('/:id', (req, res) => {
    Potlucks.getById(req.params.id)
        .then(([potluck]) => {
            if(potluck) {
                res.status(200).json({potluck: potluck})
            } else {
                res.status(404).json({message: "potluck not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Error retreiving potluck", error: err})
        })
})

//GET potlucks/mine/organizer | View potlucks that you've organized 

router.get('/mine/organizer', (req, res) => {
    //TODO: retrieve ALL records
    Potlucks.getByOrganizer(req.jwt.subject)
        .then(potlucks => {
                res.status(200).json({potlucks: potlucks})
        })
        .catch(err => {
            res.status(500).json({message: "Error retreiving your potlucks", error: err})
        })
})

//GET potlucks/mine/guest | View potluck if you've been invited as a guest 

router.get('/mine/guest', (req, res) => {
    //TODO: retrieve ALL records
    Potlucks.getByGuest(req.jwt.subject)
        .then(potlucks => {
                res.status(200).json({potlucks: potlucks})
        })
        .catch(err => {
            res.status(500).json({message: "Error retreiving your potlucks", error: err})
        })
})

//GET potlucks/:id/guests | Get a list of all invited guests to a potluck

router.get('/:id/guests', validateId, (req, res) => {
    //todo: validate potluck id
    Potlucks.getGuests(req.params.id)
        .then(guests => {
            res.status(200).json({message: guests})
        })
        .catch(err => {
            res.status(500).json({message: "Error retreiving guests", error: err})
        })
})

//POST /potlucks | Create a potluck {name, location, datetime}

router.post('/', validateData, (req, res) => {
    Potlucks.insert({...req.body, organizer_id: req.jwt.subject})
        .then(([id]) => {
            Potlucks.getById(id)
                .then(potluck => {
                    res.status(200).json({message: "Potluck successfully created", potluck: potluck})
                })
            
        })
        .catch(err => {
            res.status(500).json({message: "Error adding potluck", error: err})
        })
})

// PUT /potlucks/:id | Edit a potluck IF you are the organizer  (decode token) {name, location, datetime}

router.put('/:id', validateId, (req, res) => {
    //validate the organizer id, if it's in there
    if(req.body.organizer_id) {
        Users.getByid(req.body.organizer_id)
            .then(([user]) => {
                if(!user) {
                    res.status(400).json({message: "Please update using a valid user id as the organizer id"})
                }
            })
    }

    Potlucks.update(req.params.id, req.body)
        .then(records => {
            Potlucks.getById(req.params.id)
                .then(([potluck]) => {
                    res.status(200).json({message: "Potluck successfully updated", potluck: potluck})
                })
                .catch(err => {
                    res.status(500).json({message: "Potluck updated successfully, but record retrieval failed. Proceed with caution."})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error updating potluck", error: err})
        })
})

//DELETE | /potlucks/:id | Delete a potluck, IF you're the organizer  (decode token)

router.delete('/:id', validateId, (req, res) => {
    Potlucks.remove(req.params.id)
        .then(success => {
            res.status(200).json({message: "Potluck successfully deleted", num_of_records: success})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting potluck", error: err})
        })
})

//ITEMS

//GET /potlucks/:id/items | View potluck items by individual potluck

router.get('/:id/items', validateId, (req, res) => {
    Items.getByPotluckId(req.params.id)
        .then(items => {
            res.status(200).json({items: items})
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving items", error: err})
        })
})

//middleware
function validateId(req, res, next) {
    Potlucks.getById(req.params.id) 
        .then(([potuck]) => {
            if(potluck) {
                next();
            } else {
                res.status(404).json({message: "Potluck not found"})
            }
        })
}
function validateData(req, res, next) {
    if(req.body.name && req.body.location && req.body.datetime) {
        next();
    } else {
        res.status(400).json({message: "Please include the potluck name, location, and datetime in the body of your request."})
    }
}

function validateId(req, res, next) {
    return Potlucks.getById(req.params.id)
        .then(([potluck]) => {
            if(potluck) {
                next();
            } else {
                res.status(404).json({message: "Potluck not found"})
            }
        })
}


module.exports = router;