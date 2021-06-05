const createError = require("http-errors");
const db = require("../db/index");
const bcrypt = require("bcrypt");
const { userEditSchema } = require("../helper/validation");

module.exports = {
  showUserProfile: async (req, res, next) => {
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
  },

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
  editProfile: async (req, res, next) => {
    try {
      const result = await userEditSchema.validateAsync(req.body);

      const { newUsername, newBio, newDob, newPassword } = result;

      const { user_id } = req.payload;
      const updatedResult = {};

      if (newUsername) {
        const Username = newUsername.toLowerCase().trim();
        const Result = await db.query(
          "UPDATE users SET username=$1 WHERE user_id = $2 RETURNING username",
          [Username, user_id]
        );
        updatedResult.username = Result.rows[0].username;
      }

      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE users SET password=$1 WHERE user_id = $2", [
          hashedPassword,
          user_id,
        ]);
      }

      if (newBio) {
        const Result = await db.query(
          "UPDATE users SET bio=$1 WHERE user_id = $2 RETURNING bio",
          [newBio, user_id]
        );
        updatedResult.bio = Result.rows[0].bio;
      }

      if (newDob) {
        const Result = await db.query(
          "UPDATE users SET dob=$1 WHERE user_id = $2 RETURNING dob",
          [newDob, user_id]
        );
        updatedResult.dob = Result.rows[0].dob;
      }

      res.json(updatedResult);
    } catch (error) {
      if (error.isJoi == true) {
        const details = error.details;
        const errors = details.map((i) => i.message).join(",");

        return next(createError.NotAcceptable(errors));
      }
      next(error);
    }
  },
};
