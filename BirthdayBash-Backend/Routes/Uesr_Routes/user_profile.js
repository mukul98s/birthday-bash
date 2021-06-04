const Route = require("express").Router();
const createError = require("http-errors");
const db = require("../../db/index");

Route.get("/showUserProfile", async (req, res, next) => {
  try {
    const { user_id } = req.payload;

    const currentUser = await db.query(
      "SELECT username,email,dob,bio FROM users WHERE user_id = $1",
      [user_id]
    );

    res.status(200).json(currentUser.rows[0]);
  } catch (error) {
    return next(createError.InternalServerError(error.message));
  }
});

Route.get("/searchUser", async (req, res, next) => {
  try {
    const { search_term, last_seen_id } = req.body;

    if (last_seen_id) {
      const moreResults = await db.query(
        "SELECT username,user_id,id FROM users WHERE username LIKE $1 AND id > $2 ORDER BY id LIMIT 10",
        ["%" + search_term + "%", last_seen_id]
      );
      if (moreResults.rowCount > 0) {
        res.json(moreResults.rows);
      } else {
        return next(createError.NotFound("No Match More Found"));
      }
    } else {
      const searchResult = await db.query(
        "SELECT username,user_id,id FROM users WHERE username LIKE $1 ORDER BY id LIMIT 10",
        ["%" + search_term + "%"]
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
});
module.exports = Route;
