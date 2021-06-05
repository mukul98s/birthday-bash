const Route = require("express").Router();

const {
  showUserProfile,
  searchUser,
  editProfile,
} = require("../../controllers/user.controller");

Route.get("/showUserProfile", showUserProfile);

Route.get("/searchUser", searchUser);

Route.put("/editProfile", editProfile);

module.exports = Route;
