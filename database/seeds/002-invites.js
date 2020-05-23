exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('invites').del()
    .then(function () {
      // Inserts seed entries
      return knex('invites').insert([
        {id: 1, user_id: 1, potluck_id: 1 },
        {id: 2, user_id: 3, potluck_id: 3 },
        {id: 3, user_id: 2, potluck_id: 2 }
      ]);
    });
};
