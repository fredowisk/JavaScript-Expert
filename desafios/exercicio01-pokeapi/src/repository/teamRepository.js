import https from "https";

export default class TeamRepository {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => resolve(JSON.parse(data)));
        response.on("error", reject);
      });
    });
  }

  async getPokemon(pokemonNameOrId) {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;
    const {forms: [{name: pokemonName}], moves} = await this.makeRequest(pokemonUrl);

    return { pokemonName, moves };
  }
}
