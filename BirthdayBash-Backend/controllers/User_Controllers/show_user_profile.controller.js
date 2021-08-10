const db = require("../../db/index");

module.exports = {
  showUserProfile: async (req, res, next) => {
    try {
      const { user_id } = req.payload;
      const currentUser = await db.query(
        "SELECT username,email,gender,followers_count,following_count,dob,bio FROM users WHERE user_id = $1",
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
        "SELECT username,bio,followers_count,following_count FROM users WHERE user_id = $1",
        [id]
      );

      res.status(200).json(User.rows[0]);
    } catch (error) {
      return next(error);
    }
  },

  showFollowingList: async (req, res, next) => {
    try {
      const { user_id } = req.payload;
      const { last_seen_id } = req.body;
      const id = req.params.id;

      if (user_id == id) {
        if (last_seen_id) {
          const moreResults = await db.query(
            "SELECT dest_user_id AS user_id, dest_username AS username, created_at AS id FROM followers WHERE source_user_id = $1 AND created_at > $2 ORDER BY created_at LIMIT 10",
            [user_id, last_seen_id]
          );

          if (moreResults.rowCount > 0) {
            res.json(moreResults.rows);
          } else {
            return res.send("End Of List");
          }
        } else {
          const ResultList = await db.query(
            "SELECT dest_user_id AS user_id, dest_username AS username, created_at AS id FROM users WHERE source_user_id = $1 ORDER BY created_at LIMIT 10",
            [user_id]
          );

          if (ResultList.rowCount > 0) {
            res.json(ResultList.rows);
          } else {
            return res.status(204).send("No Following Data To Show");
          }
        }
      } else {
        if (last_seen_id) {
          const moreResults = await db.query(
            "SELECT dest_user_id AS user_id, dest_username AS username, created_at AS id FROM followers WHERE source_user_id = $1 AND created_at > $2 ORDER BY created_at LIMIT 10",
            [id, last_seen_id]
          );

          if (moreResults.rowCount > 0) {
            res.json(moreResults.rows);
          } else {
            return res.send("End Of List");
          }
        } else {
          const ResultList = await db.query(
            "SELECT dest_user_id AS user_id, dest_username AS username, created_at AS id FROM users WHERE source_user_id = $1 ORDER BY created_at LIMIT 10",
            [id]
          );

          if (ResultList.rowCount > 0) {
            res.json(ResultList.rows);
          } else {
            return res.status(204).send("No Following Data To Show");
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  },
};
