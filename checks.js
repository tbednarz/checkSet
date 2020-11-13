const readline = require("readline");
const chalk = require("chalk");
const checkManager = require("./checkManager");

console.log(
  chalk.cyan.bold("Choose a command: ") +
    "\n" +
    chalk.underline.bold(
      "'a' to add a check\n" +
        "\n" +
        "'l' to list checks \n" +
        "\n" +
        "'rm' to remove a check \n" +
        "\n" +
        "'rmall' to remove all checks \n" +
        "\n" +
        "'sort' to sort checks \n" +
        "\n" +
        "'help' to see commands"
    )
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});
rl.prompt();
rl.on("line", (answer) => {
  // TODO: switch case for command
  switch (answer) {
    // add a check
    case "a":
      rl.question(
        chalk.underline.green("What is your check amount? "),
        (amount) => {
          if (amount < 0) {
            console.log("number must be positive");
          } else {
            checkManager.addCheck(amount);
          }
        }
      );
      break;
    // remove a check
    case "rm":
      checkManager.listChecks();
      rl.question("Here are your checks, copy the ID to remove: ", (answer) => {
        checkManager.removeCheck(answer);
      });
      break;
    // list checks
    case "l":
      checkManager.listChecks();
      break;
    // remove all checks
    case "rmall":
      checkManager.removeAllChecks();

      break;
    // sort checks
    case "sort":
      checkManager.sortChecks();
      break;
    case "help":
      console.log(
        chalk.cyan.bold("Choose a command: ") +
          "\n" +
          chalk.underline.bold(
            "'a' to add a check\n" +
              "\n" +
              "'l' to list checks \n" +
              "\n" +
              "'rm' to remove a check \n" +
              "\n" +
              "'rmall' to remove all checks \n" +
              "\n" +
              "'sort' to sort checks \n"
          )
      );
      break;
  }
  rl.prompt();
}).on("close", () => {
  console.log("Money Money Money");
  process.exit(0);
});
