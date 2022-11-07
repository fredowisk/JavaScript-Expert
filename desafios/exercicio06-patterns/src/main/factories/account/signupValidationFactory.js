import EmailValidation from "../../../validation/emailValidation.js";
import CellphoneValidation from "../../../validation/cellphoneValidation.js";
import RequiredFieldValidation from "../../../validation/requiredFieldValidation.js";
import ValidationComposite from "../../../validation/validationComposite.js";

export default function signupValidation() {
  const validations = [];

  const requiredFields = ['name', 'email', 'cellphone', 'creditPlan', 'credits']

  requiredFields.forEach(field => {
    validations.push(new RequiredFieldValidation(field));
  })

  validations.push(new EmailValidation());
  validations.push(new CellphoneValidation());

  return new ValidationComposite(validations);
}