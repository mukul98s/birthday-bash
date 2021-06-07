const createError = require("http-errors");
const bcrypt = require("bcrypt");
const db = require("../db/index");
const { userSignUpSchema } = require("../helper/validation");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const result = await userSignUpSchema.validateAsync(req.body);
      const { email, username, password, gender, dob, bio } = result;
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query(
        "INSERT INTO users(email, username, password, gender, dob, bio) VALUES($1, $2, $3, $4, $5, $6)",
        [email, username, hashedPassword, gender, dob, bio]
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
