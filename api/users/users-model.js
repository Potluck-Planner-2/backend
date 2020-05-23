const db = require('../../dbConfig.js');

module.exports = {
    getAll,
    getByid,
    getByUsername,
    insert,
    update,
    remove
}

function getAll() {
    return db.select('*')
        .from('users');
}

function getByid(id) {
    return db.select('*')
        .from('users')
        .where({id});
}

function getByUsername(username) {
    return db.select('*')
        .from('users')
        .where({username})
}

function insert(userInfo) {
    return db('users')
        .insert(userInfo);
}

function update(id, changes) {
    return db('users')
        .where({id})
        .update(changes);
}

function remove() {
    return db('users')
        .where({id})
        .del();
}
