import {
  describe,
  test,
  jest,
  beforeEach,
  afterEach,
  afterAll,
  expect,
} from "@jest/globals";
import ConsumerCLI from "../../src/consumer-cli.js";
import cryptoMock from "../mocks/valid-crypto.json";

describe("#Consumer CLI Test Suite", () => {
  const consoleCopy = console;
  console = {
    log: jest.fn(),
  };

  let consumer;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    consumer = new ConsumerCLI();
  });

  afterEach(() => {
    consumer.socket.disconnect();
  });

  afterAll(() => {
    console = consoleCopy;
  });

  test("should execute the mainLoop when call initialize", () => {
    const loopSpy = jest.spyOn(consumer, "mainLoop").mockResolvedValue();

    consumer.initialize();

    expect(loopSpy).toHaveBeenCalled();
  });

  test("should add a crypto when call selectCrypto", () => {
    const [crypto] = cryptoMock;
    consumer.selectCrypto(crypto);

    expect(consumer.selectedCrypto).toStrictEqual(crypto);
  });

  test("should execute plotQuoteChart with USD quote when call showPercentageVariation", () => {
    const [crypto] = cryptoMock;

    const plotQuoteChartSpy = jest.spyOn(consumer.terminal, "plotQuoteChart");
    consumer.selectedCrypto = crypto;

    consumer.showPercentageVariation();

    expect(plotQuoteChartSpy).toHaveBeenCalledWith(crypto.quote.USD);
  });

  test("should execute initializeTable when call showWalletItems with a filled wallet", () => {
    jest.spyOn(consumer.terminal, "hasDataToPrint").mockReturnValue(true);

    const terminalSpy = jest
      .spyOn(consumer.terminal, "initializeTable")
      .mockReturnValue();

    consumer.showWalletItems();

    expect(terminalSpy).toHaveBeenCalled();
  });

  test("should execute stopLoop when call executeCommand with stop", async () => {
    process.exit = jest.fn();
    const stopSpy = jest.spyOn(consumer, "stopLoop");
    const closeSpy = jest.spyOn(consumer.terminal, "close").mockReturnValue();

    jest.spyOn(consumer.terminal, "wait").mockImplementation(() => {});

    await consumer.executeCommand("stop");

    expect(stopSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  test("should throw a RangeError when call selectRegister with an invalid id", async () => {
    const errorMsg = "No register found for id []";

    jest.spyOn(consumer.terminal, "question").mockResolvedValue("select ");
    const errorSpy = jest.spyOn(consumer.terminal, "error");

    await consumer.mainLoop();

    expect(errorSpy).toHaveBeenCalledWith(`Error@mainLoop: ${errorMsg} \n`);
  });

  test("should execute selectRegister when call executeCommand with select and id", async () => {
    const command = "select";
    const id = 1;

    const [crypto] = cryptoMock;

    const getDataSpy = jest
      .spyOn(consumer.terminal, "getDataById")
      .mockReturnValue(crypto);

    jest.spyOn(consumer.terminal, "wait").mockImplementation(() => {});

    await consumer.executeCommand(command, id);

    expect(getDataSpy).toHaveBeenCalledWith(id);
    expect(consumer.selectedCrypto).toStrictEqual(crypto);
  });

  test("should throw a RangeError when call removeRegister with an invalid id", async () => {
    jest.spyOn(consumer.terminal, "wait").mockImplementation(() => {});
    const promise = consumer.removeRegister();

    await expect(promise).rejects.toThrow(RangeError);
  });

  test("should execute removeRegister when call executeCommand with remove and id", async () => {
    const command = "remove";
    const id = 1;

    const [crypto] = cryptoMock;

    jest.spyOn(consumer.terminal, "removeDataById").mockReturnValue(crypto);
    jest.spyOn(consumer.terminal, "wait").mockImplementation(() => {});

    await consumer.executeCommand(command, id);

    expect(consumer.selectedCrypto).toStrictEqual(null);
  });

  test("should call executeCommand when execute mainLoop", async () => {
    const [crypto] = cryptoMock;

    consumer.selectedCrypto = crypto;

    const variationSpy = jest
      .spyOn(consumer, "showPercentageVariation")
      .mockReturnValue();

    jest.spyOn(consumer.terminal, "wait").mockImplementation(() => {});

    jest.spyOn(consumer.terminal, "question").mockResolvedValue("test ");

    const executeUpdateSpy = jest.spyOn(consumer, "updateTerminal");

    await consumer.mainLoop();

    expect(variationSpy).toHaveBeenCalled();
    expect(executeUpdateSpy).toHaveBeenCalled();
  });
});
