import { Request, Response } from 'express'

export interface ExpressAdapter{
  adapt: (request: Request, response: Response) => Promise<void>
}
