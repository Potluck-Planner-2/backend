
exports.up = function (knex) {
  return knex.schema.createTable("potlucks", tbl => {
    tbl.increments();
    tbl.string('potluckName', 250)
      .notNullable()
    tbl.string('location', 300)
      .notNullable();
    tbl.string('organizer', 250)
      .notNullable();
    tbl.string('date_time', 150)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('potlucks');
};
