import { SyncOrdersExpressAdapterComposer } from './sync-orders-express-adapter-composer'

describe('SyncOrdersExpressAdapter Composer', () => {
  test('Should create an instance of SyncOrdersExpressAdapter', () => {
    const syncOrdersExpressAdapter = SyncOrdersExpressAdapterComposer.compose()
    expect(syncOrdersExpressAdapter).toBeTruthy()
  })
})
