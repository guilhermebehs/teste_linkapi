import { OrderModel } from './../domain/models/order'
import { SynchronizeOrders } from './../presentation/controllers/protocols/syncronize-orders'
import { OpportunityModel } from './../domain/models/opportunity'
import { InsertOrderRepository } from './protocols/insert-order-repository'
import { GetOrderByIdRepository } from './protocols/get-order-by-Id-repository'
import { OpportunityAdapter } from './protocols/opportunity-adapter'
import { SynchronizeOrdersUseCase } from './synchronize-orders'
import { OrderAdapter } from './protocols/order-adapter'

interface SutTypes {
  opportunityAdapterStub: OpportunityAdapter
  orderAdapterStub: OrderAdapter
  getOrderByIdRepositoryStub: GetOrderByIdRepository
  insertOrderRepositoryStub: InsertOrderRepository
  sut: SynchronizeOrders
}

const makeGetOrderByIdRepositoryStub = (): GetOrderByIdRepository => {
  class GetOrderByIdRepositoryStub implements GetOrderByIdRepository {
    async get (id: string): Promise<OrderModel | undefined> {
      if (id === 'any_id2') {
        return {
          id: 'any_id2',
          salerName: 'any_name2',
          clientName: 'any_name2',
          products: [],
          wonTime: 'any_date',
          totalValue: 1000
        }
      }
      return undefined
    }
  }
  return new GetOrderByIdRepositoryStub()
}

const makeInsertOrderRepositoryStub = (): InsertOrderRepository => {
  class InsertOrderRepositoryStub implements InsertOrderRepository {
    async insert (order: OrderModel): Promise<OrderModel> {
      return order
    }
  }
  return new InsertOrderRepositoryStub()
}

const makeOpportunityAdapterStub = (): OpportunityAdapter => {
  class OpportunityAdapterStub implements OpportunityAdapter {
    async import (): Promise<OpportunityModel[]> {
      const opportunities: OpportunityModel[] = [{
        id: 'any_id',
        salerName: 'any_name',
        clientName: 'any_name',
        products: [],
        wonTime: 'any_date',
        totalValue: 500
      }, {
        id: 'any_id2',
        salerName: 'any_name2',
        clientName: 'any_name2',
        products: [],
        wonTime: 'any_date',
        totalValue: 1000
      }]
      return opportunities
    }
  }
  return new OpportunityAdapterStub()
}

const makeOrderAdapterStub = (): OrderAdapter => {
  class OrderAdapterStub implements OrderAdapter {
    async export (orders: OrderModel): Promise<void> {
    }
  }
  return new OrderAdapterStub()
}

const makeSut = (): SutTypes => {
  const orderAdapterStub = makeOrderAdapterStub()
  const opportunityAdapterStub = makeOpportunityAdapterStub()
  const insertOrderRepositoryStub = makeInsertOrderRepositoryStub()
  const getOrderByIdRepositoryStub = makeGetOrderByIdRepositoryStub()
  const sut = new SynchronizeOrdersUseCase(
    opportunityAdapterStub,
    orderAdapterStub,
    insertOrderRepositoryStub,
    getOrderByIdRepositoryStub)
  return {
    orderAdapterStub,
    opportunityAdapterStub,
    sut,
    insertOrderRepositoryStub,
    getOrderByIdRepositoryStub
  }
}

describe('SynchronizeOrders UseCase', () => {
  test('Should throws if OrderAdapter.export throws', async () => {
    const { sut, orderAdapterStub } = makeSut()
    jest.spyOn(orderAdapterStub, 'export').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.synchronize()
    await expect(promise).rejects.toThrow()
  })
  test('Should throws if OpportunityAdapter throws', async () => {
    const { sut, opportunityAdapterStub } = makeSut()
    jest.spyOn(opportunityAdapterStub, 'import').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.synchronize()
    await expect(promise).rejects.toThrow()
  })
  test('Should throws if GetOrderByIdRepository throws', async () => {
    const { sut, getOrderByIdRepositoryStub } = makeSut()
    jest.spyOn(getOrderByIdRepositoryStub, 'get').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.synchronize()
    await expect(promise).rejects.toThrow()
  })
  test('Should throws if InsertOrderRepository throws', async () => {
    const { sut, insertOrderRepositoryStub } = makeSut()
    jest.spyOn(insertOrderRepositoryStub, 'insert').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.synchronize()
    await expect(promise).rejects.toThrow()
  })
  test('Should insert only new orders', async () => {
    const { sut, insertOrderRepositoryStub } = makeSut()
    const insertOrderRepositoryStubSpy = jest.spyOn(insertOrderRepositoryStub, 'insert')
    await sut.synchronize()
    expect(insertOrderRepositoryStubSpy).toBeCalledTimes(1)
    expect(insertOrderRepositoryStubSpy).toBeCalledWith({
      id: 'any_id',
      salerName: 'any_name',
      clientName: 'any_name',
      products: [],
      wonTime: 'any_date',
      totalValue: 500
    })
  })
})
