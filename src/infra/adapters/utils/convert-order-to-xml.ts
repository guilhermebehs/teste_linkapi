import { OrderModel } from '../../../domain/models/order'
import { json2xml } from 'xml-js'

export class ConvertOrderToXml {
  static convert (order: OrderModel): string {
    const dataToConvert = {
      pedido: {
        data: new Date(order.wonTime).toLocaleDateString(),
        vendedor: order.salerName,
        cliente: { nome: order.salerName },
        itens: order.products.map(p => ({
          item: {
            codigo: p.id,
            descricao: p.description,
            qtde: 1,
            vlr_unit: 10
          }
        }))
      }
    }
    const jsonStr = JSON.stringify(dataToConvert)
    const options = { compact: true, ignoreComment: true, spaces: 4 }
    const xmlData =
              '<?xml version="1.0" encoding="utf-8"?> ' +
              json2xml(jsonStr, options)
    return xmlData
  }
}
