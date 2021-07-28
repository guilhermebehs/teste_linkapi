import { GetGroupedOrdersRepository } from './protocols/get-grouped-orders-repository'
import { GetGroupedOrdersUseCases } from './get-grouped-orders'
import { GroupedOrdersModel } from '../domain/models/grouped-orders'

const data: GroupedOrdersModel[] = [{
  data: '2020-01-02',
  valorTotal: 60
}]
interface SutTypes {
  getGroupedOrdersRepositoryStub: GetGroupedOrdersRepository
  sut: GetGroupedOrdersUseCases
}

class GetGroupedOrdersRepositoryStub implements GetGroupedOrdersRepository {
  async get (): Promise<GroupedOrdersModel[]> {
    return data
  }
}

const makeGetGroupedOrdersRepositoryStub = (): GetGroupedOrdersRepository => {
  return new GetGroupedOrdersRepositoryStub()
}

const makeSut = (): SutTypes => {
  const getGroupedOrdersRepositoryStub = makeGetGroupedOrdersRepositoryStub()
  const sut = new GetGroupedOrdersUseCases(getGroupedOrdersRepositoryStub)
  return { sut, getGroupedOrdersRepositoryStub }
}

describe('GetGroupedOrders UseCase', () => {
  test('Should throw if GetGroupedOrdersRepository throws', async () => {
    const { sut, getGroupedOrdersRepositoryStub } = makeSut()
    jest.spyOn(getGroupedOrdersRepositoryStub, 'get').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.get()
    await expect(promise).rejects.toThrow()
  })
  test('Should return all grouped orders returned from GetGroupedOrdersRepository', async () => {
    const { sut } = makeSut()
    const returnedData = await sut.get()
    await expect(returnedData).toEqual(data)
  })
})
