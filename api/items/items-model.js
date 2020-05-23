const db = require('../../dbConfig.js');

module.exports = {
    getAll,
    getById,
    getByPotluckId,
    getByUserId,
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
    return db.select(db.ref('items.id').as('item_id'), 'items.name', 'items.potluck_id', 'items.user_id', 'items.name', 'users.username', db.ref('users.first_name').as('first_name'),db.ref('users.last_name').as('last_name'))
        .from('items')
        .where({'items.potluck_id': id})
        .join('users', 'users.id', '=', 'items.user_id')
}

function getByUserId(id) {
    return db.select(db.ref('items.id').as('item_id'), 'items.name', 'items.potluck_id', 'items.user_id', db.ref('potlucks.name').as('potluck_name'))
        .from('items')
        .where({'items.user_id': id})
        .join('potlucks', 'potlucks.id', '=', 'items.potluck_id')
}   

function insert(data) {
    return db('items')
        .insert(data);
}

function update(id, content) {
    return db('items')
        .where({id})
        .update(content);
}

function remove(id) {
    return db('items')
        .where({id})
        .delete();
}
