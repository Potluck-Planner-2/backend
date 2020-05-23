// /api/items
const express = require('express')
const Items = require('./items-model.js');
const router = express.Router();

//GET /items | get list of all items
router.get('/', (req, res) => {
    Items.getAll()
        .then(items => {
            res.status(200).json({items: items})
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving items", error: err})
        })
});

//GET /items/:id | get item by id
router.get('/:id', (req, res) => {
    Items.getById(req.params.id)
        .then(([item ])=> {
            if(item){
                res.status(200).json({item: item})
            } else {
                res.status(404).json({message: "Item not found"})
            }
            
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving items", error: err})
        })
});

//GET /items/user/:id | Get list of items by user id


//POST /items | add an item


//PUT /items/:id | edit an item - this can be used for a guest to select that they would like to bring the item by changing the user_id

//DELETE /items/:itemid | Delete an item IF you're the organizer (decode token)


//middleware


module.exports = router;