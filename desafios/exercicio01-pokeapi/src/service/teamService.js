export default class TeamService {
  constructor(teamRepository) {
    this.teamRepository = teamRepository;
    this.totalNumberOfPokemons = 898;
    this.teamLength = 3
    this.team = [];
  }

  getRandomId() {
    return Math.ceil(Math.random() * this.totalNumberOfPokemons);
  }

  formatPokemonMoves(moves) {
    return moves.slice(0, 3).map(({ move: { name } }) => name);
  }

  async getRandomTeam() {
    for (let index = 0; index < this.teamLength; index++) {
      const randomId = this.getRandomId();

      const { name, moves } = await this.teamRepository.getPokemon(randomId);

      const newMoves = this.formatPokemonMoves(moves);

      this.team.push({ name, moves: newMoves });
    }

    return this.team;
  }
}
