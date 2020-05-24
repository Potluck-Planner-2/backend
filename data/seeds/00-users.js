
const bcrypt = require('bcryptjs')


const patrickPass = bcrypt.hashSync('harl',10);
const barbaraPass = bcrypt.hashSync('moore',10);
const cristinaPass = bcrypt.hashSync('altreche',10);
const victoriaPass = bcrypt.hashSync('topham',10);
const lisaPass = bcrypt.hashSync('maskovich',10);
const nobodyPass = bcrypt.hashSync('nobody',10)


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'nobody', first_name: 'Nobody ', last_name: ' ', password: nobodyPass},
        {id: 2, username: 'patrick', first_name: 'Patrick', last_name: 'Harl', password: patrickPass},
        {id: 3, username: 'barbara', first_name: 'Barbara', last_name: 'Moore', password: barbaraPass},
        {id: 4, username: 'cristina', first_name: 'Cristina', last_name: 'Altreche', password: cristinaPass},
        {id: 5, username: 'victoria', first_name: 'Victoria', last_name: 'Topham', password: victoriaPass},
        {id: 6, username: 'lisa', first_name: 'Lisa', last_name: 'Maskovich', password: lisaPass}
        
      ]);
    });
};
