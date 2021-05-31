const Route = require("express").Router();

const { signup } = require("../../controllers/auth.controller");

Route.post("/", signup);

module.exports = Route;
