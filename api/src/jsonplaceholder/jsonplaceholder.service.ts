import { HttpService, Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

import { User } from '../user/user.interface'
import { UserService } from '../user/user.service'
import { JSONPlaceholder } from './jsonplaceholder.interface'

@Injectable()
export class JSONPlaceholderService {
  constructor(
    private httpService: HttpService,
    private userService: UserService, 
  ) {}

  baixarDados(): Observable<AxiosResponse<JSONPlaceholder[]>> {
    return this.httpService.get(
      process.env.JSONPLACEHOLDER_URL
    )
  }

  async salvarDados() {
    const users = await this.baixarDados()
      .toPromise()
      .then(async response => {
        const {data} = response
        return data.map(user => this.makeUser(user))
          .filter(
            user => user.address.suite.includes('Apt.')
          )
      }).catch((err) => {
        throw err
      })

    const newUsers = []
    for(let user of users) {
      const created = await this.userService.create(user as User)
      newUsers.push({
        ...user, created
      })
    }
    return newUsers
  }

  private makeUser(rawUser): User {
    const {
      name, username, email, website 
    } = rawUser

    const {
      street, suite, city, zipcode
    } = rawUser.address

    const { phone } = rawUser
    const cleanZipcode = zipcode.replace(/[^0-9]/g, '')

    return  {
      name,
      username,
      email,
      website,
      address: {
        street,
        suite,
        city,
        zipcode: parseInt(cleanZipcode)
      },
      contacts: [
        {phone}
      ]
    } as User
  }
}
