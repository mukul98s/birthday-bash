const Route = require('express').Router();

const {
  forgotPassword,
} = require('../../controllers/Auth_Controllers/forgot_password.controller');

Route.get('/', forgotPassword);

module.exports = Route;
