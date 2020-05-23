// /api/potlucks

const express = require('express');
const auth = require('../auth/auth-middleware.js');
const router = express.Router();

const Potlucks = require('./potluck-model.js');


//GET /potlucks | View all potlucks that have been submitted

router.get('/', auth, (req, res) => {
    Potlucks.getAll()
        .then(potlucks => {
            res.status(200).json({potlucks: potlucks})
        })
        .catch(err => {
            res.status(500).json({message: "Error retreiving potlucks", error: err})
        })
})

//GET /potlucks/:id | View individual potluck details

//GET potlucks/mine/organizer | View potlucks that you've organized 

//GET potlucks/mine/guest | View potluck if you've been invited as a guest 

//GET potlucks/:id/guests | Get a list of all invited guests to a potluck

//POST /potlucks | Create a potluck {name, location, datetime}

// PUT /potlucks/:id | Edit a potluck IF you are the organizer  (decode token) {name, location, datetime}

//DELETE | /potlucks/:id | Delete a potluck, IF you're the organizer  (decode token)







module.exports = router;