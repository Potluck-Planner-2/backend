
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('potlucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('potlucks').insert([
        {id: 1, potluckName: "Kenny's out on Parole celebration Potluck!", location: "Granny's backyard", organizer: "Granny", date_time: "Sunday, May 31st @ 4pm"},
        {id: 2, potluckName: "Family Fight Club Awards Night Potluck", location: "Granny's basement", organizer: "Granny", date_time: "Saturday, June 20th @ 2pm"},
        {id: 3, potluckName: "Potluck to celebrate Grandad's new hip!", location: "Granny's backyard", organizer: "Granny", date_time: "Tuesday, June 30st @ 6pm"},
      ]);
    });
};
