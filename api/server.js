const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const UserRouter = require('./users/users-router.js');

const server = express();

server.use(cors());
server.use(helmet())

server.use('/api/users', UserRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Server is up and running"});
});

module.exports = server;