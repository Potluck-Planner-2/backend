const express = require('express');
const server = require('./api/server.js');

server.use(express.json());

const port = process.env.PORT || 4000
server.listen(port, _ => {
    console.log(`Listening on ${port}`);
})