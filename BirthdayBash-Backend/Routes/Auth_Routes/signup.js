const Route = require("express").Router();

const { signup } = require("../../controllers/signup.controller");

Route.post("/", signup);

module.exports = Route;
