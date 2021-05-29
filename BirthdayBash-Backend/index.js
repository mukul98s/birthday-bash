const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.send("Hello World 😉,Yes Its Working");
});

app.listen(4000, () => console.log("Server Running On Port 4000 🚀"));
