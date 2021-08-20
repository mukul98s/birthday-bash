const Joi = require('joi');

const userSignUpSchema = Joi.object()
  .keys({
    email: Joi.string().email().trim().lowercase().min(5).max(50).required(),
    username: Joi.string()
      .trim()
      .lowercase()
      .min(2)
      .regex(/^[A-Za-z_ ]+$/)
      .rule({ message: 'Username Can Only Contain Alphabets' })
      .max(30)
      .required(),
    password: Joi.string().min(8).required(),
    gender: Joi.string()
      .max(10)
      .trim()
      .lowercase()
      .valid('male', 'female', 'hidden', 'other')
      .required(),
    dob: Joi.date().required(),
    bio: Joi.string().max(100).optional(),
  })
  .options({ abortEarly: false });

const userLoginSchema = Joi.object()
  .keys({
    email: Joi.string().email().trim().lowercase().min(5).max(50).required(),
    password: Joi.string().min(8).required(),
  })
  .options({ abortEarly: false });

const userEditSchema = Joi.object()
  .keys({
    newUsername: Joi.string()
      .trim()
      .lowercase()
      .min(2)
      .regex(/^[A-Za-z_ ]+$/)
      .rule({ message: 'Username Can Only Contain Alphabets' })
      .max(50)
      .optional(),
    currentPassword: Joi.string().min(8).optional(),
    newPassword: Joi.string().min(8).optional(),
    newBio: Joi.string().max(100).optional(),
  })
  .options({ abortEarly: false });

const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().trim().lowercase().min(5).max(50).required(),
});

const resetPasswordSchema = Joi.object().keys({
  password: Joi.string().min(8).required(),
});

module.exports = {
  userLoginSchema,
  userSignUpSchema,
  userEditSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
