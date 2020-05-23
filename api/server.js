const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const UserRouter = require('./users/users-router.js');
const LoginRouter = require('./login/login-router.js');
const PotlucksRouter = require('./potlucks/potluck-router.js');

const auth = require('./auth/auth-middleware.js');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/users', UserRouter);
server.use('/api/login', LoginRouter);

//RESTRICTED

server.use('/api/potlucks', auth, PotlucksRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Server is up and running"});
});

module.exports = server;