const express = require("express");
const userRouter = require("./models/user");

//load server
require("./db/mongoose");

//setup express port
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//crud routers
app.use(userRouter);

app.listen(port, () => {
  console.log("server running on port: " + port);
});
