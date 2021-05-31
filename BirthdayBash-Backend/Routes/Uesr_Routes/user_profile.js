const Route = require("express").Router();
const db = require("../../db/index");
const { verifyAccessToken } = require("../../helper/jwt_helper");

Route.get("/showUserProfile", verifyAccessToken, async (req, res) => {
  try {
    const { user_id } = req.payload;

    const currentUser = await db.query(
      "SELECT username,email,dob,bio FROM users WHERE user_id = $1",
      [user_id]
    );

    res.status(200).json(currentUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Route;
