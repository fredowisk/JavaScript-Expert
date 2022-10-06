
  import DogService from '../service/dogService.js'
  import DogRepository from '../repository/dogRepository.js'

  export default class DogFactory {
    static getInstance() {
      const repository = new DogRepository();
      return new DogService({repository});
    }
  }
