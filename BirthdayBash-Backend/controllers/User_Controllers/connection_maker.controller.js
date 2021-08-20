const db = require('../../db/index');
const createError = require('http-errors');

module.exports = {
  followUser: async (req, res, next) => {
    const { userToFollow } = req.body;
    try {
      const { user_id } = req.payload;

      if (!userToFollow) {
        throw createError.BadRequest(
          'Invalid Request(userToUnFollow not included)'
        );
      }

      if (user_id == userToFollow) {
        throw createError.BadRequest('Invalid Request');
      }

      await db.query(
        'INSERT INTO followers(source_user_id,dest_user_id) VALUES($1,$2)',
        [user_id, userToFollow]
      );

      res.status(200).json('Followed Successfully');
    } catch (error) {
      return next(error);
    }
  },
  unFollowUser: async (req, res, next) => {
    const { userToUnFollow } = req.body;
    try {
      const { user_id } = req.payload;
      if (!userToUnFollow) {
        throw createError.BadRequest(
          'Invalid Request(userToUnFollow not included)'
        );
      }
      if (user_id == userToUnFollow) {
        throw createError.BadRequest('Invalid Request');
      }

      await db.query(
        'DELETE FROM followers WHERE source_user_id=$1 AND dest_user_id=$2',
        [user_id, userToUnFollow]
      );

      res.status(200).json('UnFollowed Successfully');
    } catch (error) {
      return next(error);
    }
  },
};
