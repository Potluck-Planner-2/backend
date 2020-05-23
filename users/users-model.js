const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
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
