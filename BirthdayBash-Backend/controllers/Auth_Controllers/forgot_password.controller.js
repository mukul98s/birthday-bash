const createError = require('http-errors');
const db = require('../../db/index');
const JWT = require('jsonwebtoken');
const { sendMail } = require('../../helper/send_mail');
const { forgotPasswordSchema } = require('../../helper/validation');

module.exports = {
  forgotPassword: async (req, res, next) => {
    try {
      const result = await forgotPasswordSchema.validateAsync(req.body);
      const { email } = result;
      console.log(email);
      const userCheck = await db.query(
        'SELECT username,user_id,password FROM users WHERE email = $1',
        [email]
      );

      if (userCheck.rowCount == 0) {
        throw createError.Conflict('Email is not registered!');
      }
      const user_id = userCheck.rows[0].user_id;
      const username = userCheck.rows[0].username;

      const secret =
        process.env.FORGOT_PASSWORD_SECRET + userCheck.rows[0].password;

      const token = JWT.sign({}, secret, {
        expiresIn: '24h',
      });

      const link = `http://localhost:5000/api/v1/resetPassword/${user_id}/${token}`;

      const mailOptions = {
        from: 'BirthdayBash <emailhere>',
        to: `${username} <${email}>`,
        subject: 'Forgot your password?',
        text: `Forgot your password?It happens to the best of us.\n
        To reset the password, click the link below.The link will self-destruct after 24 hours.\n
        ${link}\n
        If you do not want to change your password or didn't request a reset,you can ignore and delete this email.\n
        (If you think your email is hacked change your email password immediately at your email provder service ex gamil)
        `,
        html: '',
      };

      const resu = await sendMail(mailOptions);
      res.json('Email Sent Successfully');
      console.log(resu);
    } catch (error) {
      if (error.isJoi === true) {
        return next(createError.BadRequest('Invalid Email!'));
      }
      return next(error);
    }
  },
};
