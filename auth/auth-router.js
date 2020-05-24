const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require('express').Router();

const Users = require("../users/users-model.js");

const { isValid } = require("../users/users-service");


router.post('/register', (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 5);

    credentials.password = hash;

    Users.add(credentials)
    .then((user) => {
      res.status(201).json( user );
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
} else {
  res.status(400).json({
    message: "please provide username, first & last name, and a password",
  });
}
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);

          res.status(200).json({ message: "Welcome to potluck API", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password",
    });
  }
});

function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET || "PotlucksAreGreatIfYouDontGetFoodPoisoning";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}
module.exports = router;
