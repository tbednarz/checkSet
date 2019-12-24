//CONNECTS MONGOOSE TO MONGODB DATABASE
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/checkSet", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
