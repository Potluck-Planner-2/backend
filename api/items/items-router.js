// /api/items
const express = require('express')
const Items = require('./items-model.js');
const Users = require('../users/users-model.js');
const Potlucks = require('../potlucks/potluck-model.js');
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

    if (req.params.id === 'mine') {
        Items.getByUserId(req.jwt.subject)
        .then(items=> {
            res.status(200).json({items: items})
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving items", error: err})
        })
    } else {
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
    }
    
});

//GET /items/users/:id | Get list of items by user id
router.get('/users/:id', validateUserId, (req, res) => {
    Items.getByUserId(req.params.id)
        .then((items )=> {
            res.status(200).json({items: items})
        })
        .catch(err => {
            res.status(500).json({message: "Error retrieving items", error: err})
        })
});


//POST /items | add an item
//TODO: validate potluck id?
router.post('/', validateBody, validatePotluckId, (req, res) => {
    Items.insert(req.body) 
        .then(([id]) => {
            Items.getById(id)
                .then(([item]) => {
                    res.status(201).json({message: "Item successfully created", item: item})
                })
                .catch(err => {
                    res.status(500).json({message: "Item successfully created but we had an error retreiving the record. Proceed carefully.", error: err})
                })
            
        })
        .catch(err => {
            res.status(500).json({message: "Error creating item", error: err})
        })
})

//PUT /items/:id | edit an item - this can be used for a guest to select that they would like to bring the item by changing the user_id

router.put('/:id', validateId, validatePotluckId, (req, res) => {
    Items.update(req.params.id, req.body) 
        .then(num => {
            Items.getById(req.params.id)
                .then(([item]) => {
                    res.status(200).json({message: "Item successfully updated", item: item})
                })
                .catch(err => {
                    res.status(500).json({message: "Item updated successfully but we had an error retreiving the record. Proceed with caution.", error: err})
                })
           
        })
        .catch(err => {
            res.status(500).json({message: "Error updating item", error: err})
        })
})

//DELETE /items/:itemid | Delete an item IF you're the organizer (decode token)

router.delete('/:id', validateId, (req, res) => {
    Items.remove(req.params.id)
        .then(success => {
            res.status(200).json({message: "Item successfully deleted", num_of_records: success})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting item", error: err})
        })
})

//middleware
function validatePotluckId(req, res, next) {
    if(req.body.potluck_id || req.body.potluck_id === 0) {
        Potlucks.getById(req.body.potluck_id)
            .then(([potluck]) => {
                if(potluck) {
                    next();
                } else {
                    res.status(404).json({message: "Please include a valid potluck_id"})
                }
            })
    } else {
        next();
    }
}
function validateId(req, res, next) {
    Items.getById(req.params.id)
        .then(([items]) => {
            if(items) {
                next();
            } else {
                res.status(404).json({message: "Item not found"})
            }
        })
}
function validateBody(req, res, next) {
    if(req.body.potluck_id && req.body.name) {
        next();
    } else {
        res.status(400).json({message: "Please include a potluck_id and name in your submission"})
    }
}

function validateUserId(req, res, next) {
    Users.getByid(req.params.id)
        .then(([users]) => {
            if(users) {
                next();
            } else {
                res.status(404).json({message: "User not found"})
            }
        })
}

module.exports = router;