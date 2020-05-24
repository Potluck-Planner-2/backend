const db = require("../database/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUserByPotlucks,
  update,
  remove
};

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}

function find() {
  return db("users")
}



function findBy(filter) {
  // console.log("filter", filter);
  return db("users")
    .where(filter)
}

function findUserByPotlucks(user_id) {
  return db("potlucks")
  .where({ user_id })
}

function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return findUserById(id);
    });
}

async function remove(id) {
  const user = await findById(id);
  db("users")
  .where({ id })
  .del();
  return user;
}
