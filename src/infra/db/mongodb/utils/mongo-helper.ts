import { Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: '',
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  async getCollection (name: string): Promise<Collection<any>> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  }
}
