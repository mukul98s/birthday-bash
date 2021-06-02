const Joi = require("joi");

const userSignUpSchema = Joi.object()
  .keys({
    email: Joi.string().email().min(5).max(50).required(),
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(8).required(),
    dob: Joi.date().required(),
    bio: Joi.string().max(100).optional(),
  })
  .options({ abortEarly: false });

const userLoginSchema = Joi.object()
  .keys({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(8).required(),
  })
  .options({ abortEarly: false });

module.exports = {
  userLoginSchema,
  userSignUpSchema,
};
