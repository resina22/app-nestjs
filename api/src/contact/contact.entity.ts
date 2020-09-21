import { User } from '../user/user.entity'
import { 
  Entity, Column, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm'

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "varchar", width: 20 })
  phone: string

  @ManyToOne(type => User, user => user.contacts)
  user: User

}
