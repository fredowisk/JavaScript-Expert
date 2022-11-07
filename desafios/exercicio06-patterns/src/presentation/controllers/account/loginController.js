import {unauthorized} from "../../../util/responseHelper.js";

export default class LoginController {
  constructor(authentication, validation){
    this.authentication = authentication
    this.validation = validation
  }

  async handle(accountData) {
    try {

      const error = this.validation.validate(accountData);

      if(error) {
        return error.message;
      }

      const account = await this.authentication.auth(accountData.email)

      if(!account) return unauthorized

      return account
    } catch (error) {
      console.error('Internal App Error');
    }
  }
}