const db = require('../../dbConfig.js');

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
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

function insert(data) {
    return db('invites')
        .insert(data)
}

function update() {
    return 
}

function remove() {
    return 
}
