import SMSMongoRepository from "../../../infra/database/mongodb/smsMongoRepository.js";
import DbListSMSByAccount from '../../../data/usecases/sms/dbListSMSByAccount.js'
import ListSMSByAccountIdController from "../../../presentation/controllers/sms/listSMSByAccountIdController.js";

export default function makeListSMSByAccountIdController() {
  const listSMSMongoRepository = new SMSMongoRepository();
  const listSMS = new DbListSMSByAccount(listSMSMongoRepository);

  return new ListSMSByAccountIdController(listSMS);
}