const Route = require("express").Router();

const { editProfile } = require("../../controllers/edit_profile.controller");
const {
  showUserProfile,
} = require("../../controllers/show_user_profile.controller");
const { searchUser } = require("../../controllers/search_user.controller");

Route.get("/showUserProfile", showUserProfile);

Route.get("/searchUser", searchUser);

Route.put("/editProfile", editProfile);

module.exports = Route;
