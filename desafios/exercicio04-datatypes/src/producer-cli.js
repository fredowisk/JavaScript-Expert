import CustomTerminal from "./util/customTerminal.js";
import CryptoService from "./service/cryptoService.js";
import CryptoRepository from "./repository/cryptoRepository.js";
import { io } from "./producer-server.js";
import Users from "./entity/users.js";

const COMMANDS = {
  stop: () => {
    terminal.info("Terminal instance finished!");
    terminal.close();
    process.exit(0);
  },
  list: async () => {
    terminal.success("Listing next registers...");

    const { value } = await cryptoGenerator.next();
    terminal.addDataToPrint(value);
  },
  select: async (id) => {
    try {
      terminal.success("Selecting register...");
      await terminal.wait(100);

      const data = terminal.getDataById(Number(id));

      if (!data) throw new RangeError(`No register found for id [${id || ""}]`);

      io.emit("selected", {
        crypto: data,
      });

      terminal.success(
        "Register successfully selected and sent to the following users: \n" +
          Array.from(users).join(", ") +
          "\n"
      );

      await terminal.wait(1000);
    } catch (error) {
      throw error;
    }
  },
};

const terminal = new CustomTerminal();
terminal.initialize();

const repository = new CryptoRepository();
const service = new CryptoService({ cryptoRepository: repository });
const cryptoGenerator = service.list();

const users = new Users();

io.on("connection", (socket) => {
  users.add({ id: socket.id });
  terminal.success(`Real time update: user [${socket.id}] connected!`);

  socket.on("disconnect", () => {
    users.remove(socket.id);
    terminal.error(`Real time update: user [${socket.id}] disconnected!`);
  });
});

export default async function mainLoop() {
  try {
    if (users.hasUsers()) {
      terminal.success(
        "---------------------------- \n" +
          "Connected Users: " +
          Array.from(users).join(", ")
      );
    }

    terminal.info(
      "---------------------------- \n" +
        "Commands: \n" +
        "\t* [press Enter]: list 5 more values \n" +
        "\t* select <ID>: select the crypto according to the specified <ID> \n" +
        "\t* stop : finish the process. \n"
    );

    if (!terminal.hasDataToPrint()) {
      const { value } = await cryptoGenerator.next();
      terminal.addDataToPrint(value);
    }

    console.log("Current listing:");
    terminal.initializeTable();

    const answer = await terminal.question();

    const [command, id = null] = answer.split(" ");

    const execute = COMMANDS[command];
    if (!execute) {
      await COMMANDS["list"]();
      return;
    }

    await execute(id);
  } catch (error) {
    terminal.error(`Error@mainLoop: ${error.message} \n`);
  } finally {
    return mainLoop();
  }
}
