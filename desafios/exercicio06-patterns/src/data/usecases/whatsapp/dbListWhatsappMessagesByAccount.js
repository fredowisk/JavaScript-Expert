export default class DbListWhatsappMessagesByAccount {
  constructor(listWhatsappMessagesRepository) {
    this.listWhatsappMessagesRepository = listWhatsappMessagesRepository
  }

  async find(accountId) {
    const whatsappMessages = await this.listWhatsappMessagesRepository.listByAccountId(accountId);

    return whatsappMessages?.length && whatsappMessages
  }
}