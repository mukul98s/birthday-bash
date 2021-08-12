const createError = require("http-errors");
const db = require("../../db/index");
const bcrypt = require("bcrypt");
const { userEditSchema } = require("../../helper/validation");

module.exports = {
  editProfile: async (req, res, next) => {
    try {
      const result = await userEditSchema.validateAsync(req.body);

      const { newUsername, newBio, newPassword, currentPassword } = result;

      const { user_id } = req.payload;
      const paramToUpdate = [];
      const argsArr = [];

      argsArr.push(user_id);

      if (newUsername) {
        paramToUpdate.push("username");
        argsArr.push(newUsername);
      }

      if (newPassword && currentPassword) {
        const passwordCheck = await db.query(
          "SELECT password from users WHERE user_id =$1",
          [user_id]
        );
        const { password: hashedPassword } = passwordCheck.rows[0];

        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
        if (isMatch) {
          paramToUpdate.push("password");
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          argsArr.push(hashedPassword);
        } else {
          throw createError.BadRequest("current password doesn't match");
        }
      }

      if (newBio) {
        paramToUpdate.push("bio");
        argsArr.push(newBio);
      }

      const mainQuery = `UPDATE users SET ${paramToUpdate.map(
        (col, i) => `${col} = $${2 + i}`
      )} WHERE user_id = $1`;
      await db.query(mainQuery, argsArr);

      res.send("Updated Details Successfully");
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
