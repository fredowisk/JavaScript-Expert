import SMS from "../../../domain/models/sms.js";
import { success } from "../../../util/responseHelper.js";

export default class AddSMSController {
  constructor(addSMS, validation) {
    this.addSMS = addSMS;
    this.validation = validation;
  }

  async handle(smsData) {
    try {
      const error = this.validation.validate(smsData);

      if (error) {
        return error.message;
      }

      await this.addSMS.save(new SMS(smsData));

      return success;
    } catch (error) {
      console.error("Internal App Error");
    }
  }
}
