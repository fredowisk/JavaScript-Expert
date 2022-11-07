import EmailMongoRepository from "../../../infra/database/mongodb/emailMongoRepository.js";
import AddEmailController from "../../../presentation/controllers/email/addEmailController.js";
import DbAddEmail from '../../../data/usecases/email/dbAddEmail.js'
import addEmailValidation from "./addEmailValidationFactory.js";

export default function makeAddEmailController() {
  const addEmailMongoRepository = new EmailMongoRepository();
  const addEmail = new DbAddEmail(addEmailMongoRepository);

  return new AddEmailController(addEmail, addEmailValidation())
}