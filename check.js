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
    console.log("check added");
  } else {
    console.log(chalk.red.inverse("Check date taken"));
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
    console.log(chalk.greenBright("Week: " + check.week + "\n" + check.amount));
    console.log(chalk.redBright("--------------------"));
  });
};

const divideCheck = check => {
  console.log("dividing check");
};

module.exports = {
  addCheck: addCheck,
  saveChecks: saveChecks,
  loadChecks: loadChecks,
  listChecks: listChecks,
  divideCheck: divideCheck
};
