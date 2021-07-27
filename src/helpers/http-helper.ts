import { InternalError } from '../presentation/errors/internal-error'
import { HttpResponse } from '../presentation/protocols/http-response'

export const serverError = (): HttpResponse => ({

  statusCode: 500,
  body: new InternalError()
})

export const created = (data: any): HttpResponse => ({

  statusCode: 201,
  body: data
})
