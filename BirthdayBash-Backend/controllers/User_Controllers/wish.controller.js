const db = require('../../db/index');

module.exports = {
  wishUser: async (req, res, next) => {
    try {
      const { userToWish } = req.body;
      const { user_id } = req.payload;
      await db.query(
        'INSERT INTO wishes(source_user_id,dest_user_id) VALUES($1,$2)',
        [user_id, userToWish]
      );
      res.status(200).json('Wished Successfully');
    } catch (err) {
      return next(err);
    }
  },
};
