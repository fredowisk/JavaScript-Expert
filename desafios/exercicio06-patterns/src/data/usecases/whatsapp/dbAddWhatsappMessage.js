export default class DbAddWhatsappMessage {
  constructor(addWhatsappRepository) {
    this.addWhatsappRepository = addWhatsappRepository;
  }

  async save(whatsappData) {
    await this.addWhatsappRepository.save(whatsappData);
  }
}
