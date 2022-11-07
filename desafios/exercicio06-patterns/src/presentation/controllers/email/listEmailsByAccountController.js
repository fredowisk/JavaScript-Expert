import {noContent} from "../../../util/responseHelper.js";

export default class ListEmailsByAccountController {
  constructor(listEmails) {
    this.listEmails = listEmails;
  }

  async handle(userId) {
    try {
      const emails = await this.listEmails.find(userId);

      if (!emails) {
        return noContent;
      }

      return emails;
    } catch (error) {
      console.error('Internal App Error');
    }
  }
}
