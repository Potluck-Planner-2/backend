
exports.up = function (knex) {
  return knex.schema.createTable("invites", tbl => {
    tbl.increments();
    tbl.string('user_id', 250)
      .notNullable()
      .references("id")
      .inTable("users");
    tbl.string('potluck_id', 150)
      .notNullable()
      .references("id")
      .inTable("potlucks");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('invites');
};
