import RequiredFieldValidation from "../../../validation/requiredFieldValidation.js";
import EmailValidation from "../../../validation/emailValidation.js";
import ValidationComposite from "../../../validation/validationComposite.js";

export default function loginValidation () {
  const validations = [];

  const fieldName = "email";

  validations.push(new RequiredFieldValidation(fieldName));

  validations.push(new EmailValidation());

  return new ValidationComposite(validations);
};
