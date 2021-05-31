const Route = require("express").Router();

const { login } = require("../../controllers/auth.controller");

Route.post("/", login);

module.exports = Route;
