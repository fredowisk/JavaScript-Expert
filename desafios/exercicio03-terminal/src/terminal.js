import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import chalk from "chalk";
import readline from "readline";
import terminalConfig from "./config/terminal.js";

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.terminal = {};
    this.data = [];
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  initializeTable() {
    const table = chalkTable(TABLE_OPTIONS, this.data);

    this.print = console.draft(table);
  }

  updateTable(item) {
    this.data.push(item);
  }

  question() {
    const msg =
      "Qual seu cargo e pretensão salarial em BRL? (position; expectation)";
    return new Promise((resolve) =>
      this.terminal.question(`${msg}\n Insira: `, resolve)
    );
  }

  success(msg) {
    console.log(chalk.green(`\n${msg}`));
  }

  error(msg) {
    console.log(chalk.red(`\n${msg}`));
  }

  close() {
    this.terminal.close();
  }
}

export default CustomTerminal;
