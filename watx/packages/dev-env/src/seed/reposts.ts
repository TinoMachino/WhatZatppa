import basicSeed from './basic'
import { SeedClient } from './client'

export default async (sc: SeedClient) => {
  await basicSeed(sc)
  await sc.createAccount('eve', {
    email: 'eve@test.com',
    handle: 'eve.test',
    password: 'eve-pass',
  })
  return sc
}
