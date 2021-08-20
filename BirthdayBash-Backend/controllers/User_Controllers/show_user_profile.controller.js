const db = require('../../db/index');

module.exports = {
  showUserProfile: async (req, res, next) => {
    try {
      const { user_id } = req.payload;
      const currentUser = await db.query(
        'SELECT username,email,gender,followers_count,following_count,dob,bio FROM users WHERE user_id = $1',
        [user_id]
      );

      res.status(200).json(currentUser.rows[0]);
    } catch (error) {
      return next(error);
    }
  },
  showSpecificUserProfile: async (req, res, next) => {
    try {
      const id = req.params.id;
      const User = await db.query(
        'SELECT username,bio,followers_count,following_count FROM users WHERE user_id = $1',
        [id]
      );

      res.status(200).json(User.rows[0]);
    } catch (error) {
      return next(error);
    }
  },
};
