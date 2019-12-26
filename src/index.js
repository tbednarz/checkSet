const express = require("express"),
  app = express();
const userRouter = require("./routes/user");

//load server
require("./db/mongoose");

//setup express port

const port = process.env.PORT || 3000;
app.use(express.json());

//crud routers
app.use(userRouter);

app.listen(port, () => {
  console.log("server running on port: " + port);
});
