import DbRemoveCredit from "../../../data/usecases/account/dbRemoveCredit.js";
import AccountMongoRepository from "../../../infra/database/mongodb/accountMongoRepository.js";
import RemoveCreditController from "../../../presentation/controllers/account/removeCreditController.js";

export default function makeRemoveCreditController() {
  const accountMongoRepository = new AccountMongoRepository();
  const removeCredit = new DbRemoveCredit(accountMongoRepository);
  return new RemoveCreditController(removeCredit);
}
