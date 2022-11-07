import RequiredFieldValidation from "../../../validation/requiredFieldValidation.js";
import CellphoneValidation from "../../../validation/cellphoneValidation.js";
import ValidationComposite from "../../../validation/validationComposite.js";


export default function addSMSValidation () {
  const validations = [];

  const requiredFields = ['accountId', 'contactNumber', 'text'];

  requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)));

  validations.push(new CellphoneValidation('contactNumber'));

  return new ValidationComposite(validations);
}