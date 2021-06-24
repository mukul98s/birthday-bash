const createError = require("http-errors");
const bcrypt = require("bcrypt");
const db = require("../db/index");
const { userLoginSchema } = require("../helper/validation");
const { signAccessToken } = require("../helper/jwt_helper");

module.exports = {
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
        throw createError.Unauthorized("Invalid Email & Password!");
      }

      const accessToken = await signAccessToken(user_id);

      res.send({ accessToken });
    } catch (err) {
      if (err.isJoi === true) {
        return next(createError.BadRequest("Invalid Email & Password"));
      }
      next(err);
    }
  },
};
