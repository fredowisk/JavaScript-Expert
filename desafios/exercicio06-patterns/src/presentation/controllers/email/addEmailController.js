import Email from '../../../domain/models/email.js'
import {success} from "../../../util/responseHelper.js";

export default class AddEmailController {
  constructor(addEmail, validation) {
    this.addEmail = addEmail;
    this.validation = validation;
  }

  async handle(emailData) {
    try {
      const error = this.validation.validate(emailData);

      if (error) {
        return error.message;
      }

      await this.addEmail.save(new Email(emailData));

      return success;
    } catch (error) {
      console.error('Internal App Error');
    }
  }
}
