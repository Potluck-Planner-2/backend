
exports.up = function (knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string('username', 250)
      .notNullable()
    tbl.string('first_name', 300)
      .notNullable();
    tbl.string('last_name', 300)
      .notNullable();
    tbl.string('password', 300)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
