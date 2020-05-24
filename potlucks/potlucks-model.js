const db = require("../database/db-config");

module.exports = {
  findPotlucks,
  findPotlucksById,
  findUsersByPotluck,
  addPotluck,
  updatePotluck,
  removePotluck
};

function findPotlucks() {
  return db()
}
