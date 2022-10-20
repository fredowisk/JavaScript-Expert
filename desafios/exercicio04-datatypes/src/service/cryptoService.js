import Crypto from "../entity/crypto.js";

export default class CryptoService {
  constructor({ cryptoRepository }) {
    this.cryptoRepository = cryptoRepository;
  }

  async *list() {
    let page = 1;

    while (true) {
      const { data } = await this.cryptoRepository.list(page);

      yield data.map((crypto) => new Crypto(crypto));

      page++;
    }
  }
}
