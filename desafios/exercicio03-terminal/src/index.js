import CustomTerminal from "./terminal.js";
import IncomeService from "./service/IncomeService.js";

const VOCABULARY = {
  STOP: ":q",
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  console.info("\n🚀 Running...\n");
  try {
    terminal.initializeTable();

    const answer = await terminal.question();

    if (answer === VOCABULARY.STOP) {
      terminal.close();
      console.log("finishing terminal instance!");
      process.exit(1);
    }

    const income = await service.generateIncomeFromString(answer);

    terminal.updateTable(income.format());
    terminal.success("Register successfully inserted!");
  } catch (error) {
    terminal.error(error.message);
  } finally {
    return mainLoop();
  }
}

await mainLoop();
