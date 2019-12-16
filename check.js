const chalk = require("chalk");
const fs = require("fs");
const figlet = require("figlet");

/**
 * Loads check and looks for duplicates
 * if no duplicate new check is pushed and saved to checks.json
 */
const addCheck = (amount, week) => {
  const checks = loadChecks();
  const duplicateCheck = checks.find(check => check.week === week);
  if (!duplicateCheck) {
    checks.push({
      amount: amount,
      week: week
    });
    saveChecks(checks);
    console.log(chalk.whiteBright("check added"));
  } else {
    console.log(chalk.red.inverse("Check date taken"));
  }
};
/**
 * loads checks and looks for check with matching week
 * if matching check log week and amount values
 * else log error
 */
const readCheck = week => {
  const checks = loadChecks();
  const matchingCheck = checks.find(check => check.week === week);
  if (matchingCheck) {
    console.log(
      chalk.greenBright(
        chalk.yellow("Week: ") +
          matchingCheck.week +
          "\n" +
          chalk.yellow("Amount: ") +
          matchingCheck.amount
      )
    );
  } else {
    console.log(chalk.red("no check found"));
  }
};
/**
 * saveChecks stringifies check paramenter,
 * writefilesync writes dataJSON to checks.json
 * if checks.json doesnt exist it will be made
 */
const saveChecks = check => {
  const dataJSON = JSON.stringify(check);
  fs.writeFileSync("checks.json", dataJSON);
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
 * loads checks
 * uses figlet to log operation performed
 * for each check log the week and amount
 */
const listChecks = () => {
  const checks = loadChecks();
  figlet("Listing Checks", function(err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(chalk.greenBright(data));

    checks.forEach(check => {
      console.log(
        chalk.greenBright(
          chalk.yellow("Week: ") +
            check.week +
            "\n" +
            chalk.yellow("Amount: ") +
            check.amount
        )
      );
      console.log(chalk.redBright("--------------------"));
    });
  });
};
/**
 * removeCheck loads checks in and filters for checks
 * that arent equal to week parameter
 * matchingCheck = checks - check that matches
 * save matchingCheck and log which weeks check was removed
 */
const removeCheck = week => {
  const checks = loadChecks();
  const matchingCheck = checks.filter(check => check.week != week);

  if (matchingCheck.length < checks.length) {
    saveChecks(matchingCheck);
    console.log(
      chalk.yellow.italic.bold(
        "check from week " + week + chalk.yellow.italic.bold(" removed.")
      )
    );
  } else {
    console.log(chalk.red.bold("no check removed"));
  }
};

module.exports = {
  addCheck,
  saveChecks,
  loadChecks,
  listChecks,
  readCheck,
  removeCheck
};
