import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readLine from "readline";
import asciichart from "asciichart";

import terminalConfig from "../config/terminal.js";

const TABLE_OPTIONS = terminalConfig.table;

const kPrint = Symbol("kPrint");
const kData = Symbol("kData");
const kTerminal = Symbol("kTerminal");

export default class CustomTerminal {
  constructor() {
    this[kPrint] = {};
    this[kData] = new Map();
    this[kTerminal] = {};
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);
    this[kTerminal] = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  initializeTable() {
    const table = chalkTable(TABLE_OPTIONS, this[kData]);

    this[kPrint] = console.draft(table);
  }

  hasDataToPrint() {
    return this[kData].size;
  }

  addDataToPrint(data) {
    if (!data) {
      this.info("No more cryptos to list!\n");
      return;
    }

    data.forEach((crypto) => {
      this[kData].set(crypto.id, crypto);
    });
  }

  getDataById(id) {
    return this[kData].get(id);
  }

  removeDataById(id) {
    return this[kData].delete(id);
  }

  plotQuoteChart(data) {
    if (!data) return;
    const s0 = [
      ...Array.from({ length: 30 }, () => data.percent_change_90d),
      ...Array.from({ length: 30 }, () => data.percent_change_60d),
      ...Array.from({ length: 30 }, () => data.percent_change_30d),
      ...Array.from({ length: 7 }, () => data.percent_change_7d),
      data.percent_change_24h,
    ];
    console.log(asciichart.plot(s0));
  }

  async question() {
    const msg = "\n Insert the chosen command bellow: \n";
    return new Promise((resolve) => {
      this[kTerminal].question(`${msg}`, resolve);
    });
  }

  info(msg) {
    console.log(`\n${chalk.cyan(msg)}`);
  }

  success(msg) {
    console.log(`\n${chalk.green(msg)}`);
  }

  error(msg) {
    console.log(`\n${chalk.red(msg)}`);
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  close() {
    this[kTerminal].close();
  }
}
