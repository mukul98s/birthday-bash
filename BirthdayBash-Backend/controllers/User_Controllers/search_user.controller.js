const db = require("../../db/index");

module.exports = {
  searchUser: async (req, res, next) => {
    try {
      const { search_term, last_seen_id } = req.body;

      const lowerCaseSearchTerm = search_term.toLowerCase();

      if (last_seen_id) {
        const moreResults = await db.query(
          "SELECT username,user_id,created_at AS id FROM users WHERE username LIKE $1 AND created_at > $2 ORDER BY created_at LIMIT 10",
          ["%" + lowerCaseSearchTerm + "%", last_seen_id]
        );

        if (moreResults.rowCount > 0) {
          res.json(moreResults.rows);
        } else {
          return res.status(204).send("No More Match Found");
        }
      } else {
        const searchResult = await db.query(
          "SELECT username,user_id,created_at AS id FROM users WHERE username LIKE $1 ORDER BY created_at LIMIT 10",
          ["%" + lowerCaseSearchTerm + "%"]
        );

        if (searchResult.rowCount > 0) {
          res.json(searchResult.rows);
        } else {
          return res.status(404).send("No Match Found");
        }
      }
    } catch (error) {
      return next(error);
    }
  },
};
