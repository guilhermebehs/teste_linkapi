import { GetGroupedOrdersRouter } from './../../presentation/routers/get-grouped-orders-router'
import { GetGroupedOrdersController } from './../../presentation/controllers/get-grouped-orders-controller'
import { GetGroupedOrdersExpressAdapter } from './../routers/get-grouped-orders-express-adapter'
import { GetGroupedOrdersUseCases } from './../../implementation/get-grouped-orders'
import { GetGroupedOrdersMongoRepository } from '../../infra/db/mongodb/get-grouped-orders-mongo-repository'

export class GetGroupedOrdersExpressAdapterComposer {
  static compose (): GetGroupedOrdersExpressAdapter {
    const getGroupedOrdersMongoRepository = new GetGroupedOrdersMongoRepository()
    const getGroupedOrdersUseCase = new GetGroupedOrdersUseCases(getGroupedOrdersMongoRepository)
    const getGroupedOrdersController = new GetGroupedOrdersController(getGroupedOrdersUseCase)
    const getGroupedOrdersRouter = new GetGroupedOrdersRouter(getGroupedOrdersController)
    const getGroupedOrdersExpressAdapter = new GetGroupedOrdersExpressAdapter(getGroupedOrdersRouter)
    return getGroupedOrdersExpressAdapter
  }
}
