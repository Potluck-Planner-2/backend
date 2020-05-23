
exports.up = function(knex) {
  //create the users table
  return knex.schema.createTable('users', tbl => {
      tbl.increments('id');
      tbl.string('username', 100)
        .unique()
        .notNullable();
      tbl.string('first_name', 20)
        .notNullable();
      tbl.string('last_name', 20)
        .notNullable();
      tbl.string('password')
        .notNullable();
    })
  //create the potlucks table
    .createTable('potlucks', tbl => {
        tbl.increments('id');
        tbl.string('name', 100)
            .notNullable();
        tbl.string('location', 100)
            .notNullable();
        tbl.integer('organizer_id')
            .notNullable();
        tbl.foreign('organizer_id')
            .references('users.id');
        tbl.string('datetime', 100)
            .notNullable();
    })
  //create the invites table
    .createTable('invites', tbl => {
        tbl.increments('id');
        tbl.integer('user_id')
            .notNullable();
        tbl.foreign('user_id')
            .references('users.id');
        tbl.integer('potluck_id')
            .notNullable();
        tbl.foreign('potluck_id')
            .references('potlucks.id');
    })
  //create the items table
    .createTable('items', tbl => {
        tbl.increments('id');
        tbl.string('name', 100)
            .notNullable();
        tbl.integer('user_id')
            .notNullable()
            .defaultTo(1);
        tbl.foreign('user_id')
            .references('users.id');
        tbl.integer('potluck_id')
            .notNullable();
        tbl.foreign('potluck_id')
            .references('potlucks.id');
    })
  
};

//remove tables in reverse order
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items')
  .dropTableIfExists('invites')
  .dropTableIfExists('potlucks')
  .dropTableIfExists('users')
};
