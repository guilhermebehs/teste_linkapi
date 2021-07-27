import { SynchronizeOrdersUseCase } from './synchronize-orders'
import { ImportOrderAdapter } from './protocols/import-order-adapter'
import { RetrievedOrderModel } from './../domain/models/retrieved-order'
import { SynchronizeOrders } from '../domain/use-cases/synchronize-orders'

interface SutTypes {
  importOrderAdapterStub: ImportOrderAdapter
  sut: SynchronizeOrders
}

const makeImportOrderAdapterStub = (): ImportOrderAdapter => {
  class ImportOrderAdapterStub implements ImportOrderAdapter {
    async import (): Promise<RetrievedOrderModel[]> {
      return []
    }
  }
  return new ImportOrderAdapterStub()
}

const makeSut = (): SutTypes => {
  const importOrderAdapterStub = makeImportOrderAdapterStub()
  const sut = new SynchronizeOrdersUseCase(importOrderAdapterStub)
  return { importOrderAdapterStub, sut }
}

describe('SynchronizeOrders UseCase', () => {
  test('Should throws if ImportOrderAdapter throws', async () => {
    const { sut, importOrderAdapterStub } = makeSut()
    jest.spyOn(importOrderAdapterStub, 'import').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.synchronize()
    await expect(promise).rejects.toThrow()
  })
})
