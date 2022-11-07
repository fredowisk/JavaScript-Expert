import MongoHelper from './mongoHelper.js';

export default class SMSMongoRepository {
  constructor() {
    this.collection = "sms_messages"
  }
  
  async save(smsData) {
    const smsCollection = await MongoHelper.getCollection(this.collection);
    await smsCollection.insertOne(smsData);
  }

  async listByAccountId(accountId) {
    const smsCollection = await MongoHelper.getCollection(this.collection);
    const smsData = await smsCollection.find({ accountId }).toArray();

    return smsData?.map(sms => MongoHelper.map(sms));
  }
}