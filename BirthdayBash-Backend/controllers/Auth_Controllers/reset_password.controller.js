const createError = require('http-errors');
const bcrypt = require('bcrypt');
const db = require('../../db/index');
const JWT = require('jsonwebtoken');
const { resetPasswordSchema } = require('../../helper/validation');

module.exports = {
  resetPassword: async (req, res, next) => {
    try {
      const result = resetPasswordSchema.validateAsync(req.body);
      const { user_id, token } = req.params;
      const { password } = result;

      const userCheck = await db.query(
        'SELECT password FROM users WHERE user_id = $1',
        [user_id]
      );

      if (userCheck.rowCount == 0) {
        throw createError.InternalServerError();
      }

      const secret =
        process.env.FORGOT_PASSWORD_SECRET + userCheck.rows[0].password;

      await JWT.verify(token, secret, (err, payload) => {
        if (err.name == 'JsonWebTokenError') {
          return next(createError.BadRequest());
        } else {
          return next(createError.InternalServerError(err.message));
        }
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query('UPDATE users SET password =$1', [hashedPassword]);

      res.status(200).json('Password Reset Successfull');
    } catch (error) {
      if (error.isJoi === true) {
        return next(createError.BadRequest('Invalid Password'));
      }
      return next(error);
    }
  },
};
