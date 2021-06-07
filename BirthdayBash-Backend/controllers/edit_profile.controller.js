const createError = require("http-errors");
const db = require("../db/index");
const bcrypt = require("bcrypt");
const { userEditSchema } = require("../helper/validation");

module.exports = {
  editProfile: async (req, res, next) => {
    try {
      const result = await userEditSchema.validateAsync(req.body);

      const { newUsername, newBio, newDob, newPassword } = result;

      const { user_id } = req.payload;
      const updatedResult = {};

      if (newUsername) {
        const Result = await db.query(
          "UPDATE users SET username=$1 WHERE user_id = $2 RETURNING username",
          [newUsername, user_id]
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
