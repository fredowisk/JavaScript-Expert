import {
  describe,
  test,
  jest,
  expect,
  beforeEach,
  afterAll,
} from "@jest/globals";
import readLine from "readline";
import CustomTerminal from "../../../src/util/customTerminal.js";
import cryptoMock from "../../mocks/valid-crypto.json";
import asciichart from "asciichart";

describe("Name of the group", () => {
  //Doing this because there is a bug in Jest using Draftlog
  const copyConsole = console;
  console = {
    draft: (table) => "printed",
    log: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    console = copyConsole;
  });

  test("should initialize the terminal when call initialize", () => {
    const customTerminal = new CustomTerminal();

    const kTerminal = Object.getOwnPropertySymbols(customTerminal)[2];
    expect(customTerminal[kTerminal]).toStrictEqual({});
    customTerminal.initialize();
    expect(customTerminal[kTerminal]).toBeInstanceOf(readLine.Interface);
  });

  test("should initialize the printer when call initializeTable", () => {
    const customTerminal = new CustomTerminal();

    const kPrint = Object.getOwnPropertySymbols(customTerminal)[0];
    expect(customTerminal[kPrint]).toStrictEqual({});
    customTerminal.initializeTable();
    expect(customTerminal[kPrint]).toStrictEqual("printed");
  });

  test("should return the number of data when call hasDataToPrint", () => {
    const customTerminal = new CustomTerminal();
    const fakeData = { id: 1 };

    const kData = Object.getOwnPropertySymbols(customTerminal)[1];
    const result = customTerminal.hasDataToPrint();
    expect(result).toStrictEqual(0);

    customTerminal[kData].set(fakeData.id, fakeData);
    const result2 = customTerminal.hasDataToPrint();
    expect(result2).toStrictEqual(1);
  });

  test("should print a info when call addDataToPrint without data", () => {
    const customTerminal = new CustomTerminal();

    const msg = "No more cryptos to list!\n";
    const printInfoSpy = jest.spyOn(customTerminal, "info").mockReturnValue();

    customTerminal.addDataToPrint();

    expect(printInfoSpy).toHaveBeenCalledWith(msg);
  });

  test("should register a data to print when call addDataToPrint", () => {
    const customTerminal = new CustomTerminal();
    const fakeData = { id: 1 };

    customTerminal.addDataToPrint([fakeData]);
    const kData = Object.getOwnPropertySymbols(customTerminal)[1];
    const result = customTerminal[kData].size;
    expect(result).toStrictEqual(1);
  });

  test("should return a registered data when call getDataById", () => {
    const customTerminal = new CustomTerminal();
    const fakeData = { id: 1 };

    const kData = Object.getOwnPropertySymbols(customTerminal)[1];
    customTerminal[kData].set(fakeData.id, fakeData);
    const result = customTerminal.getDataById(fakeData.id);
    expect(result).toStrictEqual(fakeData);
  });

  test("should remove a registered data when call removeDataById", () => {
    const customTerminal = new CustomTerminal();
    const fakeData = { id: 1 };

    const kData = Object.getOwnPropertySymbols(customTerminal)[1];
    customTerminal[kData].set(fakeData.id, fakeData);
    expect(customTerminal[kData].size).toStrictEqual(1);
    customTerminal.removeDataById(fakeData.id);
    expect(customTerminal[kData].size).toStrictEqual(0);
  });

  test("should instantly return when call plotQuoteChart without data", () => {
    const customTerminal = new CustomTerminal();
    const spy = jest.spyOn(asciichart, "plot").mockReturnValue();

    customTerminal.plotQuoteChart();

    expect(spy).not.toHaveBeenCalled();
  });

  test("should print the crypto quote when call plotQuoteChart with data", () => {
    const [
      {
        quote: { USD: data },
      },
    ] = cryptoMock;
    const customTerminal = new CustomTerminal();

    const expected = [
      ...Array.from({ length: 30 }, () => data.percent_change_90d),
      ...Array.from({ length: 30 }, () => data.percent_change_60d),
      ...Array.from({ length: 30 }, () => data.percent_change_30d),
      ...Array.from({ length: 7 }, () => data.percent_change_7d),
      data.percent_change_24h,
    ];

    const spy = jest.spyOn(asciichart, "plot").mockReturnValue();
    customTerminal.plotQuoteChart(data);

    expect(spy).toHaveBeenCalledWith(expected);
    expect(console.log).toHaveBeenCalled();
  });

  test("should call terminal question when call question", () => {
    const customTerminal = new CustomTerminal();
    const kTerminal = Object.getOwnPropertySymbols(customTerminal)[2];

    customTerminal[kTerminal].question = jest.fn();

    customTerminal.question();
    expect(customTerminal[kTerminal].question).toHaveBeenCalled();
  });

  test("should close the terminal when call close", () => {
    const customTerminal = new CustomTerminal();
    const kTerminal = Object.getOwnPropertySymbols(customTerminal)[2];

    customTerminal[kTerminal].close = jest.fn();

    customTerminal.close();
    expect(customTerminal[kTerminal].close).toHaveBeenCalled();
  });
});
