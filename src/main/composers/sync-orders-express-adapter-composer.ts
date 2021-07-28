import { GetOrderByIdMongoRepository } from './../../infra/db/mongodb/get-order-by-id-mongo-repository'
import { InsertOrderMongoRepository } from './../../infra/db/mongodb/insert-order-mongo-repository'
import { OrderBlingAdapter } from './../../infra/adapters/order-bling-adapter'
import { OpportunityPipedriveAdapter } from './../../infra/adapters/opportunity-pipedrive-adapter'
import { SynchronizeOrdersUseCase } from './../../implementation/synchronize-orders'
import { SynchronizeOrdersController } from '../../presentation/controllers/sync-orders-controller'
import { SyncOrdersRouter } from '../../presentation/routers/sync-orders-router'
import { SyncOrdersExpressAdapter } from '../routers/sync-orders-express-adapter'
export class SyncOrdersExpressAdapterComposer {
  static compose (): SyncOrdersExpressAdapter {
    const opportunityPipedriveAdapter = new OpportunityPipedriveAdapter()
    const orderBlingAdapter = new OrderBlingAdapter()
    const insertOrderMongoRepository = new InsertOrderMongoRepository()
    const getOrderByIdMongoRepository = new GetOrderByIdMongoRepository()
    const syncOrdersUseCase = new SynchronizeOrdersUseCase(
      opportunityPipedriveAdapter,
      orderBlingAdapter,
      insertOrderMongoRepository,
      getOrderByIdMongoRepository)
    const syncOrdersController = new SynchronizeOrdersController(syncOrdersUseCase)
    const syncOrdersRouter = new SyncOrdersRouter(syncOrdersController)
    const syncOrdersExpressAdapter = new SyncOrdersExpressAdapter(syncOrdersRouter)
    return syncOrdersExpressAdapter
  }
}
