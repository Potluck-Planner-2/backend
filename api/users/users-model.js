const db = require('../../dbConfig.js');

module.exports = {
    getAll,
    betByid,
    insert,
    update,
    remove
}

function getAll() {
    return db.select('*')
        .from('users')
}

function betByid() {
    return db.select('*')
        .from('users')
        .where({id})
}

function insert(userInfo) {
    return db('users')
        .insert(userInfo)
}

function update(id, changes) {
    return db('users')
        .where({id})
        .update(changes)
}

function remove() {
    return db('users')
        .where({id})
        .del()
}
