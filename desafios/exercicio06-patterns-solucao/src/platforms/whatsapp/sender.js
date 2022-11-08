import MessageHandler from "../_base/MessageHandler.js";

export default class WhatsappHandler extends MessageHandler {
  send() {
    const { from, to, subject, text } = this.message;
    console.log(
      `message from: <${from}> to: <${to}>\nsending whatsapp message: ${subject} ${text}`
    );

    return true;
  }
}
