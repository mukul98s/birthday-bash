const createError = require("http-errors");
const db = require("../db/index");

module.exports = {
  searchUser: async (req, res, next) => {
    try {
      const { search_term, last_seen_id } = req.body;

      const lowerCaseSearchTerm = search_term.toLowerCase();

      if (last_seen_id) {
        const moreResults = await db.query(
          "SELECT username,user_id,id FROM users WHERE username LIKE $1 AND id > $2 ORDER BY id LIMIT 10",
          ["%" + lowerCaseSearchTerm + "%", last_seen_id]
        );

        if (moreResults.rowCount > 0) {
          res.json(moreResults.rows);
        } else {
          return next(createError.NotFound("No More Match Found"));
        }
      } else {
        const searchResult = await db.query(
          "SELECT username,user_id,id FROM users WHERE username LIKE $1 ORDER BY id LIMIT 10",
          ["%" + lowerCaseSearchTerm + "%"]
        );

        if (searchResult.rowCount > 0) {
          res.json(searchResult.rows);
        } else {
          return next(createError.NotFound("No Match Found"));
        }
      }
    } catch (error) {
      return next(createError.InternalServerError(error.message));
    }
  },
};
