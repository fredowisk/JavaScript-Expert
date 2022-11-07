import DbFindCreditsByAccount from "../../../data/usecases/account/dbFindCreditsByAccount.js";
import AccountMongoRepository from "../../../infra/database/mongodb/accountMongoRepository.js";
import FindCreditsController from "../../../presentation/controllers/account/findCreditsController.js";

export default function makeFindCreditsController() {
  const accountMongoRepository = new AccountMongoRepository();
  const findCredits = new DbFindCreditsByAccount(accountMongoRepository);
  return new FindCreditsController(findCredits);
}
