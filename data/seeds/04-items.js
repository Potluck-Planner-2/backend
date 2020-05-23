
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, user_id: 1, potluck_id: 1, name: 'Peanut Brittle'},
        {id: 2, user_id: 1, potluck_id: 2, name: 'Grilled Seahorse'},
        {id: 3, user_id: 1, potluck_id: 3, name: 'Dog Food'},
        {id: 4, user_id: 1, potluck_id: 4, name: 'Plucked Cactus'},
        {id: 5, user_id: 1, potluck_id: 5, name: 'A Salad'},
        {id: 6, user_id: 1, potluck_id: 6, name: 'Diet Soda'},
        {id: 7, user_id: 1, potluck_id: 7, name: 'A Single Plum'},
        {id: 8, user_id: 1, potluck_id: 8, name: 'Cardboard'},
        {id: 9, user_id: 1, potluck_id: 9, name: 'Mashed Potatoes'},
        {id: 10, user_id: 1, potluck_id: 10, name: 'Savory Pie'},

        {id: 11, user_id: 2, potluck_id: 2, name: 'Peeled Grapes'},
        {id: 12, user_id: 3, potluck_id: 3, name: '3 Kinds Of Salt'},
        {id: 13, user_id: 4, potluck_id: 4, name: 'Triple Pickled Pickles'},
        {id: 14, user_id: 5, potluck_id: 5, name: 'Soup (no hair)'},
        {id: 15, user_id: 6, potluck_id: 6, name: 'Marzipan Katanas'},
      ]);
    });
};
