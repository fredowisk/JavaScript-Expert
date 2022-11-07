export default class DbListEmailsByAccount {
  constructor(listSMSRepository) {
    this.listSMSRepository = listSMSRepository;
  }

  async find(accountId) {
    const emailData = await this.listSMSRepository.listByAccountId(accountId);

    return emailData?.length && emailData;
  }
}
