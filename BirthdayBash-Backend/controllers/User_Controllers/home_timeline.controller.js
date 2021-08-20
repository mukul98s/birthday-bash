const db = require('../../db/index');

module.exports = {
  homeTimeline: async (req, res, next) => {
    try {
      const { user_id } = req.payload;
      const { last_seen_id } = req.body;

      if (last_seen_id) {
        // const moreResults = await db.query(
        //   "SELECT dest_user_id AS user_id, username, dob, id FROM full_data WHERE source_user_id = $1 AND id > $2 ORDER BY id LIMIT 10",
        //   [user_id, last_seen_id]
        // );
        const moreResults = await db.query(
          'SELECT followers.id,followers.dest_user_id ,users.username, users.dob from followers inner join users ON users.user_id=followers.dest_user_id WHERE followers.source_user_id=$1 AND followers.id > $2 ORDER BY followers.id LIMIT 10',
          [user_id, last_seen_id]
        );

        if (moreResults.rowCount > 0) {
          if (moreResults.rowCount == 10) {
            const last_id = moreResults.rows[moreResults.rowCount - 1].id;
            res.json(moreResults.rows, {
              last_seen_id: last_id,
            });
          } else {
            res.json(moreResults.rows);
          }
        } else {
          return res.json('End Of List');
        }
      } else {
        // const ResultList = await db.query(
        //   "SELECT dest_user_id AS user_id,username,dob id FROM full_data WHERE source_user_id = $1 ORDER BY id LIMIT 10",
        //   [user_id]
        // );
        const ResultList = await db.query(
          'SELECT followers.id,followers.dest_user_id ,users.username, users.dob from followers inner join users ON users.user_id=followers.dest_user_id WHERE followers.source_user_id=$1 ORDER BY followers.id LIMIT 10',
          [user_id]
        );

        if (ResultList.rowCount > 0) {
          if (ResultList.rowCount == 10) {
            const last_id = ResultList.rows[ResultList.rowCount - 1].id;
            res.json(ResultList.rows, {
              last_seen_id: last_id,
            });
          } else {
            res.json(ResultList.rows);
          }
        } else {
          return res.status(204).json('No Following Data To Show');
        }
      }
    } catch (error) {
      return next(error);
    }
  },
};
