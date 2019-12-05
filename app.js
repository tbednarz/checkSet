// 30 to 35 percent for housing
// 10 to 20 percent for food
// 10 to 20 percent for transportation
// 5 to 10 percent for savings
// 5 to 10 percent for debt repayment
// The remainder for discretionary spending

const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const checkUtilities = require("./check.js");

yargs.command({
  command: "add-check",
  describe: "Adds check to be broken down",
  builder: {
    amount: {
      describe: "Check amount",
      demandOption: true,
      type: "string"
    },
    week: {
      describe: "Week of check",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    checkUtilities.addCheck(argv.amount, argv.week);
  }
});

yargs.command({
  command: "list",
  describe: "Lists checks",
  handler() {
    checkUtilities.listChecks();
  }
});

yargs.command({
  command: "divide",
  describe: "Breaks check down to 50-30-20 rule",
  handler(argv) {
    checkUtilities.divideCheck(argv.amount);
  }
});

yargs.parse();
