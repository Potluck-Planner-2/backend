
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('potlucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('potlucks').insert([
        {id: 1, location: 'The Lakehouse', name: "Andre's Going Away Party", organizer_id: 1, datetime: new Date()},
        {id: 2, location: 'Under a bridge', name: 'Labor Day Cookout', organizer_id: 2, datetime: new Date()},
        {id: 3, location: 'Next to that one place that has really good pizza', name: 'Come celebrate Juan passing the bar exam', organizer_id: 3, datetime: new Date()},
        {id: 4, location: "In old man Thompson's attic", name: 'Cheer up old man Thompson', organizer_id: 4, datetime: new Date()},
        {id: 5, location: "Where man nor beast dare tread", name: 'Cookoff To Cure smallpox', organizer_id: 5, datetime: new Date()},
        {id: 6, location: 'Six flags', name: 'Roller Coaster Protest Extravaganza', organizer_id: 1, datetime: new Date()},
        {id: 7, location: "In the tunnel i've been digging", name: 'Dirt Tasting', organizer_id: 2, datetime: new Date()},
        {id: 8, location: 'Where Jacob least expects it', name: "Jacob's Surprise Party", organizer_id: 3, datetime: new Date()},
        {id: 9, location: 'Your childhood home', name: "Meet Relatives You Don't Remember", organizer_id: 4, datetime: new Date()},
        {id: 10, location: 'In the city in the clouds', name: 'Come Be Betrayed By A Friend... Also, Ambrosia Salad!', organizer_id: 5, datetime: new Date()},
      ]);
    });
};
