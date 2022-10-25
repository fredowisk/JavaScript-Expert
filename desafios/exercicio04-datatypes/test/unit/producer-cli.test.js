import {
  describe,
  test,
  jest,
  afterAll,
  beforeEach,
  afterEach,
  expect,
} from "@jest/globals";
import ProducerCLI from "../../src/producer-cli";
import cryptoMock from "../mocks/valid-crypto.json";
import { io } from "../../src/producer-server.js";

describe("#Producer CLI Test Suite", () => {
  const consoleCopy = console;
  console = {
    log: jest.fn(),
  };

  let producer;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    producer = new ProducerCLI();
  });

  afterEach(() => {
    io.close();
  });

  afterAll(() => {
    console = consoleCopy;
  });

  test("should execute the mainLoop when call initialize", async () => {
    const loopSpy = jest.spyOn(producer, "mainLoop").mockResolvedValue();

    await producer.initialize();

    expect(loopSpy).toHaveBeenCalled();
  });

  test("should add a user when call connectUser", () => {
    const terminalSpy = jest.spyOn(producer.terminal, "success");
    const id = 1;
    const successMsg = `Real time update: user [${id}] connected!`;

    expect(producer.users.hasUsers()).toStrictEqual(0);
    producer.connectUser(id);

    expect(producer.users.hasUsers()).toStrictEqual(1);
    expect(terminalSpy).toHaveBeenCalledWith(successMsg);
  });

  test("should remove a user when call disconnectUser", () => {
    const terminalSpy = jest.spyOn(producer.terminal, "error");
    const id = 1;
    const successMsg = `Real time update: user [${id}] disconnected!`;
    producer.users.add({id});

    expect(producer.users.hasUsers()).toStrictEqual(1);
    producer.disconnectUser(id);

    expect(producer.users.hasUsers()).toStrictEqual(0);
    expect(terminalSpy).toHaveBeenCalledWith(successMsg);
  })

  test("should list users when call listConnections", () => {
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
    const commandsSpy = jest.spyOn(producer.terminal, "info");

    producer.listCommands();

    expect(commandsSpy).toHaveBeenCalled();
  });

  test("should register a new page when call getNextPage", async () => {
    const addDataSpy = jest.spyOn(producer.terminal, "addDataToPrint");

    jest
      .spyOn(producer.cryptoGenerator, "next")
      .mockResolvedValue({ value: cryptoMock });

    await producer.getNextPage();

    expect(addDataSpy).toHaveBeenCalledWith(cryptoMock);
  });

  test("should execute listRegisters when executeCommand is called without a command", async () => {
    const listSpy = jest.spyOn(producer, "listRegisters");
    const getNexPageSpy = jest
      .spyOn(producer, "getNextPage")
      .mockResolvedValue();

    await producer.executeCommand();

    expect(listSpy).toHaveBeenCalled();
    expect(getNexPageSpy).toHaveBeenCalled();
  });

  test("should execute stopLoop when executeCommand is called with stop", async () => {
    process.exit = jest.fn();
    const stopSpy = jest.spyOn(producer, "stopLoop");
    const closeSpy = jest.spyOn(producer.terminal, "close").mockReturnValue();

    await producer.executeCommand("stop");

    expect(stopSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  test("should throw a RangeError when call selectRegister without a valid id", async () => {
    jest.spyOn(producer.terminal, "wait").mockImplementation(() => {});

    const promise = producer.selectRegister();

    await expect(promise).rejects.toThrow(RangeError);
  });

  test("should execute selectRegister when executeCommand is called with select", async () => {
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
    const fakeUser = { id: 1 };
    producer.users.add(fakeUser);

    const listSpy = jest.spyOn(producer, "listConnections");

    jest.spyOn(producer.terminal, "question").mockResolvedValue();
    jest.spyOn(producer, "executeCommand").mockResolvedValue();

    await producer.mainLoop();

    expect(listSpy).toHaveBeenCalled();
  });
});
