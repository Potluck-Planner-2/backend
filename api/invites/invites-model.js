const db = require('../../dbConfig.js');

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove,
    getByPotluck,
}

function getAll() {
    return db.select('*')
        .from('invites')
}

function getById(id) {
    return db.select('*')
        .from('invites')
        .where({id})
}

function getByPotluck(id) {
    return db.select('*')
        .from('invites')
        .where({'potluck_id': id})
}

function insert(data) {
    return db('invites')
        .insert(data)
}

function update(id, data) {
    return db('invites')
        .where({id})
        .update(data)
}

function remove(id) {
    return db('invites')
        .where({id})
        .delete()
}
