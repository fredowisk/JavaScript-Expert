import DbListWhatsappMessagesByAccount from "../../../data/usecases/whatsapp/dbListWhatsappMessagesByAccount.js";
import WhatsappMongoRepository from "../../../infra/database/mongodb/whatsappMongoRepository.js";
import ListWhatsappMessagesController from "../../../presentation/controllers/whatsapp/listWhatsappMessagesController.js";

export default function makeListWhatsappMessagesByAccountIdController() {
  const listWhatsappMessagesMongoRepository = new WhatsappMongoRepository();
  const listWhatsappMessages = new DbListWhatsappMessagesByAccount(
    listWhatsappMessagesMongoRepository
  );

  return new ListWhatsappMessagesController(listWhatsappMessages);
}
