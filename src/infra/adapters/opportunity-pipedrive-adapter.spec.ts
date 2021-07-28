import { OpportunityModel } from './../../domain/models/opportunity'
import { OpportunityPipedriveAdapter } from './opportunity-pipedrive-adapter'
const opportunities: any[] = [{
  id: 1,
  person_id: {
    name: 'Guilherme Behs'
  },
  value: 1000,
  owner_name: 'Guilherme Nunes Behs',
  won_time: '2021-07-27 12:52:33'
}]
jest.mock('axios', () => jest.fn(async () => Promise.resolve({ data: { data: opportunities } })))

interface SutTypes {
  sut: OpportunityPipedriveAdapter
}

const makeSut = (): SutTypes => {
  const sut = new OpportunityPipedriveAdapter()
  return { sut }
}
describe('OpportunityPipedrive Adapter', () => {
  test('Should return all opportunites returned by pipedrive api', async () => {
    const { sut } = makeSut()
    const opportuniesReceived: OpportunityModel[] = await sut.import()
    expect(opportuniesReceived.length).toBe(opportunities.length)
  })
})
