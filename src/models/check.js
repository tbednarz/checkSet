const mongoose = require("mongoose");
const validator = require("validator");

const Check = new mongoose.model("Check", {
  week: {
    type: Number,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
    validator(value) {
      if (!validator.isInt(value)) {
        throw new Error("Amount must be a number greater than zero");
      }
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = Check;
