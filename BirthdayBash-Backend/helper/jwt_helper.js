const jwt = require("jsonwebtoken");
const createError = require("http-errors");
module.exports = {
  signAccessToken: (user_id) => {
    return new Promise((reslove, reject) => {
      const payload = { user_id: user_id };
      const options = {
        expiresIn: "6h",
        issuer: "BirthdayBash",
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
        }
        reslove(token);
      });
    });
  },
  // middleware
  verifyAccessToken: async (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;

    if (!authorizationHeaader) {
      return next(createError.Unauthorized());
    }
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>

    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (payload) {
        req.payload = payload;
      } else if (err.name === "JsonWebTokenError") {
        return next(createError.Unauthorized());
      } else {
        return next(createError.Unauthorized(err.message));
      }
      next();
    });
  },
};
