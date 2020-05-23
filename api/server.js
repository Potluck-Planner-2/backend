const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js.js.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);
server.use('/api/potlucks', potlucksRouter);
server.use('/api/attendees', attendeesRouter);
server.use('/api/foodItems', foodItemsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" })
})

module.exports = server;
