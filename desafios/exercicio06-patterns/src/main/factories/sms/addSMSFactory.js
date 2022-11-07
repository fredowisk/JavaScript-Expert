import DbAddSMS from "../../../data/usecases/sms/dbAddSMS.js";
import SMSMongoRepository from "../../../infra/database/mongodb/smsMongoRepository.js";
import AddSMSController from "../../../presentation/controllers/sms/addSMSController.js";
import addSMSValidation from "./addSMSValidationFactory.js";

export default function makeAddSMSController() {
  const addSMSRepository = new SMSMongoRepository();
  const addSMS = new DbAddSMS(addSMSRepository);

  return new AddSMSController(addSMS, addSMSValidation());
}
