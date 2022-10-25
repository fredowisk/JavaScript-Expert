import { describe, test, jest, expect } from "@jest/globals";
import CryptoService from "../../../src/service/cryptoService.js";
import Crypto from "../../../src/entity/crypto.js";
import cryptoMock from "../../mocks/valid-crypto.json";

class CryptoRepositoryStub {
  async list() {
    return Promise.resolve({ data: cryptoMock });
  }
}

describe("#Crypto Service Test Suite", () => {
  beforeAll(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should use the api to get a list of cryptos", async () => {
    const cryptoRepository = new CryptoRepositoryStub();
    const cryptoService = new CryptoService({ cryptoRepository });

    let page = 1;

    const cryptoSpy = jest.spyOn(cryptoRepository, "list");

    const cryptoGenerator = cryptoService.list();

    const { value } = await cryptoGenerator.next();

    expect(cryptoSpy).toHaveBeenCalledWith(page);
    expect(value).toHaveLength(1);
    expect(value[0].id).toStrictEqual(1);
    expect(value[0].name).toStrictEqual("Bitcoin");
    expect(value[0]).toBeInstanceOf(Crypto);

    page = 2;
    await cryptoGenerator.next();
    expect(cryptoSpy).toHaveBeenCalledWith(page);
  });
});
