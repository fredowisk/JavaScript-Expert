export default class DbAddEmail {
  constructor(addEmailRepository) {
    this.addEmailRepository = addEmailRepository;
  }

  async save(emailData) {
    await this.addEmailRepository.save(emailData);
  }
}
