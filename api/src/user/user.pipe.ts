import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { User } from './user.interface'

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): User {
    const {
      name, username, email, website 
    } = value

    const {
      street, suite, city, zipcode
    } = value.address

    const { phone } = value
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
