import WhatsappMessage from "../../../domain/models/whatsappMessage.js";
import { success } from "../../../util/responseHelper.js";

export default class AddWhatsappMessageController {
  constructor(addWhatsappMessage, validation) {
    this.addWhatsappMessage = addWhatsappMessage;
    this.validation = validation;
  }

  async handle(whatsappData) {
    try {
      const error = this.validation.validate(whatsappData);

      if (error) {
        return error.message;
      }

      await this.addWhatsappMessage.save(new WhatsappMessage(whatsappData));

      return success;
    } catch (error) {
      console.error("Internal App Error");
    }
  }
}
