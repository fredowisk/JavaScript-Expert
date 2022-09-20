import database from "./../database.json" assert { type: "json" };
import Person from "./person.js";
import TerminalController from "./terminalController.js";
import Repository from "./repository.js";

export default class App {
  static DEFAULT_LANG = "pt-BR";
  static STOP_TERM = ":q";
  static terminalController = new TerminalController();

  static async init() {
    this.terminalController.initializeTerminal(database, this.DEFAULT_LANG);

    await this.mainLoop();
  }

  static async mainLoop() {
    try {
      const answer = await this.terminalController.question("What?");

      if (answer === this.STOP_TERM) {
        this.terminalController.closeTerminal();
        console.log("process finished!");
        return;
      }

      const person = Person.generateInstanceFromString(answer);
      this.terminalController.updateTable(person.formatted(this.DEFAULT_LANG));
      await Repository.save(person);

      return { status: "Success" };

      // return this.mainLoop();
    } catch (error) {
      console.log("DEU RUIM**", error);
      return { status: "Failed" };
      // return this.mainLoop();
    }
  }
}

App.init();
