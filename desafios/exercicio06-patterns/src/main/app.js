import AccountBuilder from "../data/builder/accountBuilder.js";
import CREDIT_PLANS from "../util/creditPlans.js";
import COMMANDS_INFO from "../util/commandsInfo.js";

export default class App {
  constructor(terminal) {
    this.terminal = terminal;
  }

  // INIT

  async initialize() {
    this.terminal.initialize();

    this.terminal.print("\nInitializing app...\n");

    await this.mainLoop();
  }

  // OPTIONS TO SHOW

  showPlans() {
    const plans = [];
    for (const plan in CREDIT_PLANS) {
      plans.push(CREDIT_PLANS[plan]);
    }

    this.terminal.printTable(plans);
  }

  showCommands(commands) {
    let options = "";

    for (const option in commands) {
      const { fields } = commands[option];
      options += `\t ${option}  ${fields || ""}\n`;
    }

    const msg = `\n Commands:\n
    ${options}
    `;

    this.terminal.print(msg);
  }

  showOptions(optionsInfo) {
    let options = "";

    for (const option in optionsInfo) {
      options += `\t ${option}\n`;
    }

    const msg = `\n Options:\n
    ${options}
    \t exit \n`;

    this.terminal.print(msg);
  }

  // COMMANDS TO EXECUTE

  closeApp() {
    this.terminal.print("\n Finishing app...\n");
    this.terminal.close();
    process.exit(0);
  }

  async getCredits(option) {
    const maker = COMMANDS_INFO.account.helpers.findCredits.maker;

    const inputData = {accountToken: this.accountToken, option}

    const credits = await this.executeControllerWithArgs(maker, inputData)

    return credits
  }

  async decreaseCredit(option) {
    const maker = COMMANDS_INFO.account.helpers.removeCredit.maker;

    const inputData = {accountToken: this.accountToken, option}
    
    await this.executeControllerWithArgs(maker, inputData)
  }

  async executeControllerWithArgs(maker, inputData) {
    const controller = maker();

    return controller.handle({
      ...inputData,
    });
  }

  async executeControllerWithoutArgs(maker) {
    const controller = maker();

    return controller.handle(this.accountToken);
  }

  async controllerManager(chosenCommand, fieldsData) {
    const { maker } = chosenCommand;

    if (!fieldsData.length) return this.executeControllerWithoutArgs(maker);

    const objectWithInputData = {};

    const fields = chosenCommand.fields.split(" ");

    fields.forEach(
      (field, index) => (objectWithInputData[field] = fieldsData[index])
    );

    return this.executeControllerWithArgs(maker, {
      ...objectWithInputData,
      accountId: this.accountToken,
    });
  }

  // QUESTIONS

  async accountServices() {
    const accountCommands = COMMANDS_INFO.account.options;
    this.showOptions(accountCommands);

    const command = await this.terminal.question(
      `\nPlease, choose an option:\n  R: `
    );

    if(command === "exit") this.closeApp();

    if (command === "signup")
      return this.createAccount(accountCommands.signup.maker);

    return this.login(accountCommands.login.maker);
  }

  async login(maker) {
    const email = await this.terminal.question(
      `\nPlease, provide your email:\n  R: `
    );

    const response = await this.executeControllerWithArgs(maker, { email });

    if (!response.id) {
      this.terminal.print(`\n${response}\n`);

      return;
    }

    this.accountToken = response.id;
  }

  async createAccount(maker) {
    const accountData = await this.terminal.question(
      `\nPlease, provide your name, email and cellphone:\n  R: `
    );

    const [name, email, cellphone] = accountData.split(" ");

    this.account = new AccountBuilder()
      .setName(name)
      .setEmail(email)
      .setCellphone(cellphone);

    await this.choosePlan();

    return this.executeControllerWithArgs(maker, this.account);
  }

  async choosePlan() {
    this.showPlans();

    const plan = await this.terminal.question(
      `\nPlease, choose a plan by name:\n  R: `
    );

    this.account = this.account.setCreditPlan(plan).setCredits().build();
  }

  async verifyCredits(chosenOption,commandsData) {
    const credits = await this.getCredits(chosenOption);
    const {commands} = commandsData
    if(!credits) return {list: commands.list};

    return commands;
  }

  async appServices() {
    this.showOptions(COMMANDS_INFO.options);

    const option = await this.terminal.question(
      `\nPlease, choose an option:\n  R: `
    );

    const chosenOption = option.trim()

    const commandsData = COMMANDS_INFO.options[chosenOption];

    if (!commandsData) return;

    const commands = await this.verifyCredits(chosenOption, commandsData);

    this.showCommands(commands);

    const commandArgs = await this.terminal.question(
      `\nPlease, choose a command:\n  R: `
    );

    const [command, ...fieldsData] = commandArgs?.split(" ");

    const chosenCommand = commands[command];

    if (chosenCommand === 'exit') this.closeApp();

    if(!chosenCommand) return;

    const result = await this.controllerManager(chosenCommand, fieldsData);

    await this.decreaseCredit(chosenOption);

    this.terminal.print(`\n${(JSON.stringify(result))}\n`);
  }

  async mainLoop() {
    try {
      if (!this.accountToken) {
        await this.accountServices();
        return;
      }

      await this.appServices();
    } catch (error) {
      console.error(error.message);
    } finally {
      return this.mainLoop();
    }
  }
}
