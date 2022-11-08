import MessageSenderFactory from "./factory/messageSenderFactory.js";
import MessageService from "./service/messageService.js";

class API {
  async sendMessage(platform, message) {
    const user = { id: "1" };

    const service = new MessageService({
      messageFactory: MessageSenderFactory,
    });

    const result = await service.sendMessage({
      user: user.id,
      platform,
      message,
    });

    return result;
  }

  async addCredit(platform, amount) {
    const user = { id: "1" };

    const service = new MessageService({
      messageFactory: MessageSenderFactory,
    });

    await service.addCredit({
      platform,
      user: user.id,
      amount,
    });
  }
}

const api = new API();
await api.addCredit("email", 1);

console.log(await api.sendMessage("email", "oieeeee"));
console.log(await api.sendMessage("email", "oieeeeeeee"));
console.log(await api.sendMessage("sms", "oieeeee"));
console.log(await api.sendMessage("whatsapp", "oieeeee"));
