import { GetGroupedOrdersExpressAdapterComposer } from './get-orders-express-adapter-composer'
describe('GetGroupedOrdersExpressAdapter Composer', () => {
  test('Should create an instance of GetGroupedOrdersExpressAdapter', () => {
    const getGroupedOrdersExpressAdapter = GetGroupedOrdersExpressAdapterComposer.compose()
    expect(getGroupedOrdersExpressAdapter).toBeTruthy()
  })
})
