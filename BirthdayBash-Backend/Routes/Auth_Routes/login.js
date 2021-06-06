const Route = require("express").Router();

const { login } = require("../../controllers/login.controller");

Route.post("/", login);

module.exports = Route;
