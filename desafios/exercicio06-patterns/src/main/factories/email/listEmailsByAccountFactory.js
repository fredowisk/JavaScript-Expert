import EmailMongoRepository from "../../../infra/database/mongodb/emailMongoRepository.js";
import DbListEmailsByAccount from '../../../data/usecases/email/dbListEmailsByAccount.js';
import ListEmailsByAccountController from "../../../presentation/controllers/email/listEmailsByAccountController.js";

export default function makeListEmailsByAccountController () {
  const listEmailsMongoRepository = new EmailMongoRepository();
  const listEmails = new DbListEmailsByAccount(listEmailsMongoRepository);

  return new ListEmailsByAccountController(listEmails);
}