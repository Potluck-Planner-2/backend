// /api/potlucks

const express = require('express');
// const auth = require('../auth/auth-middleware.js');
const router = express.Router();

const Potlucks = require('./potluck-model.js');


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

//DELETE | /potlucks/:id | Delete a potluck, IF you're the organizer  (decode token)


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