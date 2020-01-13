const express = require("express"),
  app = express();
const userRouter = require("./routes/user");
const checkRouter = require("./routes/check");

//load server
require("./db/mongoose");

//setup express port

const port = process.env.PORT || 3000;
app.use(express.json());

//crud routers
app.use(userRouter);
app.use(checkRouter);

app.listen(port, () => {
  console.log("server running on port: " + port);
});
