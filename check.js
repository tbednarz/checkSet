const chalk = require("chalk");
const fs = require("fs");

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

const saveChecks = check => {
  const dataJSON = JSON.stringify(check);
  fs.writeFileSync("checks.json", dataJSON);
};

const loadChecks = () => {
  try {
    const buffer = fs.readFileSync("checks.json");
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const listChecks = () => {
  const checks = loadChecks();
  console.log(chalk.yellowBright("Your Checks: "));

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
};

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
