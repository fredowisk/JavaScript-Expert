import http from "http";

const API_BASE_URL = "http://localhost:3000";

class IncomeRepository {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => resolve(JSON.parse(data)));
        response.on("error", reject);
      });
    });
  }

  async getConversions() {
    const { results } = await this.makeRequest(`${API_BASE_URL}/convert`);
    return results;
  }
}

export default IncomeRepository;
