const express = require("express");
const checkRouter = require("./routers/check");
// const userRouter = require("./routers/user");

require("./db/mongo");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(checkRouter);
// app.use(userRouter);

app.listen(port, () => {
  console.log("server running on port: " + port);
});
