import {
  Entity, Column, PrimaryGeneratedColumn, OneToOne,
  JoinColumn, OneToMany
} from 'typeorm'

import { Address } from '../address/address.entity'
import { Contact } from '../contact/contact.entity'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "varchar", length: 100 })
  name: string

  @Column({
    type: "varchar",
    length: 50,
    unique: true
  })
  username: string

  @Column({
    type: "varchar",
    length: 50,
    nullable: true
  })
  website: string

  @Column({
    type: "varchar",
    length: 100,
    unique: true
  })
  email: string

  @OneToOne(
    type => Address,
    {
      cascade: true, eager: true,
    }
  )
  @JoinColumn()
  address: Address

  @OneToMany(
    type => Contact,
    contact => contact.user,
    {cascade: true}
  )
  contacts: Contact[]

}
