const db = require("../database/db-config");

module.exports = {
  findPotlucks,
  findPotluckById,
  findUsersByPotluck,
  addPotluck,
  updatePotluck,
  removePotluck
};

function findPotlucks() {
  return db("potlucks");
}
function findPotluckById(id) {
  return db("potlucks")
    .where({ id })
    .first();
}
function findUsersByPotluck(potluck_id) {
  return db
    .select("users.id", "users.username")
    .from("potluck_users")
    .join("users", "potluck_users.user_id", "=", "users.id")
    .where("potluck_users.potluck_id", "=", potluck_id);
}
async function addPotluck(potluck) {
  const [id] = await db("potlucks").insert(potluck, "id");
  const potluckUser = {
    user_id: potluck.host_id,
    potluck_id: id,
    attending: true
  };
  db("potluck_users").insert(potluckUser);
  return findPotluckById(id);
}
function updatePotluck(changes, id) {
  return db("potlucks")
    .where({ id })
    .update(changes)
    .then(() => {
      return findPotluckById(id);
    });
}
async function removePotluck(id) {
  const potluck = await findPotluckById(id);
  db("potlucks")
    .where({ id })
    .del();
  return potluck;
}
