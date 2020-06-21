const db = require('../../dbConfig.js');

module.exports = {
    getByUsername
}

function getByUsername(username) {
    return db.select('*')
        .from('users')
        .where({username})
}