import {noContent} from "../../../util/responseHelper.js";

export default class ListWhatsappMessagesController {
  constructor(listWhatsappMessages) {
    this.listWhatsappMessages = listWhatsappMessages;
  }

  async handle(accountId) {
    try {
      const whatsappMessages = await this.listWhatsappMessages.find(accountId);

      if (!whatsappMessages) {
        return noContent;
      }

      return whatsappMessages;
    } catch (error) {
      console.error('Internal App Error');
    }
  }
}
