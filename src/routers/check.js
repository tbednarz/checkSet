const express = require("express");
const Check = require("../models/check");
const router = new express.Router();

const chalk = require("chalk");
const fs = require("fs");

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
const saveChecks = (check) => {
  const dataJSON = JSON.stringify(check);
  fs.writeFileSync("checks.json", dataJSON);
};

const sortChecks = () => {
  const checks = loadChecks();
  let newChecks = checks.sort(function (a, b) {
    return a.number - b.number;
  });
  saveChecks(newChecks);
  console.log(chalk.yellow("Sorted Checks"));
};

/**
 * loadChecks reads checks.json
 * then converts to string
 * parse converts to objects
 */
const loadChecks = () => {
  try {
    const buffer = fs.readFileSync("checks.json");
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};
const getTaken = () => {
  let checks = loadChecks();
  checks.forEach((check) => {
    console.log("Taken checks: " + check.number);
  });
};

/**
 * loads checks
 * uses figlet to log operation performed
 * for each check log the number and amount
 */
const listChecks = () => {
  const checks = loadChecks();
  console.log(chalk.green("Fetched Checks: "));
  checks.forEach((check) => {
    console.log(
      chalk.greenBright(
        chalk.yellow("Number: ") +
          check.number +
          "\n" +
          chalk.yellow("Amount: ") +
          check.amount +
          "\n" +
          chalk.green("Date: ") +
          check.date
      )
    );
    console.log(chalk.redBright("--------------------"));
  });
};

/**
 * removeCheck loads checks in and filters for checks
 * that arent equal to number parameter
 * matchingCheck = checks - check that matches
 * save matchingCheck and log which numbers check was removed
 */
const removeCheck = (number) => {
  const checks = loadChecks();
  const matchingCheck = checks.filter((check) => check.number != number);

  if (matchingCheck.length < checks.length) {
    saveChecks(matchingCheck);
    console.log(
      chalk.yellow.italic.bold(
        "check from number " + number + chalk.yellow.italic.bold(" removed.")
      )
    );
  } else {
    console.log(chalk.red.bold("no check removed"));
  }
};
const removeAllChecks = () => {
  if (loadChecks().length === 0) {
    console.log(chalk.red.bold("Checks are empty"));
  }
  let newChecks = [];
  saveChecks(newChecks);
};

module.exports = router;
