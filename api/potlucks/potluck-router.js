// /api/potlucks

const express = require('express');

const router = express.Router();

//GET /potlucks | View all potlucks that have been submitted

router.get('/', (req, res) => {
    res.status(200).json({message: "You reached the potluck router", req: req.jwt})
})
//POST /potlucks | Create a potluck {name, location, datetime}

// PUT /potlucks/:id | Edit a potluck IF you are the organizer  (decode token) {name, location, datetime}

//DELETE | /potlucks/:id | Delete a potluck, IF you're the organizer  (decode token)

//GET potlucks/mine/organizer | View potlucks that you've organized 

//GET potlucks/mine/guest | View potluck if you've been invited as a guest 

//GET potlucks/:id/guests | Get a list of all invited guests to a potluck

//GET /potlucks/:id | View individual potluck details

module.exports = router;