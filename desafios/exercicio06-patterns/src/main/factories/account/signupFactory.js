import AccountMongoRepository from "../../../infra/database/mongodb/accountMongoRepository.js";
import SignupController from "../../../presentation/controllers/account/signupController.js";
import signupValidation from "./signupValidationFactory.js";
import DbAddAccount from '../../../data/usecases/account/dbAddAccount.js';

export default function makeSignupController() {
  const accountMongoRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(accountMongoRepository);

  return new SignupController(addAccount, signupValidation())
}