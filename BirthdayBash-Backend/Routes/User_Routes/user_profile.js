const Route = require("express").Router();

const {
  editProfile,
} = require("../../controllers/User_Controllers/edit_profile.controller");
const {
  showUserProfile,
} = require("../../controllers/User_Controllers/show_user_profile.controller");
const {
  searchUser,
} = require("../../controllers/User_Controllers/search_user.controller");
const {
  uploadProfilePic,
} = require("../../controllers/User_Controllers/upload_profile_pic.controller");

Route.get("/showUserProfile", showUserProfile);

Route.get("/searchUser", searchUser);

Route.put("/editProfile", editProfile);

// Route.post("/uploadProfilePic", uploadProfilePic);

module.exports = Route;
