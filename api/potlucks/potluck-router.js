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

//POST /potlucks | Create a potluck {name, location, datetime}

// PUT /potlucks/:id | Edit a potluck IF you are the organizer  (decode token) {name, location, datetime}

//DELETE | /potlucks/:id | Delete a potluck, IF you're the organizer  (decode token)







module.exports = router;