// 30 to 35 percent for housing
// 10 to 20 percent for food
// 10 to 20 percent for transportation
// 5 to 10 percent for savings
// 5 to 10 percent for debt repayment
// The remainder for discretionary spending

const yargs = require("yargs");

//checkUtilites is all the crud functions
const checkUtilities = require("./checks/check");

/**
 * define exposed commands
 * builder is to set up parameters
 */
yargs.command({
  command: "a",
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
    },
    date: {
      describe: "Time check was created",

      type: "string"
    }
  },
  /*
    handler takes in the arguments and performs operations
  */
  handler(argv) {
    checkUtilities.addCheck(argv.amount, argv.week);
  }
});

yargs.command({
  command: "r",
  describe: "Read a check",
  builder: {
    week: {
      describe: "week of check",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    checkUtilities.readCheck(argv.week);
  }
});

yargs.command({
  command: "l",
  describe: "Lists checks",
  handler() {
    checkUtilities.listChecks();
  }
});

// yargs.command({
//   command: "d",
//   describe: "Breaks check down to 50-30-20 rule",
//   builder: {
//     week: {
//       describe: "week of check",
//       demandOption: true,
//       type: "string"
//     }
//   },
//   handler(argv) {
//     checkUtilities.divideCheck(argv.amount);
//   }
// });

yargs.command({
  command: "rm",
  describe: "Remove a check",
  builder: {
    week: {
      describe: "Week of check",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    checkUtilities.removeCheck(argv.week);
  }
});
yargs.command({
  command: "rmall",
  describe: "remove all checks",
  handler() {
    checkUtilities.removeAllChecks();
  }
});

yargs.command({
  command: "sort",
  describe: "sorts checks by week",
  handler() {
    checkUtilities.sortChecks();
  }
});

yargs.parse();
