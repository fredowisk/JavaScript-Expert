import MessageHandler from "../_base/MessageHandler.js";

export default class EmailHandler extends MessageHandler {
  send() {
    const { from, to, subject, text } = this.message;
    console.log(
      `message from: <${from}> to: <${to}>\nsending email: ${subject} ${text}`
    );

    return true;
  }
}
