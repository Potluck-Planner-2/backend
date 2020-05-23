const db = require('../../dbConfig.js');

module.exports = {
    getAll,
    getById,
    getByPotluckId,
    getByUser,
    insert,
    update,
    remove

}

function getAll() {
    return db.select(db.ref('items.id').as('item_id'), 'items.name', 'items.potluck_id', 'items.user_id', 'items.name', 'users.username', db.ref('users.first_name').as('first_name'),db.ref('users.last_name').as('last_name'))
        .from('items')
        .join('users', 'users.id', '=', 'items.user_id')
        
}

function getById(id) {
    return db.select(db.ref('items.id').as('item_id'), 'items.name', 'items.potluck_id', 'items.user_id', 'items.name', 'users.username', db.ref('users.first_name').as('first_name'),db.ref('users.last_name').as('last_name'))
        .from('items')
        .where({'items.id': id})
        .join('users', 'users.id', '=', 'items.user_id')

}

function getByPotluckId(id) {
    return db.select('*')
        .from('items')
        .where({'potluck_id': id})
}

function getByUser() {
    return 
}

function insert() {
    return 
}

function update() {
    return 
}

function remove() {
    return 
}
