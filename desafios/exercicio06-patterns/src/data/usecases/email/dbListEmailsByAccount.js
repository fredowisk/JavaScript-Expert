export default class DbListEmailsByAccount {
  constructor(listEmailsRepository) {
    this.listEmailsByAccountRepository = listEmailsRepository;
  }

  async find(accountId) {
    const emailData = await this.listEmailsByAccountRepository.listByAccountId(accountId);

    return emailData?.length && emailData
  }
}