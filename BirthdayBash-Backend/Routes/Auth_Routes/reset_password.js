const Route = require('express').Router();

const {
  resetPassword,
} = require('../../controllers/Auth_Controllers/reset_password.controller');

Route.post('/:user_id/:token', resetPassword);

module.exports = Route;
