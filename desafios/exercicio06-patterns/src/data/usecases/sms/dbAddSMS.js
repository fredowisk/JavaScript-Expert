export default class DbAddSMS {
  constructor(addSMSRepository) {
    this.addSMSRepository = addSMSRepository;
  }

  async save(smsData) {
    await this.addSMSRepository.save(smsData);
  }
}
