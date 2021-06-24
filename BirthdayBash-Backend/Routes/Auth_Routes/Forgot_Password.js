const Route = require("express").Router();

const {
  forgotPassword,
} = require("../../controllers/forgot_password.controller");

Route.get("/", forgotPassword);

module.exports = Route;
