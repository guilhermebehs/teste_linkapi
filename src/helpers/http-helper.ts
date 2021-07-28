import { InternalError } from './../presentation/controllers/errors/internal-error'
import { HttpResponse } from './../presentation/controllers/protocols/http-response'

export const serverError = (): HttpResponse => ({

  statusCode: 500,
  body: new InternalError()
})

export const created = (data: any): HttpResponse => ({

  statusCode: 201,
  body: data
})
