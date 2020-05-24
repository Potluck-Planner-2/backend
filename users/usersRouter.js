const router = require("express").Router();
const Users = require("./users-model");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    console.log("users error", err);
    res.status(500).json({
      message: "there was an error accessing the users", error: err
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

router.put("/:id", async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    };
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
    userInfo.password = hash;
    const updateUserInfo = await Users.update(userInfo, req.params.id);
    res.status(200).json(updateUserInfo);
  } catch (err) {
    console.log("update user info error", err);
    res.status(500).json({
      message: "there was a error updating this user", error: err
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await Users.remove(req.params.id);
    res.status(200).json(deleteUser);
  } catch (err) {
    console.log("deleteUser error", err);
    res.status(500).json({ message: "there was an error deleting user", error:err});
  }
});

module.exports = router;
