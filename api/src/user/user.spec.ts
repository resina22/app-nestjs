import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import DefaultModule from '../../config/test'

import { User } from './user.entity'
import { User as UserInterface } from './user.interface'

describe('UserService', () => {
  let userService: UserService
  let mockUser: UserInterface

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ...DefaultModule,
        TypeOrmModule.forFeature([User])
      ],
      providers: [
        UserService
      ],
    }).compile()

    userService = await moduleRef.get<UserService>(UserService)

    mockUser = {
      "name": "Glenna Reichert",
      "username": "Delphine",
      "email": "Chaim_McDermott@dana.io",
      "address": {
        "street": "Dayna Park",
        "suite": "Suite 449",
        "city": "Bartholomebury",
        "zipcode": 764953109,
      },
      "contacts": [{
        "phone": "(775)976-6794 x41206",
      }],
      "website": "conrad.com",
    } as UserInterface
  })

  afterAll((done) => {
    done()
  })

  it('listar todos usuários', async () => {
    const users = await userService.listAll()
    .then(users => users)

    expect(users).toHaveLength(0)
  })

  it('novo usuário', async () => {
    const created = await userService.create(mockUser)
      .then(users => users)

    expect(created).toEqual(true)
  })

  it('buscar usuário', async () => {
    const created = await userService.findByEmail(mockUser.email)
      .then((user: User[]) => user.pop())

    expect(created.email).toEqual(mockUser.email)
  })
})
