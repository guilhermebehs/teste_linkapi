import { HttpResponse } from '../../controllers/protocols/http-response'
import { HttpRequest } from './http-request'

export interface Router{
  route: (request: HttpRequest) => Promise<HttpResponse>
}
