import RequiredFieldValidation from "../../../validation/requiredFieldValidation.js";
import EmailValidation from "../../../validation/emailValidation.js";
import ValidationComposite from "../../../validation/validationComposite.js";


export default function addEmailValidation() {
  const validations = []

  const requiredFields = ["accountId", "to", "subject", "text"];

  requiredFields.forEach((field) => {
    validations.push(new RequiredFieldValidation(field));
  })

  validations.push(new EmailValidation('to'))

  return new ValidationComposite(validations);
}