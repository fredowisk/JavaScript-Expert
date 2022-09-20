import sinon from "sinon";
import { expect } from "chai";
import { describe, it } from "mocha";

import TerminalController from "../src/terminalController.js";

describe("Terminal Controller", () => {
  let terminalController = {};
  let sandbox = {};

  before(() => {
    terminalController = new TerminalController();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should call initializeTable with correct params when call initializeTerminal", () => {
    const DATABASE = [
      {
        id: 1,
        vehicles: ["Motocicleta", "Carro", "Caminhão"],
        kmTraveled: 10000,
        from: "2009-01-01",
        to: "2020-11-26",
      },
    ];
    const DEFAULT_LANG = "pt-BR";

    sandbox.spy(terminalController, terminalController.initializeTable.name);

    terminalController.initializeTerminal(DATABASE, DEFAULT_LANG);

    expect(
      terminalController.initializeTable.calledWithExactly(
        DATABASE,
        DEFAULT_LANG
      )
    ).to.be.ok;
  });

  it("should update the table when call updateTable with correct param", () => {
    const item = {
      id: 1,
      vehicles: ["Motocicleta", "Carro", "Caminhão"],
      kmTraveled: 10000,
      from: "2009-01-01",
      to: "2020-11-26",
    };

    sandbox.spy(terminalController, "data", Array);

    expect(terminalController.data).to.have.length(1);

    terminalController.updateTable(item);

    expect(terminalController.data).to.have.length(2);
  });

  it("should make a question when call question with a message", async () => {
    const question = "What?";

    const questionSpy = sinon.spy(terminalController.terminal, "question");

    terminalController.question(question);

    const { lastArg } = questionSpy.getCall(0);

    expect(
      terminalController.terminal.question.calledWithExactly(
        `${question}\nR:`,
        lastArg
      )
    ).to.be.ok;

    expect(terminalController.terminal.question.calledOnce).to.be.ok;
    expect(typeof lastArg === "function").to.be.ok;
  });

  it("should close the terminal", () => {
    terminalController.terminal = {
      close: () => {},
    };

    sandbox.spy(terminalController.terminal, "close");

    terminalController.closeTerminal();

    expect(terminalController.terminal.close.calledOnce).to.be.ok;
  });
});
