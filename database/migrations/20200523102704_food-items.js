

exports.up = function (knex) {
  return knex.schema.createTable("food-items", tbl => {
    tbl.increments();
    tbl.boolean('user_id', 250)  //ask Victoria aboeu how this will be implemented
      .notNullable()
      .references("id")
      .inTable("users");
    tbl.string('potluck_id', 150)
      .notNullable()
      .references("id")
      .inTable("potlucks");
    tbl.string("nameFoodItem")
      .notNullable()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('food-items');
};
