
  import CloatheService from '../service/cloatheService.js'
  import CloatheRepository from '../repository/cloatheRepository.js'

  export default class CloatheFactory {
    static getInstance() {
      const repository = new CloatheRepository();
      return new CloatheService({repository});
    }
  }
