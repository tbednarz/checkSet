const chalk = require("chalk");
const fs = require("fs");

/**
 * Loads check and looks for duplicates
 * if no duplicate new check is pushed and saved to checks.json
 * add date of creation
 * sort checks
 */
const addCheck = (amount, week) => {
  const checks = loadChecks();
  const duplicateCheck = checks.find(check => check.week === week);
  if (!duplicateCheck) {
    checks.push({
      amount: "$" + amount,
      week: week,
      date: Date(Date.now())
    });
    saveChecks(checks);
    sortChecks(checks);
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
          chalk.yellow("Amount: $") +
          matchingCheck.amount +
          chalk.yellow("Date: ") +
          matchingCheck.date
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

const sortChecks = () => {
  const checks = loadChecks();
  let newChecks = checks.sort(function(a, b) {
    return a.week - b.week;
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
 * loads checks
 * uses figlet to log operation performed
 * for each check log the week and amount
 */
const listChecks = () => {
  const checks = loadChecks();
  console.log(chalk.green("Fetched Checks: "));
  checks.forEach(check => {
    console.log(
      chalk.greenBright(
        chalk.yellow("Week: ") +
          check.week +
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
  readCheck,
  removeCheck,
  removeAllChecks,
  sortChecks
};
