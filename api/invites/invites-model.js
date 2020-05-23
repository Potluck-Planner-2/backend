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

function insert() {
    return 
}

function update() {
    return 
}

function remove() {
    return 
}
