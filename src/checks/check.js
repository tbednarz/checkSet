const chalk = require("chalk");
const fs = require("fs");
const readline = require("readline");
// const { check } = require("yargs");

console.log("Choose a command: ");
console.log(
  "'a' to add a check\n" +
    "'l' to list checks \n" +
    "'rm' to remove a check \n" +
    "'rmall' to remove all checks \n" +
    "'sort' to sort checks \n"
);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("checkset > ", (answer) => {
  // TODO: switch case for command
  switch (answer) {
    //add a check
    case "a":
      rl.question("What is your check amount? ", (amount) => {
        if (amount < 0) {
          console.log("number must be positive");
        } else {
          rl.question(
            "What would you like to number your check? ",
            (number) => {
              addCheck(amount, number);
            }
          );
        }
      });
      break;
    //remove a check
    case "rm":
      listChecks();
      rl.question(
        "Here are your checks, choose which number to remove? ",
        (answer) => {
          removeCheck(answer);
        }
      );
      break;
    //list checks
    case "l":
      listChecks();
      break;
    //remove all checks
    case "rmall":
      removeAllChecks();
      rl.close();
      break;
    //sort checks
    case "sort":
      sortChecks();
      break;
  }
});

/**
 * Loads check and looks for duplicates
 * if no duplicate new check is pushed and saved to checks.json
 * add date of creation
 * sort checks
 */

const addCheck = (amount, number) => {
  const checks = loadChecks();
  const duplicateCheck = checks.find((check) => check.number === number);
  if (!duplicateCheck) {
    checks.push({
      amount: "$" + amount,
      number: number,
      date: Date(Date.now()),
    });
    saveChecks(checks);
    sortChecks(checks);
    console.log(chalk.whiteBright("check added"));
  } else {
<<<<<<< HEAD
    console.log(chalk.red.inverse("Check date taken"));
  }
};
/**
 * loads checks and looks for check with matching number
 * if matching check log number and amount values
 * else log error
 */
const readCheck = (number) => {
  const checks = loadChecks();
  const matchingCheck = checks.find((check) => check.number === number);
  if (matchingCheck) {
    console.log(
      chalk.greenBright(
        chalk.yellow("number: ") +
          matchingCheck.number +
          "\n" +
          chalk.yellow("Amount: $") +
          matchingCheck.amount +
          chalk.yellow("Date: ") +
          matchingCheck.date
      )
    );
  } else {
    console.log(chalk.red("no check found"));
=======
    console.log(chalk.red.inverse("Something Went wrong"));
>>>>>>> readline
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
const getTaken = () => {
  let checks = loadChecks();
  checks.forEach((check) => {
    console.log("Taken checks: " + check.number);
  });
};
getTaken();

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

module.exports = {
  addCheck,
  saveChecks,
  loadChecks,
  listChecks,
  removeCheck,
  removeAllChecks,
  sortChecks,
};
// readCheck,

/**
 * loads checks and looks for check with matching number
 * if matching check log number and amount values
 * else log error
 */
// const readCheck = (number) => {
//   const checks = loadChecks();
//   const matchingCheck = checks.find((check) => check.number === number);
//   if (matchingCheck) {
//     console.log(
//       chalk.greenBright(
//         chalk.yellow("number: ") +
//           matchingCheck.number +
//           "\n" +
//           chalk.yellow("Amount: $") +
//           matchingCheck.amount +
//           chalk.yellow("Date: ") +
//           matchingCheck.date
//       )
//     );
//   } else {
//     console.log(chalk.red("no check found"));
//   }
// };
