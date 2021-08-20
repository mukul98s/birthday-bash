const db = require('../../db/index');

module.exports = {
  searchUser: async (req, res, next) => {
    try {
      const { search_term, last_seen_id } = req.body;

      const lowerCaseSearchTerm = search_term.toLowerCase();

      if (last_seen_id) {
        const moreResults = await db.query(
          'SELECT user_id, username, id FROM users WHERE username LIKE $1 AND id > $2 ORDER BY id LIMIT 10',
          ['%' + lowerCaseSearchTerm + '%', last_seen_id]
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
          return res.status(204).json('No More Match Found');
        }
      } else {
        const searchResult = await db.query(
          'SELECT user_id, username, id FROM users WHERE username LIKE $1 ORDER BY id LIMIT 10',
          ['%' + lowerCaseSearchTerm + '%']
        );

        if (searchResult.rowCount > 0) {
          if (searchResult.rowCount == 10) {
            const last_id = searchResult.rows[searchResult.rowCount - 1].id;
            res.json(searchResult.rows, {
              last_seen_id: last_id,
            });
          } else {
            res.json(searchResult.rows);
          }
        } else {
          return res.status(404).json('No Match Found');
        }
      }
    } catch (error) {
      return next(error);
    }
  },
};
