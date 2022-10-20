import "dotenv/config";
import ioClient from "socket.io-client";
import CustomTerminal from "./util/customTerminal.js";

const socket = ioClient.connect(process.env.HOST_URL);

const COMMANDS = {
  stop: () => {
    terminal.info("Terminal instance finished!");
    socket.disconnect();
    terminal.close();
    process.exit(0);
  },
  select: async (id) => {
    try {
      terminal.success("Selecting register...");
      await terminal.wait(100);

      const data = terminal.getDataById(Number(id));

      if (!data) throw new RangeError(`No register found for id [${id || ""}]`);

      selectedCrypto = data;

      terminal.success("Register selected successfully!");
      await terminal.wait(500);
    } catch (error) {
      throw error;
    }
  },
  remove: async (id) => {
    try {
      terminal.success("Removing register from your wallet...");
      await terminal.wait(100);

      const data = terminal.removeDataById(Number(id));

      if (!data) throw new RangeError(`No register found for [${id || ""}]`);

      selectedCrypto = null;
      terminal.success("Register removed successfully!");
      await terminal.wait(1000);
    } catch (error) {
      throw error;
    }
  },
  update: async () => {
    terminal.success("Fetching...");
    await terminal.wait(1000);
  },
};

const terminal = new CustomTerminal();

let selectedCrypto = null;

terminal.initialize();

socket.on("selected", async ({ crypto }) => {
  terminal.addDataToPrint([crypto]);
  selectedCrypto = crypto;
  terminal.success("New data available, [press Enter] to fetch");
});

export default async function mainLoop() {
  try {
    terminal.success(
      "---------------------------- \n" + "Wallet | Connection Stablished"
    );

    if (selectedCrypto) {
      console.log(
        "---------------------------- \n" +
          `Percentage variation of ${selectedCrypto.symbol} (${selectedCrypto.name}): `
      );
      terminal.plotQuoteChart(selectedCrypto.quote.USD);
    }

    terminal.info(
      "---------------------------- \n" +
        "Commands: \n" +
        "\t* [press Enter]: update your Wallet \n" +
        "\t* select <ID>: select the crypto according to the specified <ID> \n" +
        "\t* remove <ID>: remove the crypto according to the specified <ID> \n" +
        "\t* stop : finish the process. \n"
    );

    console.log("Current listing:");

    if (!terminal.hasDataToPrint()) {
      terminal.error("\tNo items in your wallet yet.");
    } else {
      terminal.initializeTable();
    }

    const answer = await terminal.question();

    const [command, id = null] = answer.split(" ");

    const execute = COMMANDS[command];

    if (!execute) {
      return COMMANDS["update"]();
    }

    await execute(id);

    await terminal.wait(2000);
  } catch (error) {
    terminal.error(`Error@mainLoop: ${error.message} \n`);
  } finally {
    return mainLoop();
  }
}

await mainLoop();
