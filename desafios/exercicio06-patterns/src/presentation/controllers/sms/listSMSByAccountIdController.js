import {noContent} from "../../../util/responseHelper.js";

export default class ListSMSByAccountIdController {
  constructor(listSMS) {
    this.listSMS = listSMS;
  }

  async handle(accountId) {
    try {
      const smsList = await this.listSMS.find(accountId);

      if(!smsList) {
        return noContent
      }

      return smsList
    } catch (error) {
      console.error('Internal App Error');
    }
  }
}