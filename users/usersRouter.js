const router = require("express").Router();
const Users = require("./users-model");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    console.log("users error", err);
    res.status(500).json({ message: "there was an error accessing the users", error: err
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log("findById error", err);
    res.status(500).json({
      message: "there was an error getting this user",
      error: err
    });
  }
});

router.get("/:id/potlucks", async (req, res) => {
  try {
    const potlucks = await Users.findUserByPotlucks(req.params.id);
    res.status(200).json(potlucks)
  } catch (err) {
      console.log("findUserByPotlucks error", err)
      res.status(500).json({ message: "there was an error finding the potlucks for that person", error: err });
  }
});

router.put()

module.exports = router;
