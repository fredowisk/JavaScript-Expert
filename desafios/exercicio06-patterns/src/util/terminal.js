import readline from "readline";
import { stdin as input, stdout as output } from "process";

export default class Terminal {
  constructor() {
    this.terminal = {};
  }

  initialize() {
    this.terminal = readline.createInterface({ input, output });
  }

  async question(msg) {
    return new Promise((resolve) => this.terminal.question(`${msg}`, resolve));
  }

  print(msg) {
    console.log(msg);
  }

  printTable(msg) {
    console.table(msg)
  }

  error(msg) {
    console.error(msg);
  }

  close() {
    this.terminal.close();
  }
}
