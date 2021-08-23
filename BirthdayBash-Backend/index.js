const express = require('express');
const createError = require('http-errors');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'http://localhost:3000'],
    },
  })
);
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let whitelist = ['http://localhost:3000', 'http://localhost:4000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      //|| !origin
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT'],
  //Accept application/json? Content-Type:application/json?
  allowedHeaders: ['Content-Type', 'Accept', 'origin'],
  maxAge: 3600,
};

app.use(cors(corsOptions));

const login = require('./Routes/Auth_Routes/login');
const logout = require('./Routes/Auth_Routes/logout');
const signup = require('./Routes/Auth_Routes/signup');
const userProfile = require('./Routes/User_Routes/user_profile');
// const forgotPassword = require("./Routes/Auth_Routes/forgot_password");
// const resetPassword = require("./Routes/Auth_Routes/reset_password");
const { authVerification } = require('./helper/jwt_helper');

app.use('/api/v1/login', login);

app.use('/api/v1/logout', logout);

app.use('/api/v1/signup', signup);

// app.use("/api/v1/forgotPassword", forgotPassword);

// app.use("/api/v1/resetPassword", resetPassword);

app.use('/api/v1/user-profile', authVerification, userProfile);

app.use(async (req, res, next) => {
  const Error = createError.NotFound();
  next(Error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(4000, () => console.log('Server running '));

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:4000"],
//     credentials: true,
//   })
// );

// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "http://localhost:3000"],
//     },
//   })
// );
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());

// app.get("/", (req, res) => {
//   res
//     .status(202)
//     .cookie("name", "nasdasd", {
//       sameSite: "strict",
//        secure: true,
//       httpOnly: true,
//       maxAge: 10000,
//     })
//     .send("set ");
//   console.log(req.cookies.name);
// });
