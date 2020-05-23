
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: "GrannyFanny", first_name: "Fanny", last_name: "Thompson", password: "chocolateFrogs"},
        {id: 2, username: "Tyler the Potluck King", first_name: "Tyler", last_name: "Jensen", password: "FoodSongs"},
        {id: 3, username: "Jolly Green Salad Monster", first_name: "Lori", last_name: "Samson", password: "password"},
      ]);
    });
};
