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
      const paramToUpdate = [];
      const argsArr = [];
      const funcReturnArr = [];
      argsArr.push(user_id);
      if (newUsername) {
        paramToUpdate.push("username");
        argsArr.push(newUsername);
        funcReturnArr.push("username");
      }

      if (newPassword) {
        paramToUpdate.push("password");
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        argsArr.push(hashedPassword);
      }

      if (newBio) {
        paramToUpdate.push("bio");
        argsArr.push(newBio);
        funcReturnArr.push("bio");
      }

      if (newDob) {
        paramToUpdate.push("dob");
        argsArr.push(newDob);
        funcReturnArr.push("dob");
      }

      let mainQuery = `UPDATE users SET ${paramToUpdate.map(
        (col, i) => `${col} = $${2 + i}`
      )} WHERE user_id = $1`;

      let returnQuery = `RETURNING ${funcReturnArr.join(", ")} `;

      let finalQuery;

      if (newUsername || newBio || newDob) {
        finalQuery = mainQuery + " " + returnQuery;
      } else {
        finalQuery = mainQuery;
      }

      const queryResult = await db.query(finalQuery, argsArr);

      res.json(queryResult.rows[0]);
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
