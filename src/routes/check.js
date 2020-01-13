const express = require("express");
const router = new express.Router();
const Check = require("../models/check");
const auth = require("../middleware/auth");

//create a check
router.post("/checks", auth, async (req, res) => {
  const check = new Check({
    ...req.body,
    owner: req.user._id
  });
  try {
    await check.save();
    res.status(201).send({ check });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
