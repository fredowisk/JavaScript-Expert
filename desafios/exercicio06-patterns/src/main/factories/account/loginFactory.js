import AccountAuthentication from "../../../data/usecases/authentication/accountAuthentication.js";
import AccountMongoRepository from "../../../infra/database/mongodb/accountMongoRepository.js";
import LoginController from "../../../presentation/controllers/account/loginController.js";

import loginValidation from "./loginValidationFactory.js";

export default function makeLoginController() {
  const accountMongoRepository = new AccountMongoRepository();
  const authentication = new AccountAuthentication(accountMongoRepository);
  return new LoginController(authentication, loginValidation());
}
