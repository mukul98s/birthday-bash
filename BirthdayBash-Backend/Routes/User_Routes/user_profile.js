const Route = require('express').Router();

const {
  editProfile,
} = require('../../controllers/User_Controllers/edit_profile.controller');

const {
  showUserProfile,
  showSpecificUserProfile,
} = require('../../controllers/User_Controllers/show_user_profile.controller');

const {
  searchUser,
} = require('../../controllers/User_Controllers/search_user.controller');

const {
  followUser,
  unFollowUser,
} = require('../../controllers/User_Controllers/connection_maker.controller');

const {
  homeTimeline,
} = require('../../controllers/User_Controllers/home_timeline.controller');

const {
  wishUser,
} = require('../../controllers/User_Controllers/wish.controller');

// const {
//   uploadProfilePic,
// } = require("../../controllers/User_Controllers/upload_profile_pic.controller");

Route.get('/show-user-profile', showUserProfile);

Route.get('/show-user-profile/:id', showSpecificUserProfile);

Route.get('/search-user', searchUser);

Route.put('/edit-profile', editProfile);

Route.post('/follow', followUser);

Route.delete('/unfollow', unFollowUser);

Route.get('/home', homeTimeline);

Route.post('/wish', wishUser);

// Route.post("/uploadProfilePic", uploadProfilePic);

module.exports = Route;
