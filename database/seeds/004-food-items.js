
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food-items').del()
    .then(function () {
      // Inserts seed entries
      return knex('food-items').insert([
        {id: 1, user_id: 1, potluck_id: 1, nameFoodItem: "Jello" },
        {id: 2, user_id: 3, potluck_id: 3, nameFoodItem: "chips" },
        {id: 3, user_id: 2, potluck_id: 2, nameFoodItem: "Pitcher of Cherry Kool-Aid"}
      ]);
    });
};
