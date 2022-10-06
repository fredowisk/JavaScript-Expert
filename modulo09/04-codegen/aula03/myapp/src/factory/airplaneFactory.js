
  import AirplaneService from '../service/airplaneService.js'
  import AirplaneRepository from '../repository/airplaneRepository.js'

  export default class AirplaneFactory {
    static getInstance() {
      const repository = new AirplaneRepository();
      return new AirplaneService({repository});
    }
  }
