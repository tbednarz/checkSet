const mongoose = require("mongoose");

const Check = mongoose.model("Check", {
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    default: false,
  },
  //   owner: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       r
  //   }
});

module.exports = Check;
