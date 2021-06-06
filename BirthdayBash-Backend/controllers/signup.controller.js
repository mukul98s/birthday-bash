const createError = require("http-errors");
const bcrypt = require("bcrypt");
const db = require("../db/index");
const { userSignUpSchema } = require("../helper/validation");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const result = await userSignUpSchema.validateAsync(req.body);
      const { email, username, password, dob, bio } = result;
      const lowerCaseEmail = email.toLowerCase().trim();
      const lowerCaseUsername = username.toLowerCase().trim();
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query(
        "INSERT INTO users(email, username, password, dob, bio) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [lowerCaseEmail, lowerCaseUsername, hashedPassword, dob, bio]
      );

      res.status(200).json({ message: "User Successfully Created" });
    } catch (error) {
      if (error.isJoi == true) {
        const details = error.details;
        const errors = details.map((i) => i.message).join(",");

        return next(createError.NotAcceptable(errors));
      }

      if (error.severity === "ERROR" && error.code === "23505") {
        return next(createError.Conflict("Email already exists!"));
      }
      next(error);
    }
  },
};
