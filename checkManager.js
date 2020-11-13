const chalk = require("chalk");
const fs = require("fs");
const uuid = require("uuid");

/**
 * Loads check and looks for duplicates
 * if no duplicate new check is pushed and saved to checks.json
 * add date of creation
 * sort checks
 */

const addCheck = (amount) => {
  const checks = loadChecks();
  const duplicateCheck = checks.find((check) => check.date === Date.now());
  if (!duplicateCheck) {
    checks.push({
      amount: "$" + amount,
      date: Date(Date.now()),
      id: uuid.v4(),
    });
    saveChecks(checks);
    sortChecks(checks);
    console.log(chalk.whiteBright("check added"));
  } else {
    console.log(chalk.red.inverse("Check date taken"));
  }
};
/**
 * saveChecks stringifies check paramenter,
 * writefilesync writes dataJSON to checks.json
 * if checks.json doesnt exist it will be made
 */
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

/**
 * lists checks
 */
const listChecks = () => {
  const checks = loadChecks();
  console.log(chalk.green("Fetched Checks: "));
  checks.forEach((check) => {
    console.log(
      chalk.greenBright(
        chalk.yellow("Amount: ") +
          check.amount +
          "\n" +
          chalk.green("Date: ") +
          check.date +
          "\n" +
          "id: " +
          check.id
      )
    );
    console.log(chalk.redBright("--------------------"));
  });
};

/**
 * removeCheck loads checks in and filters for checks
 * that arent equal to ID parameter
 * matchingCheck = checks - check that matches
 * save matchingCheck and log which numbers check was removed
 */
const removeCheck = (id) => {
  const checks = loadChecks();
  const matchingCheck = checks.filter((check) => check.id != id);

  if (matchingCheck.length < checks.length) {
    saveChecks(matchingCheck);
    console.log(
      chalk.yellow.italic.bold(
        "check with ID " + id + chalk.yellow.italic.bold(" removed.")
      )
    );
  } else {
    console.log(chalk.red.bold("no check removed"));
  }
};
/**
 * if for some reason you want to delete everthing
 */
const removeAllChecks = () => {
  if (loadChecks().length === 0) {
    console.log(chalk.red.bold("Checks are empty"));
  }
  let newChecks = [];
  saveChecks(newChecks);
};

module.exports = {
  addCheck,
  saveChecks,
  loadChecks,
  listChecks,
  removeCheck,
  removeAllChecks,
  sortChecks,
};
