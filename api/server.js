const express = require("express");
const accountRoutes = require('./accounts/accounts-router')

const server = express();

server.use(express.json());
server.use('/accounts', accountRoutes)

server.get('/', (req, res) => {
    res.send({message: 'hello'})
})

module.exports = server;
