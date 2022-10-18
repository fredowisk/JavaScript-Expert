import chalk from "chalk";

export default {
  table: {
    leftPad: 2,
    columns: [
      { field: "position", name: chalk.green("Position") },
      { field: "expectation", name: chalk.blue("Expectation (BRL)") },
      { field: "conversion01", name: chalk.yellow("USD") },
      { field: "conversion02", name: chalk.magenta("EUR") },
      { field: "conversion03", name: chalk.red("RUB") },
    ],
  },
};
