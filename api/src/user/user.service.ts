import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, ContainedType, Repository, useContainer } from 'typeorm'

import { User } from './user.entity'
import { User as UserInterface } from './user.interface'

import { Address } from '../address/address.entity'
import { Address as AddressInterface } from '../address/address.interface'

import { Contact } from '../contact/contact.entity'
import { Contact as ContactInterface } from '../contact/contact.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection
  ) {}

  async listAll(): Promise<User[]> {
    return await this.usersRepository.find(
      { relations: ['address', 'contacts',] }
    )
  }

  findByEmail(email: string): Promise<User[]> {
    return this.usersRepository.find({email})
  }

  async create(user: UserInterface) {
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      let newUser = new User()
      newUser.name = user.name
      newUser.username = user.username
      newUser.email = user.email
      newUser.website = user.website
      newUser.contacts = []

      let address = {...user.address} as AddressInterface
      newUser.address = await queryRunner.manager.save(
        await this.makeAddress(address)
      )

      newUser = await queryRunner.manager.save(newUser)
      user.contacts.forEach(async (contact) => {
        await queryRunner.manager.save(
          await this.makeContact(contact, newUser)
        )
      })

      await queryRunner.commitTransaction()

      return true
    } catch (err) {
      await queryRunner.rollbackTransaction()
      throw false
    } finally {
      await queryRunner.release()
    }
  }

  private makeAddress(address: AddressInterface): Address {
    let newAddress = new Address()

    newAddress.city = address.city
    newAddress.street = address.street
    newAddress.suite = address.suite
    newAddress.zipcode = address.zipcode

    return newAddress
  }

  private makeContact(contact: ContactInterface, user: User): Contact {
    let newContact = new Contact()
    newContact.phone = contact.phone
    newContact.user = user

    return newContact
  }

}
