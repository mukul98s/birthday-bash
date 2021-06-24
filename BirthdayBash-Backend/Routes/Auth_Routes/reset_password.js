const Route = require("express").Router();

const {
  resetPassword,
} = require("../../controllers/reset_password.controller");

Route.post("/:user_id/:token", resetPassword);

module.exports = Route;
