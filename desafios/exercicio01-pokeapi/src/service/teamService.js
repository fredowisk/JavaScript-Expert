import TeamRepository from "../repository/teamRepository";

export default class TeamService {
  constructor() {
    this.totalNumberOfPokemons = 898;
    this.team = [];
  }

  formatPokemonMoves(moves) {
    return moves.slice(0, 3).map(({ move: { name } }) => name);
  }

  async getRandomPokemons() {
    for (let index = 0; index < 3; index++) {
      const randomId = Math.ceil(Math.random() * this.totalNumberOfPokemons);

      const teamRepository = new TeamRepository();

      const { pokemonName, moves } = await teamRepository.getPokemon(randomId);

      const newMoves = this.formatPokemonMoves(moves)

      this.team.push({ pokemonName, moves: newMoves });
    }

    return this.team;
  }
}
