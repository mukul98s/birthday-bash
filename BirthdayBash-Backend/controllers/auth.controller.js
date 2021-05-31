const createError = require("http-errors");
const bcrypt = require("bcrypt");
const db = require("../db/index");
const { userLoginSchema, userSignUpSchema } = require("../helper/validation");
const { signAccessToken } = require("../helper/jwt_helper");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const result = await userSignUpSchema.validateAsync(req.body);
      const { email, username, password, dob, bio } = result;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.query(
        "INSERT INTO users(email, username, password, dob, bio) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [email, username, hashedPassword, dob, bio]
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
  login: async (req, res, next) => {
    try {
      const result = await userLoginSchema.validateAsync(req.body);
      const { email, password } = result;

      const userCheck = await db.query(
        "SELECT user_id,password FROM users WHERE email =$1",
        [email]
      );

      if (userCheck.rowCount == 0) {
        throw createError.NotFound("Email Not Registered !");
      }

      const { user_id, password: hashedPassword } = userCheck.rows[0];

      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (!isMatch) {
        throw createError.Unauthorized("Invalid Email/Password!");
      }

      const accessToken = await signAccessToken(user_id);

      res.send({ accessToken });
    } catch (err) {
      if (err.isJoi === true)
        return next(createError.BadRequest("Invalid Username & Password"));
      next(err);
    }
  },
};
