//DOCS https://docs.google.com/document/d/1G8k-reCTNEhWgWDavjxtSdSeiP2d3jreDvWusoFrtPQ/edit?usp=sharing

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const UserRouter = require('./users/users-router.js');
const LoginRouter = require('./login/login-router.js');
const PotlucksRouter = require('./potlucks/potluck-router.js');
const ItemsRouter = require('./items/items-router.js');
const InvitesRouter = require('./invites/invites-router');
const auth = require('./auth/auth-middleware.js');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());


server.use('/api/login', LoginRouter);



//RESTRICTED
server.use('/api/users', auth, UserRouter);
server.use('/api/potlucks', auth, PotlucksRouter);
server.use('/api/items', auth, ItemsRouter);
server.use('/api/invites',auth, InvitesRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Server is up and running"});
});

module.exports = server;