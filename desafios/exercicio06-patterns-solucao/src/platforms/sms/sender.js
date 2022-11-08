import MessageHandler from "../_base/MessageHandler.js";

export default class SMSHandler extends MessageHandler {
  send() {
    const { from, to, subject, text } = this.message;
    console.log(
      `message from: <${from}> to: <${to}>\nsending sms: ${subject} ${text}`
    );

    return true;
  }
}
