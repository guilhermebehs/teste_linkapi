import { OrderModel } from '../../domain/models/order'
import { OrderAdapter } from './../../implementation/protocols/order-adapter'
import { OrderBlingAdapter } from './order-bling-adapter'
jest.mock('axios', () => ({
  async post (url: string): Promise<void> {
  }
}
))

const makeSut = (): OrderAdapter => {
  return new OrderBlingAdapter()
}
describe('OrderBling Adapter', () => {
  test('Should call bling api with with correct order', async () => {
    const sut = makeSut()
    const order: OrderModel = {
      id: 'any_id',
      salerName: 'any_name',
      clientName: 'any_name',
      totalValue: 100,
      products: [{
        id: '1',
        description: 'teste'
      }],
      wonTime: '2020-01-02'
    }
    const promise = sut.export(order)

    await expect(promise).resolves.toBeFalsy()
  })
})
