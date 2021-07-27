import { OrderModel } from '../../domain/models/order'
import { OrderAdapter } from './../../implementation/protocols/order-adapter'
import dotenv from 'dotenv'
import axios from 'axios'
import { ConvertOrderToXml } from './utils/convert-order-to-xml'
dotenv.config()

export class OrderBlingAdapter implements OrderAdapter {
  async export (order: OrderModel): Promise<void> {
    const orderInXml = ConvertOrderToXml.convert(order)
    const blingToken = process.env.BLING_KEY ?? ''
    await axios.post(`https://bling.com.br/Api/v2/pedido/json/?apikey=${blingToken}&xml=${orderInXml}`)
  }
}
