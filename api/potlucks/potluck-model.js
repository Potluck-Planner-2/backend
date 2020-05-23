const db = require('../../dbConfig.js');

module.exports = {
    getAll,
    getById,
    getByOrganizer,
    getByGuest,
    insert,
    update,
    remove
}

function getAll() {
    return db.select('potlucks.id', db.ref('potlucks.name').as('potluck_name'), 'potlucks.location', 'potlucks.organizer_id', 'potlucks.datetime', db.ref('users.id').as('organizer_id'), db.ref('users.first_name').as('organizer_first_name'), db.ref('users.last_name').as('organizer_last_name'), db.ref('users.id').as('organizer_id'), db.ref('users.username').as('organizer_username'))
        .from('potlucks')
        .join('users', 'users.id', '=', 'potlucks.organizer_id')
}

function getById(id) {
    return db.select('potlucks.id', db.ref('potlucks.name').as('potluck_name'), 'potlucks.location', 'potlucks.organizer_id', 'potlucks.datetime', db.ref('users.id').as('organizer_id'), db.ref('users.first_name').as('organizer_first_name'), db.ref('users.last_name').as('organizer_last_name'), db.ref('users.id').as('organizer_id'), db.ref('users.username').as('organizer_username'))
    .from('potlucks')
    .where({'potlucks.id': id})
    .join('users', 'users.id', '=', 'potlucks.organizer_id')
}

function getByOrganizer() {
    return
}

function getByGuest() {
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
