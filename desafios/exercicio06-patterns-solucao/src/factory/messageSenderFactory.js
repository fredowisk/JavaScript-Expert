import UserCreditRepository from "../repository/userCreditRepository.js";
import MessageSenderFacade from "../platforms/messageSenderFacade.js";

import database from "../shared/database.js";

export default class MessageSenderFactory {
  static async createInstance({ user, platform, message }) {
    const { default: CreditHandler } = await import(
      `../platforms/${platform}/credit.js`
    );

    const { default: MessageSender } = await import(
      `../platforms/${platform}/sender.js`
    );

    const userCreditRepository = new UserCreditRepository({ db: database });

    const creditHandler = new CreditHandler({
      user,
      userRepository: userCreditRepository,
    });

    const messageHandler = new MessageSender({ message: message });

    const messageSenderFacade = new MessageSenderFacade({
      creditHandler,
      messageHandler,
    });

    return messageSenderFacade;
  }
}
