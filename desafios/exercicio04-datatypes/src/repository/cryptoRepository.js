import api from "../util/api.js";

export default class CryptoRepository {
  async list(page = 1, limit = 5) {
    return api.get("/crypto", {
      params: {
        _page: page, // note: pagination could also use _start instead
        _limit: limit,
      },
    });
  }
}
