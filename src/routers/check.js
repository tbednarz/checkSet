const express = require("express");
const Check = require("../models/check");
const router = new express.Router();

// const chalk = require("chalk");
// const fs = require("fs");

/**
CREATE NEW CHECK
 */
router.post("/checks", async (req, res) => {
  const check = new Check({ ...req.body });
  try {
    await check.save();
    res.status(201).send(check);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//GET ALL CHECKS

router.get("/checks", async (req, res) => {
  try {
    const checks = await Check.find();
    res.send(checks);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

//GET CHECK BY ID

router.get("/checks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const check = await Check.findOne({
      _id,
    });
    if (!check) {
      return res.status(400).send();
    }
    res.send(check);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/checks/:id", async (req, res) => {
  try {
    const check = await Check.findOneAndDelete({
      _id: req.params.id,
    });
    if (!check) {
      res.status(404).send();
    }
    res.send(check);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
