const express = require("express");
const createError = require("http-errors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const login = require("./Routes/Auth_Routes/login");
const signup = require("./Routes/Auth_Routes/signup");
const userProfile = require("./Routes/Uesr_Routes/user_profile");

app.get("/auth", (req, res) => {
  res.send("Auth route");
});

app.use("/api/v1/login", login);

app.use("/api/v1/signup", signup);

app.use("/api/v1/userProfile", userProfile);

app.use(async (req, res, next) => {
  const Error = createError.NotFound();
  next(Error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(4000, () => console.log("Server running "));
