const db = require('../../dbConfig.js');

module.exports = {
    getAll,
    getById,
    getByOrganizer,
    getByGuest,
    getGuests,
    insert,
    update,
    remove,
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

function getByOrganizer(id) {
    return db.select('potlucks.id', db.ref('potlucks.name').as('potluck_name'), 'potlucks.location', 'potlucks.organizer_id', 'potlucks.datetime', db.ref('users.id').as('organizer_id'), db.ref('users.first_name').as('organizer_first_name'), db.ref('users.last_name').as('organizer_last_name'), db.ref('users.id').as('organizer_id'), db.ref('users.username').as('organizer_username'))
    .from('potlucks')
    .where({'potlucks.organizer_id': id})
    .join('users', 'users.id', '=', 'potlucks.organizer_id')
}


function getByGuest(id) {
    return db.select(db.ref('potlucks.id').as('potluck_id'), 'invites.attending', db.ref('potlucks.name').as('potluck_name'), 'potlucks.location', 'potlucks.organizer_id', 'potlucks.datetime', db.ref('users.id').as('organizer_id'), db.ref('users.first_name').as('organizer_first_name'), db.ref('users.last_name').as('organizer_last_name'), db.ref('users.id').as('organizer_id'), db.ref('users.username').as('organizer_username'))
    .from('potlucks')
    .join('users', 'users.id', '=', 'potlucks.organizer_id')
    .join('invites', 'potlucks.id', '=', 'invites.potluck_id')
    .where({'invites.user_id': id})
}

function getGuests(id) {
    return db.select(db.ref('invites.id').as('invite_id'), 'invites.user_id', 'invites.potluck_id', 'users.username', 'users.first_name', 'users.last_name')
        .from('invites')
        .where({'invites.potluck_id': id})
        .join('users', 'users.id', '=', 'invites.user_id')
}

function insert(data) {
    return db('potlucks')
        .insert(data);
}

function update(id, changes) {
    return db('potlucks')
        .where({id})
        .update(changes);
}

function remove(id) {
    return db('potlucks')
        .where({id})
        .del()
}
