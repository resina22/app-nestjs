import { TypeOrmModule } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'

import { JSONPlaceholderService } from './jsonplaceholder.service'
import DefaultModule from '../../config/test'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'

describe('jsonplaceholder', () => {
  let jsonPlaceholderService: JSONPlaceholderService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ...DefaultModule,
        TypeOrmModule.forFeature([User])
      ],
      providers: [
        JSONPlaceholderService,
        UserService
      ],
    }).compile()
    
    jsonPlaceholderService = await moduleRef.get<JSONPlaceholderService>(JSONPlaceholderService)
  })

  afterAll((done) => {
    done()
  })

  it('baixar dados', async () => {
    const items = await jsonPlaceholderService
      .baixarDados()
      .toPromise()
      .then(response => {
        const {data, status} = response 
        return {data, status}
      })
      .catch(() => ({
          data:[], status:  500
        })
      )

    expect(items.data).toHaveLength(10)
    expect(items.status).toEqual(200)
  })

  it('salvar dados', async () => {
    const items = await jsonPlaceholderService
      .salvarDados()

    expect(items).not.toHaveLength(0)
  })

})
