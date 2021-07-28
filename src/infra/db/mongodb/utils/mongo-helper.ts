import { OrderModel } from './../../../../domain/models/order'
import { Collection, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: process.env.MONGO_URL ?? '',
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  async getCollection (name: string): Promise<Collection<OrderModel>> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  }
}
