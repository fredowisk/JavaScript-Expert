import "dotenv/config";
import ioClient from "socket.io-client";
import CustomTerminal from "./util/customTerminal.js";

export default class ConsumerCLI {
  constructor() {
    this.socket = ioClient.connect(process.env.HOST_URL);
    this.terminal = new CustomTerminal();
    this.selectedCrypto = null;
  }

  initialize() {
    this.terminal.initialize();

    this.socket.on("selected", async ({ crypto }) => {
      this.terminal.addDataToPrint([crypto]);
      this.selectedCrypto = crypto;
      this.terminal.success("New data available, [press Enter] to fetch");
    });

    return this.mainLoop();
  }

  showPercentageVariation() {
    console.log(
      "---------------------------- \n" +
        `Percentage variation of ${this.selectedCrypto.symbol} (${this.selectedCrypto.name}): `
    );
    this.terminal.plotQuoteChart(this.selectedCrypto.quote.USD);
  }

  listCommands() {
    this.terminal.info(
      "---------------------------- \n" +
        "Commands: \n" +
        "\t* [press Enter]: update your Wallet \n" +
        "\t* select <ID>: select the crypto according to the specified <ID> \n" +
        "\t* remove <ID>: remove the crypto according to the specified <ID> \n" +
        "\t* stop : finish the process. \n"
    );
  }

  showWalletItems() {
    if (!this.terminal.hasDataToPrint()) {
      this.terminal.error("\tNo items in your wallet yet.");
      return;
    }

    this.terminal.initializeTable();
  }

  stopLoop() {
    this.terminal.info("Terminal instance finished!");
    this.socket.disconnect();
    this.terminal.close();
    process.exit(0);
  }

  async selectRegister(id) {
    this.terminal.success("Selecting register...");
    await this.terminal.wait(100);

    const data = this.terminal.getDataById(Number(id));

    if (!data) throw new RangeError(`No register found for id [${id || ""}]`);

    this.selectedCrypto = data;

    this.terminal.success("Register selected successfully!");
    await this.terminal.wait(500);
  }

  async removeRegister(id) {
    this.terminal.success("Removing register from your wallet...");
    await this.terminal.wait(100);

    const data = this.terminal.removeDataById(Number(id));

    if (!data) throw new RangeError(`No register found for [${id || ""}]`);

    this.selectedCrypto = null;

    this.terminal.success("Register removed successfully!");
    await this.terminal.wait(1000);
  }

  async updateTerminal() {
    this.terminal.success("Fetching...");
    await this.terminal.wait(1000);
  }

  async executeCommand(command, id) {
    const COMMANDS = {
      stop: this.stopLoop,
      select: this.selectRegister,
      remove: this.removeRegister,
      update: this.updateTerminal,
    };

    const execute = COMMANDS[command];

    if (!execute) {
      await COMMANDS["update"].call(this);
      return;
    }

    await execute.call(this, id);
  }

  async mainLoop() {
    try {
      this.terminal.success(
        "---------------------------- \n" + "Wallet | Connection Stablished"
      );

      if (this.selectedCrypto) {
        this.showPercentageVariation();
      }

      this.listCommands();

      console.log("Current listing:");

      this.showWalletItems();

      const answer = await this.terminal.question();

      const [command, id = null] = answer.split(" ");

      await this.executeCommand(command, id);

      await this.terminal.wait(2000);
    } catch (error) {
      this.terminal.error(`Error@mainLoop: ${error.message} \n`);
    } finally {
      // return this.mainLoop();
    }
  }
}

// new ConsumerCLI().initialize();
