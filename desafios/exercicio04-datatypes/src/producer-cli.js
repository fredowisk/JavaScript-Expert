import { io } from "./producer-server.js";

import CustomTerminal from "./util/customTerminal.js";
import CryptoService from "./service/cryptoService.js";
import CryptoRepository from "./repository/cryptoRepository.js";
import Users from "./entity/users.js";
export default class ProducerCLI {
  constructor() {
    this.terminal = new CustomTerminal();
    this.service = new CryptoService({
      cryptoRepository: new CryptoRepository(),
    });
    this.cryptoGenerator = this.service.list();
    this.users = new Users();
  }

  initialize() {
    this.terminal.initialize();

    io.on("connection", (socket) => {
      this.users.add({ id: socket.id });
      this.terminal.success(`Real time update: user [${socket.id}] connected!`);

      socket.on("disconnect", () => {
        this.users.remove(socket.id);
        this.terminal.error(
          `Real time update: user [${socket.id}] disconnected!`
        );
      });
    });

    return this.mainLoop();
  }

  stopLoop() {
    this.terminal.info("Terminal instance finished!");
    this.terminal.close();
    process.exit(0);
  }

  async listRegisters() {
    this.terminal.success("Listing next registers...");
    await this.getNextPage();
  }

  async selectRegister(id) {
    this.terminal.success("Selecting register...");
    await this.terminal.wait(100);

    const data = this.terminal.getDataById(Number(id));

    if (!data) throw new RangeError(`No register found for id [${id || ""}]`);

    io.emit("selected", {
      crypto: data,
    });

    this.terminal.success(
      "Register successfully selected and sent to the following users: \n" +
        Array.from(this.users).join(", ") +
        "\n"
    );

    await this.terminal.wait(1000);
  }

  async executeCommand(command, id) {
    const COMMANDS = {
      stop: this.stopLoop,
      list: this.listRegisters,
      select: this.selectRegister,
    };

    const execute = COMMANDS[command];

    if (!execute) {
      await COMMANDS["list"].call(this);
      return;
    }

    await execute.call(this, id);
  }

  listConnections() {
    this.terminal.success(
      "---------------------------- \n" +
        "Connected Users: " +
        Array.from(this.users).join(", ")
    );
  }

  listCommands() {
    this.terminal.info(
      "---------------------------- \n" +
        "Commands: \n" +
        "\t* [press Enter]: list 5 more values \n" +
        "\t* select <ID>: select the crypto according to the specified <ID> \n" +
        "\t* stop : finish the process. \n"
    );
  }

  async getNextPage() {
    const { value } = await this.cryptoGenerator.next();
    this.terminal.addDataToPrint(value);
  }

  async mainLoop() {
    try {
      if (this.users.hasUsers()) {
        this.listConnections();
      }

      this.listCommands();

      if (!this.terminal.hasDataToPrint()) {
        await this.getNextPage();
      }

      console.log("Current listing:");
      this.terminal.initializeTable();

      const answer = await this.terminal.question();

      const [command, id = null] = answer.split(" ");
      await this.executeCommand(command, id);
    } catch (error) {
      this.terminal.error(`Error@mainLoop: ${error.message} \n`);
    } finally {
      // return this.mainLoop();
    }
  }
}
