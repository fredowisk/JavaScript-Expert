import MongoHelper from './mongoHelper.js';

export default class whatsappMongoRepository {
  constructor() {
    this.collection = "whatsapp_messages"
  }
  
  async save(whatsappData) {
    const whatsappCollection = await MongoHelper.getCollection(this.collection);
    await whatsappCollection.insertOne(whatsappData);
  }

  async listByAccountId(accountId) {
    const whatsappCollection = await MongoHelper.getCollection(this.collection);
    const whatsappMessages = await whatsappCollection.find({ accountId }).toArray();

    return whatsappMessages?.map(whatsappMessage => MongoHelper.map(whatsappMessage));
  }
}