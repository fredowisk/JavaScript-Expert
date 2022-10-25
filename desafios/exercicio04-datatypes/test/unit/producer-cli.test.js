import {
  describe,
  test,
  jest,
  afterAll,
  beforeEach,
  expect,
} from "@jest/globals";
import ProducerCLI from "../../src/producer-cli";
import cryptoMock from "../mocks/valid-crypto.json";

describe("#Producer CLI Test Suite", () => {
  const consoleCopy = console;
  console = {
    log: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    console = consoleCopy;
  });

  test("should execute the mainLoop when call initialize", () => {
    const producer = new ProducerCLI();

    const loopSpy = jest.spyOn(producer, "mainLoop").mockResolvedValue();

    producer.initialize();

    expect(loopSpy).toHaveBeenCalled();
  });

  test("should list users when call listConnections", () => {
    const producer = new ProducerCLI();
    const fakeUser = { id: 1 };
    producer.users.add(fakeUser);

    const expected =
      "---------------------------- \n" +
      "Connected Users: " +
      `${fakeUser.id}`;

    const connectionsSpy = jest.spyOn(producer.terminal, "success");

    producer.listConnections();

    expect(connectionsSpy).toHaveBeenCalledWith(expected);
  });

  test("should print the commands when call listCommands", () => {
    const producer = new ProducerCLI();

    const commandsSpy = jest.spyOn(producer.terminal, "info");

    producer.listCommands();

    expect(commandsSpy).toHaveBeenCalled();
  });

  test("should register a new page when call getNextPage", async () => {
    const producer = new ProducerCLI();

    const addDataSpy = jest.spyOn(producer.terminal, "addDataToPrint");

    jest
      .spyOn(producer.cryptoGenerator, "next")
      .mockResolvedValue({ value: cryptoMock });

    await producer.getNextPage();

    expect(addDataSpy).toHaveBeenCalledWith(cryptoMock);
  });

  test("should execute listRegisters when executeCommand is called without a command", async () => {
    const producer = new ProducerCLI();

    const listSpy = jest.spyOn(producer, "listRegisters");
    const getNexPageSpy = jest
      .spyOn(producer, "getNextPage")
      .mockResolvedValue();

    await producer.executeCommand();

    expect(listSpy).toHaveBeenCalled();
    expect(getNexPageSpy).toHaveBeenCalled();
  });

  test("should execute stopLoop when executeCommand is called with stop", async () => {
    const producer = new ProducerCLI();

    process.exit = jest.fn();
    const stopSpy = jest.spyOn(producer, "stopLoop");
    const closeSpy = jest.spyOn(producer.terminal, "close").mockReturnValue();

    await producer.executeCommand("stop");

    expect(stopSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  test("should throw a RangeError when call selectRegister without a valid id", async () => {
    const producer = new ProducerCLI();

    jest.spyOn(producer.terminal, "wait").mockImplementation(() => {});

    const promise = producer.selectRegister();

    await expect(promise).rejects.toThrow(RangeError);
  });

  test("should execute selectRegister when executeCommand is called with select", async () => {
    const producer = new ProducerCLI();
    const command = "select";
    const id = 1;
    const [crypto] = cryptoMock;

    const selectSpy = jest.spyOn(producer, "selectRegister");
    const getDataSpy = jest
      .spyOn(producer.terminal, "getDataById")
      .mockReturnValue(crypto);

    jest.spyOn(producer.terminal, "wait").mockImplementation(() => {});

    await producer.executeCommand(command, id);

    expect(selectSpy).toHaveBeenCalledWith(id);
    expect(getDataSpy).toHaveBeenCalledWith(id);
  });

  test("should execute listConnections when call the mainLoop with users connected", async () => {
    const producer = new ProducerCLI();
    const fakeUser = { id: 1 };
    producer.users.add(fakeUser);

    const listSpy = jest.spyOn(producer, "listConnections");

    jest.spyOn(producer.terminal, "question").mockResolvedValue();
    jest.spyOn(producer, "executeCommand").mockResolvedValue();

    await producer.mainLoop();

    expect(listSpy).toHaveBeenCalled();
  });
});
