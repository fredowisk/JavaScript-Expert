import WhatsappMongoRepository from "../../../infra/database/mongodb/whatsappMongoRepository.js";
import DbAddWhatsappMessage from "../../../data/usecases/whatsapp/dbAddWhatsappMessage.js";
import AddWhatsappMessageController from "../../../presentation/controllers/whatsapp/addWhatsappMessageController.js";
import addWhatsappMessageValidation from "./addWhatsappMessageValidationFactory.js";

export default function makeAddWhatsappMessageController() {
  const addWhatsappMongoRepository = new WhatsappMongoRepository();
  const addWhatsappMessage = new DbAddWhatsappMessage(
    addWhatsappMongoRepository
  );
  return new AddWhatsappMessageController(
    addWhatsappMessage,
    addWhatsappMessageValidation()
  );
}
