
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('invites').del()
    .then(function () {
      // Inserts seed entries
      return knex('invites').insert([
        {id: 1, user_id: 6, attending: true, potluck_id: 1},
        {id: 2, user_id: 6, attending: true, potluck_id: 2},
        {id: 3, user_id: 6, attending: true, potluck_id: 3},
        {id: 4, user_id: 6, attending: true, potluck_id: 4},
        {id: 5, user_id: 6, attending: true, potluck_id: 5},
        {id: 6, user_id: 6, attending: true, potluck_id: 6},

        {id: 7, user_id: 2, attending: true, potluck_id: 2},
        {id: 8, user_id: 2, attending: true, potluck_id: 3},
        {id: 9, user_id: 2, attending: true, potluck_id: 4},
        {id: 10, user_id: 2, attending: true, potluck_id: 5},
        {id: 11, user_id: 2, attending: true, potluck_id: 6},
        {id: 12, user_id: 2, attending: true, potluck_id: 7},

        {id: 13, user_id: 3, attending: true, potluck_id: 3},
        {id: 14, user_id: 3, attending: true, potluck_id: 4},
        {id: 15, user_id: 3, attending: true, potluck_id: 5},
        {id: 16, user_id: 3, attending: true, potluck_id: 6},
        {id: 17, user_id: 3, attending: true, potluck_id: 7},
        {id: 18, user_id: 3, attending: true, potluck_id: 8},

        {id: 19, user_id: 4, attending: true, potluck_id: 4},
        {id: 20, user_id: 4, attending: true, potluck_id: 5},
        {id: 21, user_id: 4, attending: true, potluck_id: 6},
        {id: 22, user_id: 4, attending: true, potluck_id: 7},
        {id: 23, user_id: 4, attending: true, potluck_id: 8},
        {id: 24, user_id: 4, attending: true, potluck_id: 9},

        {id: 25, user_id: 5, attending: true, potluck_id: 5},
        {id: 26, user_id: 5, attending: true, potluck_id: 6},
        {id: 27, user_id: 5, attending: true, potluck_id: 7},
        {id: 28, user_id: 5, attending: true, potluck_id: 8},
        {id: 29, user_id: 5, attending: true, potluck_id: 9},
        {id: 30, user_id: 5, attending: true, potluck_id: 10},
      ]);
    });
};
