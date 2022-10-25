import { describe, test, jest, expect } from "@jest/globals";
import CryptoRepository from "../../../src/repository/cryptoRepository.js";
import api from "../../../src/util/api.js";
import cryptoMock from "../../mocks/valid-crypto.json";

describe("#Crypto Repository Test Suite", () => {
  beforeAll(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should use the api to get a list of cryptos", async () => {
    const cryptoRepository = new CryptoRepository();
    const page = 1;
    const limit = 5;
    const route = "/crypto";
    const params = {
      _page: page,
      _limit: limit,
    };

    const requestSpy = jest
      .spyOn(api, "get")
      .mockResolvedValue({ data: cryptoMock });

    const cryptoSpy = jest.spyOn(cryptoRepository, "list");

    const { data } = await cryptoRepository.list(page, limit);

    expect(requestSpy).toHaveBeenCalledWith(route, { params });
    expect(cryptoSpy).toHaveBeenCalledWith(page, limit);
    expect(data).toHaveLength(1);
    expect(data[0].id).toStrictEqual(1);
    expect(data[0].name).toStrictEqual("Bitcoin");
  });
});
