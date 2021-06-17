const Route = require("express").Router();

const {
  forgotPassword,
} = require("../../controllers/forgot_password.controller");
const {
  resetPassword,
} = require("../../controllers/forgot_password.controller");

Route.get("/", forgotPassword);

Route.post("/", resetPassword);

module.exports = Route;
