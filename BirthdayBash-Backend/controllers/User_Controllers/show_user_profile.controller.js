const db = require("../../db/index");

module.exports = {
  showUserProfile: async (req, res, next) => {
    try {
      const { user_id } = req.payload;
      const currentUser = await db.query(
        "SELECT username,email,gender,dob,bio FROM users WHERE user_id = $1",
        [user_id]
      );

      res.status(200).json(currentUser.rows[0]);
    } catch (error) {
      return next(error);
    }
  },
};